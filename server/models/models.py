import datetime
from sqlalchemy import Column, Integer, String, DateTime
from models.orm import Base


class Application(Base):
    __tablename__ = "applications"

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    updated_at = Column(DateTime, nullable=False, default=datetime.utcnow)
