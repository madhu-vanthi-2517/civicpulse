from fastapi import FastAPI
from routers.auth_router import router

app = FastAPI(title="CivicPulse API")

app.include_router(router)

@app.get("/")
def home():
    return {"message": "CivicPulse API Running"}