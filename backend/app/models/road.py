from sqlalchemy import Integer, String, Float, DateTime, func
from sqlalchemy.orm import Mapped, mapped_column
from geoalchemy2 import Geometry

from app.db.base import Base


class Road(Base):
    __tablename__ = "roads"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True
    )

    road_name: Mapped[str | None] = mapped_column(
        String(250)
    )

    road_type: Mapped[str | None] = mapped_column(
        String(50)
    )

    highway_type: Mapped[str | None] = mapped_column(
        String(100)
    )

    speed_limit: Mapped[float | None] = mapped_column(
        Float
    )

    max_weight_tons: Mapped[float | None] = mapped_column(
        Float
    )

    road_condition: Mapped[str | None] = mapped_column(
        String(50)
    )

    risk_level: Mapped[str | None] = mapped_column(
        String(30)
    )

    geometry = mapped_column(
        Geometry("LINESTRING", srid=4326)
    )

    created_at: Mapped[DateTime] = mapped_column(
        DateTime,
        server_default=func.now()
    )

    updated_at: Mapped[DateTime] = mapped_column(
        DateTime,
        server_default=func.now(),
        onupdate=func.now()
    )