from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime

from app.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, index=True, nullable=False)
    password = Column(String(255), nullable=False)
    role = Column(String(20), default="citizen")

    complaints = relationship(
        "Complaint",
        back_populates="user"
    )

    reports = relationship(
        "ComplaintReporter",
        back_populates="user"
    )


class Department(Base):
    __tablename__ = "departments"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, nullable=False)

    complaints = relationship(
        "Complaint",
        back_populates="department"
    )


class Complaint(Base):
    __tablename__ = "complaints"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"))
    department_id = Column(
        Integer,
        ForeignKey("departments.id"),
        nullable=True
    )

    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)

    district = Column(String(100))
    area = Column(String(100))

    category = Column(String(100))
    urgency = Column(String(20))
    department_name = Column(String(100))

    status = Column(String(20), default="Pending")

    image_url = Column(String(500), nullable=True)

    report_count = Column(Integer, default=1)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship(
        "User",
        back_populates="complaints"
    )

    department = relationship(
        "Department",
        back_populates="complaints"
    )

    status_logs = relationship(
        "StatusLog",
        back_populates="complaint"
    )

    reporters = relationship(
        "ComplaintReporter",
        back_populates="complaint"
    )


class StatusLog(Base):
    __tablename__ = "status_logs"

    id = Column(Integer, primary_key=True, index=True)

    complaint_id = Column(
        Integer,
        ForeignKey("complaints.id")
    )

    old_status = Column(String(20))
    new_status = Column(String(20))
    remarks = Column(Text, nullable=True)

    created_at = Column(DateTime, default=datetime.utcnow)

    complaint = relationship(
        "Complaint",
        back_populates="status_logs"
    )


class ComplaintReporter(Base):
    __tablename__ = "complaint_reporters"

    id = Column(Integer, primary_key=True, index=True)

    complaint_id = Column(
        Integer,
        ForeignKey("complaints.id")
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id")
    )

    created_at = Column(DateTime, default=datetime.utcnow)

    complaint = relationship(
        "Complaint",
        back_populates="reporters"
    )

    user = relationship(
        "User",
        back_populates="reports"
    )