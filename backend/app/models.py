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
    phone = Column(String(20))
    role = Column(String(20), default="citizen")

    created_at = Column(DateTime, default=datetime.utcnow)

    complaints = relationship("Complaint", back_populates="user")


class Department(Base):
    __tablename__ = "departments"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    description = Column(Text)

    complaints = relationship("Complaint", back_populates="department")


class Complaint(Base):
    __tablename__ = "complaints"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"))
    department_id = Column(Integer, ForeignKey("departments.id"), nullable=True)

    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)

    state = Column(String(100))
    district = Column(String(100))
    area = Column(String(100))

    category = Column(String(100))
    urgency = Column(String(20))
    department_name = Column(String(100))

    status = Column(String(20), default="Pending")

    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="complaints")
    department = relationship("Department", back_populates="complaints")
    status_logs = relationship("StatusLog", back_populates="complaint")


class StatusLog(Base):
    __tablename__ = "status_logs"

    id = Column(Integer, primary_key=True, index=True)

    complaint_id = Column(Integer, ForeignKey("complaints.id"))

    old_status = Column(String(50))
    new_status = Column(String(50))

    remarks = Column(Text)

    changed_at = Column(DateTime, default=datetime.utcnow)

    complaint = relationship(
        "Complaint",
        back_populates="status_logs"
    )