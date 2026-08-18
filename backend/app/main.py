from datetime import datetime, timezone
from pathlib import Path
import json

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, EmailStr, Field

from .data import PROFILE

BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR / "data"
MESSAGES_FILE = DATA_DIR / "messages.json"
FRONTEND_DIST = BASE_DIR.parent / "frontend" / "dist"

app = FastAPI(
    title="Amith Portfolio API",
    version="1.0.0",
    description="Backend API for Amith Vardhan Reddy Surasani's professional portfolio.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ContactMessage(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    email: EmailStr
    message: str = Field(min_length=10, max_length=4000)


@app.get("/api/health")
def health():
    return {"status": "ok", "service": "amith-portfolio-api"}


@app.get("/api/profile")
def get_profile():
    return PROFILE


@app.post("/api/contact")
def create_contact_message(payload: ContactMessage):
    DATA_DIR.mkdir(parents=True, exist_ok=True)

    messages = []
    if MESSAGES_FILE.exists():
        try:
            messages = json.loads(MESSAGES_FILE.read_text(encoding="utf-8"))
        except json.JSONDecodeError:
            messages = []

    messages.append(
        {
            "name": payload.name,
            "email": str(payload.email),
            "message": payload.message,
            "created_at": datetime.now(timezone.utc).isoformat(),
        }
    )
    MESSAGES_FILE.write_text(
        json.dumps(messages, indent=2, ensure_ascii=False),
        encoding="utf-8",
    )

    return {"message": "Thanks — your message has been received."}


# Serve the production React/Vite build from the same FastAPI service.
# This makes the portfolio a single Render web service and keeps /api/* available.
if FRONTEND_DIST.exists():
    app.mount("/", StaticFiles(directory=FRONTEND_DIST, html=True), name="frontend")
