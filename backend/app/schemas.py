from pydantic import BaseModel
from typing import Optional
from typing import Optional

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
    area: str
    category: str
    urgency: str
    department_name: str
    status: str

    class Config:
        from_attributes = True

class StatusUpdate(BaseModel):
    status: str
    remarks: Optional[str] = ""