from fastapi import APIRouter
from schemas import UserRegister, UserLogin

router = APIRouter()

@router.post("/register")
def register(user: UserRegister):
    return {
        "message": "User registered",
        "email": user.email
    }

@router.post("/login")
def login(user: UserLogin):
    return {
        "message": "Login successful",
        "email": user.email
    }