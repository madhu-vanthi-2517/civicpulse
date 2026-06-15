import APIRouter, HTTPException
from app.schemas import UserRegister, UserLogin
from app.database import SessionLocal
from app.models import User
from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta
import os

router = APIRouter()
pwd_context = CryptContext(
    schemes=["bcrypt"], deprecated="auto"
)

SECRET_KEY = os.getenv("SECRET_KEY", "civicpulse-secret")
ALGORITHM = "HS256"

def create_token(email: str) -> str:
    expire = datetime.utcnow() + timedelta(hours=24)
    return jwt.encode(
        {"sub": email, "exp": expire},
        SECRET_KEY,
        algorithm=ALGORITHM
    )

@router.post("/register")
def register(user: UserRegister):
    db = SessionLocal()
    try:
        existing = db.query(User).filter(
            User.email == user.email
        ).first()
        if existing:
            raise HTTPException(
                status_code=400,
                detail="Email already registered"
            )
        hashed = pwd_context.hash(user.password)
        new_user = User(
            name=user.name,
            email=user.email,
            password=hashed,
            role="citizen"
        )
        db.add(new_user)
        db.commit()
        return {
            "message": "Registered successfully",
            "email": user.email
        }
    finally:
        db.close()

@router.post("/login")
def login(user: UserLogin):
    db = SessionLocal()
    try:
        db_user = db.query(User).filter(
            User.email == user.email
        ).first()
        if not db_user:
            raise HTTPException(
                status_code=401,
                detail="Invalid credentials"
            )
        if not pwd_context.verify(
            user.password, db_user.password
        ):
            raise HTTPException(
                status_code=401,
                detail="Invalid credentials"
            )
        token = create_token(db_user.email)
        return {
            "access_token": token,
            "token_type": "bearer",
            "role": db_user.role,
            "email": db_user.email
        }
    finally:
        db.close()