"""create geography tables

Revision ID: dcbc5f7af595
Revises:
Create Date: 2026-09-07 19:29:23.978941
"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
import geoalchemy2


# revision identifiers, used by Alembic.
revision: str = "dcbc5f7af595"
down_revision: Union[str, Sequence[str], None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""

    # Create roads table
    op.create_table(
        "roads",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("road_name", sa.String(length=250), nullable=True),
        sa.Column("road_type", sa.String(length=50), nullable=True),
        sa.Column("highway_type", sa.String(length=100), nullable=True),
        sa.Column("speed_limit", sa.Float(), nullable=True),
        sa.Column("max_weight_tons", sa.Float(), nullable=True),
        sa.Column("road_condition", sa.String(length=50), nullable=True),
        sa.Column("risk_level", sa.String(length=30), nullable=True),
        sa.Column(
            "geometry",
            geoalchemy2.types.Geometry(
                geometry_type="LINESTRING",
                srid=4326,
                dimension=2,
                from_text="ST_GeomFromEWKT",
                name="geometry",
            ),
            nullable=True,
        ),
        sa.Column(
            "created_at",
            sa.DateTime(),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.Column(
            "updated_at",
            sa.DateTime(),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.PrimaryKeyConstraint("id"),
    )

    

    # Create states table
    op.create_table(
        "states",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("name", sa.String(length=100), nullable=False),
        sa.Column("code", sa.String(length=10), nullable=False),
        sa.Column(
            "geometry",
            geoalchemy2.types.Geometry(
                geometry_type="MULTIPOLYGON",
                srid=4326,
                dimension=2,
                from_text="ST_GeomFromEWKT",
                name="geometry",
            ),
            nullable=True,
        ),
        sa.Column(
            "created_at",
            sa.DateTime(),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("code"),
    )

    

    # Create districts table
    op.create_table(
        "districts",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("state_id", sa.Integer(), nullable=False),
        sa.Column("name", sa.String(length=150), nullable=False),
        sa.Column(
            "geometry",
            geoalchemy2.types.Geometry(
                geometry_type="MULTIPOLYGON",
                srid=4326,
                dimension=2,
                from_text="ST_GeomFromEWKT",
                name="geometry",
            ),
            nullable=True,
        ),
        sa.Column(
            "created_at",
            sa.DateTime(),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.ForeignKeyConstraint(
            ["state_id"],
            ["states.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
    )

    

    # Create locations table
    op.create_table(
        "locations",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("name", sa.String(length=200), nullable=False),
        sa.Column("location_type", sa.String(length=50), nullable=True),
        sa.Column("district_id", sa.Integer(), nullable=True),
        sa.Column("latitude", sa.Float(), nullable=True),
        sa.Column("longitude", sa.Float(), nullable=True),
        sa.Column(
            "geometry",
            geoalchemy2.types.Geometry(
                geometry_type="POINT",
                srid=4326,
                dimension=2,
                from_text="ST_GeomFromEWKT",
                name="geometry",
            ),
            nullable=True,
        ),
        sa.Column(
            "created_at",
            sa.DateTime(),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.ForeignKeyConstraint(
            ["district_id"],
            ["districts.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
    )

    


def downgrade() -> None:
    """Downgrade schema."""

    # Remove locations
    
    op.drop_table("locations")

    # Remove districts
    
    op.drop_table("districts")

    # Remove states
    
    op.drop_table("states")

    # Remove roads
    
    op.drop_table("roads")