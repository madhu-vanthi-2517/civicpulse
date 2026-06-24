import os

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from app.database import engine, SessionLocal
from app.models import Base, User

from app.routers.auth_router import router as auth_router
from app.routers.complaints import router as complaints_router
from app.routers.classify import router as classify_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title="CivicPulse API")

# CORS setup for local frontend + deployed Vercel frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "https://civicpulse-wheat.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "CivicPulse API is running"
    }


@app.put("/auth/make-admin/{email}", tags=["Auth"])
def make_admin(email: str, secret: str):
    if secret != os.getenv("SECRET_KEY"):
        raise HTTPException(status_code=403, detail="Not allowed")

    db = SessionLocal()
    try:
        user = db.query(User).filter(User.email == email).first()

        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        user.role = "admin"
        db.commit()

        return {
            "message": "User role updated to admin",
            "email": user.email,
            "role": user.role
        }
    finally:
        db.close()


app.include_router(
    auth_router,
    prefix="/auth",
    tags=["Auth"]
)

app.include_router(
    complaints_router,
    prefix="/api",
    tags=["Complaints"]
)

app.include_router(
    classify_router,
    tags=["ML Classifier"]
)