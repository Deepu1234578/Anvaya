"""add password reset fields

Revision ID: fc0c8f845805
Revises: 63ed4c971d0f
Create Date: 2026-09-22 18:24:54.547351

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "fc0c8f845805"
down_revision: Union[str, Sequence[str], None] = "63ed4c971d0f"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""

    op.add_column(
        "users",
        sa.Column(
            "password_reset_token",
            sa.String(length=255),
            nullable=True,
        ),
    )

    op.add_column(
        "users",
        sa.Column(
            "password_reset_expires",
            sa.DateTime(),
            nullable=True,
        ),
    )

    op.create_unique_constraint(
        "uq_users_password_reset_token",
        "users",
        ["password_reset_token"],
    )


def downgrade() -> None:
    """Downgrade schema."""

    op.drop_constraint(
        "uq_users_password_reset_token",
        "users",
        type_="unique",
    )

    op.drop_column(
        "users",
        "password_reset_expires",
    )

    op.drop_column(
        "users",
        "password_reset_token",
    )