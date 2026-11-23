
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import text
from sqlalchemy.orm import Session

from app.api.deps import get_db

router = APIRouter(prefix="/api", tags=["GIS"])


@router.get("/health")
def database_health(db: Session = Depends(get_db)):
    try:
        result = db.execute(
            text("SELECT 1")
        ).scalar()

        return {
            "status": "healthy",
            "database": "connected" if result == 1 else "unknown",
            "service": "ANVAYA GIS API"
        }
    except Exception:
        raise HTTPException(
            status_code=503,
            detail="Database connection unavailable"
        )


@router.get("/districts")
def get_districts(
    limit: int = Query(100, ge=1, le=1000),
    offset: int = Query(0, ge=0),
    db: Session = Depends(get_db)
):
    query = text("""
        SELECT
            d.id,
            d.name,
            d.lgd_code,
            d.state_id,
            s.name AS state_name
        FROM public.districts d
        LEFT JOIN public.states s ON s.id = d.state_id
        ORDER BY d.name
        LIMIT :limit OFFSET :offset
    """)

    rows = db.execute(
        query,
        {"limit": limit, "offset": offset}
    ).mappings().all()

    return {
        "count": len(rows),
        "limit": limit,
        "offset": offset,
        "districts": [dict(row) for row in rows]
    }


@router.get("/roads/stats")
def road_statistics(db: Session = Depends(get_db)):
    query = text("""
        SELECT
            COUNT(*) AS total_roads,
            COUNT(geometry) AS roads_with_geometry,
            COUNT(osm_id) AS roads_with_osm_id,
            COUNT(DISTINCT highway_type) AS highway_categories,
            COUNT(road_name) AS named_roads,
            COUNT(*) FILTER (
                WHERE risk_level IS NOT NULL
            ) AS roads_with_risk_data
        FROM public.roads
    """)

    result = db.execute(query).mappings().one()

    return {
        "statistics": dict(result)
    }


@router.get("/roads")
def get_roads(
    limit: int = Query(100, ge=1, le=1000),
    offset: int = Query(0, ge=0),
    highway: str | None = None,
    db: Session = Depends(get_db)
):
    query = text("""
        SELECT
            id,
            road_name,
            road_type,
            highway_type,
            speed_limit,
            max_weight_tons,
            road_condition,
            risk_level,
            osm_id
        FROM public.roads
        WHERE (:highway IS NULL OR highway_type = :highway)
        ORDER BY id
        LIMIT :limit OFFSET :offset
    """)

    rows = db.execute(
        query,
        {
            "highway": highway,
            "limit": limit,
            "offset": offset
        }
    ).mappings().all()

    return {
        "count": len(rows),
        "limit": limit,
        "offset": offset,
        "roads": [dict(row) for row in rows]
    }


@router.get("/roads/map")
def get_roads_map(
    min_lon: float = Query(..., ge=-180, le=180),
    min_lat: float = Query(..., ge=-90, le=90),
    max_lon: float = Query(..., ge=-180, le=180),
    max_lat: float = Query(..., ge=-90, le=90),
    limit: int = Query(1000, ge=1, le=2000),
    db: Session = Depends(get_db)
):
    if min_lon >= max_lon or min_lat >= max_lat:
        raise HTTPException(
            status_code=400,
            detail="Invalid geographic bounding box"
        )

    query = text("""
        SELECT
            id,
            road_name,
            highway_type,
            ST_AsGeoJSON(geometry)::json AS geometry
        FROM public.roads
        WHERE geometry && ST_MakeEnvelope(
            :min_lon, :min_lat,
            :max_lon, :max_lat, 4326
        )
        AND ST_Intersects(
            geometry,
            ST_MakeEnvelope(
                :min_lon, :min_lat,
                :max_lon, :max_lat, 4326
            )
        )
        ORDER BY id
        LIMIT :limit
    """)

    rows = db.execute(
        query,
        {
            "min_lon": min_lon,
            "min_lat": min_lat,
            "max_lon": max_lon,
            "max_lat": max_lat,
            "limit": limit
        }
    ).mappings().all()

    return {
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "geometry": row["geometry"],
                "properties": {
                    "id": row["id"],
                    "name": row["road_name"],
                    "highway": row["highway_type"]
                }
            }
            for row in rows
        ]
    }


@router.get("/roads/nearby")
def get_nearby_roads(
    lon: float = Query(..., ge=-180, le=180),
    lat: float = Query(..., ge=-90, le=90),
    radius_m: int = Query(1000, ge=1, le=50000),
    limit: int = Query(50, ge=1, le=200),
    db: Session = Depends(get_db)
):
    query = text("""
        SELECT
            id,
            road_name,
            highway_type,
            ST_Distance(
                geometry::geography,
                ST_SetSRID(
                    ST_MakePoint(:lon, :lat), 4326
                )::geography
            ) AS distance_m
        FROM public.roads
        WHERE ST_DWithin(
            geometry::geography,
            ST_SetSRID(
                ST_MakePoint(:lon, :lat), 4326
            )::geography,
            :radius_m
        )
        ORDER BY distance_m
        LIMIT :limit
    """)

    rows = db.execute(
        query,
        {
            "lon": lon,
            "lat": lat,
            "radius_m": radius_m,
            "limit": limit
        }
    ).mappings().all()

    return {
        "count": len(rows),
        "roads": [dict(row) for row in rows]
    }

@router.get("/overview/stats")
def get_overview_stats(db: Session = Depends(get_db)):
    road_query = text("""
        SELECT
            COUNT(*) AS total_roads,
            COUNT(road_name) AS named_roads,
            COUNT(DISTINCT highway_type) AS highway_categories,
            COUNT(*) FILTER (
                WHERE risk_level IS NOT NULL
            ) AS roads_with_risk_data
        FROM public.roads
    """)

    district_query = text("""
        SELECT COUNT(*) AS total_districts
        FROM public.districts
    """)

    roads = db.execute(road_query).mappings().one()
    districts = db.execute(district_query).mappings().one()

    return {
        "overview": {
            "total_roads": roads["total_roads"],
            "named_roads": roads["named_roads"],
            "highway_categories": roads["highway_categories"],
            "roads_with_risk_data": roads["roads_with_risk_data"],
            "total_districts": districts["total_districts"]
        }
    }



@router.get("/districts/map")
def get_district_boundaries(
    limit: int = Query(1000, ge=1, le=1000),
    db: Session = Depends(get_db)
):
    query = text("""
        SELECT
            d.id,
            d.name,
            d.state_id,
            ST_AsGeoJSON(
                ST_SimplifyPreserveTopology(d.geometry, 0.01)
            )::json AS geometry
        FROM public.districts d
        WHERE d.geometry IS NOT NULL
        ORDER BY d.state_id, d.name
        LIMIT :limit
    """)

    rows = db.execute(
        query,
        {"limit": limit}
    ).mappings().all()

    return {
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "geometry": row["geometry"],
                "properties": {
                    "id": row["id"],
                    "district": row["name"],
                    "state_id": row["state_id"]
                }
            }
            for row in rows
        ]
    }
