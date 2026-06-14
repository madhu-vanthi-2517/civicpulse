from fastapi import FastAPI

from app.routers.classify import router

app = FastAPI(
    title="CivicPulse API"
)

app.include_router(router)