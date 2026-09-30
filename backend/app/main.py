from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.auth import router as auth_router


app = FastAPI(
    title="ANVAYA API",
    description="AI-Powered Smart Logistics & Accessibility Intelligence Platform",
    version="0.1.0",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(auth_router)


@app.get("/")
def root():
    return {
        "name": "ANVAYA",
        "message": "ANVAYA API is running",
        "version": "0.1.0",
    }


@app.get("/api/health")
def health():
    return {
        "status": "healthy",
        "service": "ANVAYA backend",
    }