from sqlalchemy import Integer, String, Float, DateTime, ForeignKey, func
from sqlalchemy.orm import Mapped, mapped_column
from geoalchemy2 import Geometry

from app.db.base import Base


class Location(Base):
    __tablename__ = "locations"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True
    )

    name: Mapped[str] = mapped_column(
        String(200),
        nullable=False
    )

    location_type: Mapped[str | None] = mapped_column(
        String(50)
    )

    district_id: Mapped[int | None] = mapped_column(
        ForeignKey("districts.id")
    )

    latitude: Mapped[float | None] = mapped_column(
        Float
    )

    longitude: Mapped[float | None] = mapped_column(
        Float
    )

    geometry = mapped_column(
        Geometry("POINT", srid=4326)
    )

    created_at: Mapped[DateTime] = mapped_column(
        DateTime,
        server_default=func.now()
    )