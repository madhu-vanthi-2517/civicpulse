from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import engine
from app.models import Base

from app.routers.auth_router import router as auth_router
from app.routers.complaints import router as complaints_router
from app.routers.classify import router as classify_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title="CivicPulse API")

# CORS setup for local frontend + ngrok/public testing
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all origins for testing/demo
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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


@app.get("/")
def home():
    return {
        "message": "CivicPulse API is running"
    }
