from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import declarative_base, relationship
from datetime import datetime

Base = declarative_base()


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    password = Column(String(255), nullable=False)
    phone = Column(String(20), nullable=True)
    role = Column(String(20), default="citizen")
    created_at = Column(DateTime, default=datetime.utcnow)

    complaints = relationship("Complaint", back_populates="user")


class Department(Base):
    __tablename__ = "departments"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    description = Column(Text, nullable=True)

    complaints = relationship("Complaint", back_populates="department")


class Complaint(Base):
    __tablename__ = "complaints"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    department_id = Column(Integer, ForeignKey("departments.id"), nullable=True)

    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)

    state = Column(String(100), nullable=True)
    district = Column(String(100), nullable=False)
    area = Column(String(100), nullable=True)

    category = Column(String(100), nullable=True)
    urgency = Column(String(20), nullable=True)
    department_name = Column(String(100), nullable=True)

    status = Column(String(20), default="Pending")
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="complaints")
    department = relationship("Department", back_populates="complaints")
    status_logs = relationship("StatusLog", back_populates="complaint")


class StatusLog(Base):
    __tablename__ = "status_logs"

    id = Column(Integer, primary_key=True, index=True)
    complaint_id = Column(Integer, ForeignKey("complaints.id"))

    old_status = Column(String(50), nullable=True)
    new_status = Column(String(50), nullable=False)
    remarks = Column(Text, nullable=True)
    changed_at = Column(DateTime, default=datetime.utcnow)

    complaint = relationship("Complaint", back_populates="status_logs")