"""adiciona tabela de fármacos

Revision ID: 6783466a1873
Revises: b5d283988b1d
Create Date: 2025-03-27 18:12:46.468418

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '6783466a1873'
down_revision: Union[str, None] = 'b5d283988b1d'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('pharma',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('pharma_name', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('pharma')
    # ### end Alembic commands ###
