from init import db
from sqlalchemy import Integer, String, DateTime
from sqlalchemy.orm import Mapped, mapped_column
import datetime
from app import app


class Application(db.Model):
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String, nullable=False)
    created_at: Mapped[str] = mapped_column(
        DateTime, nullable=False, default=datetime.datetime.now()
    )
    updated_at: Mapped[str] = mapped_column(
        DateTime, nullable=False, default=datetime.datetime.now()
    )


with app.app.app_context():
    db.create_all()
