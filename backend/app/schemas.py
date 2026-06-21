from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class UserRegister(BaseModel):
    name: str
    email: str
    password: str


class UserLogin(BaseModel):
    email: str
    password: str


class ComplaintCreate(BaseModel):
    title: str
    description: str
    district: str
    area: Optional[str] = ""
    user_id: Optional[int] = None


class ComplaintResponse(BaseModel):
    id: int
    title: str
    description: str
    district: str
    area: Optional[str] = None
    category: Optional[str] = None
    urgency: Optional[str] = None
    department_name: Optional[str] = None
    status: str
    created_at: Optional[datetime] = None

    duplicate_warning: bool = False
    similar_to_id: Optional[int] = None

    class Config:
        from_attributes = True


class StatusUpdate(BaseModel):
    status: str
    remarks: Optional[str] = ""