import os

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from passlib.context import CryptContext
from jose import jwt

from app.database import SessionLocal
from app.models import User


router = APIRouter()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

SECRET_KEY = os.getenv("SECRET_KEY", "civicpulse-secret-key")
ALGORITHM = "HS256"


class RegisterRequest(BaseModel):
    name: str
    email: EmailStr
    password: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


@router.post("/register")
def register(request: RegisterRequest):
    db = SessionLocal()

    try:
        existing_user = db.query(User).filter(User.email == request.email).first()

        if existing_user:
            raise HTTPException(status_code=400, detail="Email already registered")

        hashed_password = pwd_context.hash(request.password)

        new_user = User(
            name=request.name,
            email=request.email,
            password=hashed_password,
            role="citizen"
        )

        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        return {
            "message": "Registered successfully",
            "id": new_user.id,
            "name": new_user.name,
            "email": new_user.email,
            "role": new_user.role
        }

    finally:
        db.close()


@router.post("/login")
def login(request: LoginRequest):
    db = SessionLocal()

    try:
        user = db.query(User).filter(User.email == request.email).first()

        if not user:
            raise HTTPException(status_code=401, detail="Invalid credentials")

        if not pwd_context.verify(request.password, user.password):
            raise HTTPException(status_code=401, detail="Invalid credentials")

        token = jwt.encode(
            {
                "sub": user.email,
                "id": user.id,
                "role": user.role
            },
            SECRET_KEY,
            algorithm=ALGORITHM
        )

        return {
            "message": "Login successful",
            "access_token": token,
            "token_type": "bearer",
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "role": user.role
        }

    finally:
        db.close()


@router.put("/make-admin/{email}")
def make_admin(email: str, secret: str):
    if secret != SECRET_KEY:
        raise HTTPException(status_code=403, detail="Not allowed")

    db = SessionLocal()

    try:
        user = db.query(User).filter(User.email == email).first()

        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        user.role = "admin"
        db.commit()
        db.refresh(user)

        return {
            "message": "User role updated to admin",
            "email": user.email,
            "role": user.role
        }

    finally:
        db.close()