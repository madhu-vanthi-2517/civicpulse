import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import Base, engine
from app.routers.auth_router import router as auth_router
from app.routers.classify import router as classify_router
from app.routers.complaints import router as complaints_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title="CivicPulse API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    auth_router, prefix="/auth", tags=["Auth"]
)
app.include_router(
    classify_router, prefix="/ai", tags=["AI"]
)
app.include_router(
    complaints_router, prefix="/api", tags=["Complaints"]
)

@app.get("/")
def home():
    return {"message": "CivicPulse API is running"}