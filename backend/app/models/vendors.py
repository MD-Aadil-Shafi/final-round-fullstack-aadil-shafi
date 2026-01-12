from sqlalchemy import Column, Integer, String, Text, Boolean
from sqlalchemy.orm import relationship
from app.db.base import Base

class Vendor(Base):
    __tablename__ = "vendors"
    
    id = Column(Integer, primary_key=True)
    name = Column(String(24), unique=True, index=True, nullable=False)
    about = Column(String(24), nullable=False)
    logo = Column(Text, nullable=True)
    contact = Column(String(255), unique=True, index=True, nullable=True)
    owner_first_name = Column(String(20), nullable=True)
    owner_last_name = Column(String(20), nullable=True)
    description = Column(Text, nullable=True)
    location = Column(String(24), nullable=True)
    payment_type = Column(String(24), nullable=False)
    department = Column(String(24), nullable=True)
    active = Column(Boolean, default=True)
    expenses = relationship("Expense", back_populates="vendor", cascade="all,delete-orphan")
    