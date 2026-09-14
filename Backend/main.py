"""
FastAPI backend for the contact form on akashbarman's portfolio site.

Run locally:
    python -m venv venv
    venv\\Scripts\\activate        (Windows)
    pip install -r requirements.txt
    uvicorn main:app --reload --port 8000

The frontend (React, running on http://localhost:3000) posts to
POST /api/contact. Submissions are appended to data/messages.json.
"""

import json
import os
from datetime import datetime, timezone

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field

app = FastAPI(title="Akash Barman — Portfolio API", version="1.0.0")

# Allow the local React dev server (and same-origin builds) to call this API.
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "data")
DATA_FILE = os.path.join(DATA_DIR, "messages.json")

os.makedirs(DATA_DIR, exist_ok=True)
if not os.path.exists(DATA_FILE):
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump([], f)


class ContactMessage(BaseModel):
    name: str = Field(..., min_length=1, max_length=120)
    email: EmailStr
    service: str = Field(..., min_length=1, max_length=60)
    message: str = Field(..., min_length=1, max_length=4000)


def read_messages():
    try:
        with open(DATA_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except (json.JSONDecodeError, FileNotFoundError):
        return []


def write_messages(messages):
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(messages, f, indent=2)


@app.get("/api/health")
def health_check():
    return {"status": "ok"}


@app.post("/api/contact")
def submit_contact(payload: ContactMessage):
    try:
        messages = read_messages()
        entry = payload.model_dump()
        entry["received_at"] = datetime.now(timezone.utc).isoformat()
        messages.append(entry)
        write_messages(messages)
    except OSError as exc:
        raise HTTPException(
            status_code=500, detail="Could not save your message. Please try again."
        ) from exc

    return {
        "status": "success",
        "message": "Thanks — I'll get back to you within a day or two.",
    }


@app.get("/api/contact")
def list_contacts():
    """Simple endpoint to review submissions while developing locally."""
    return read_messages()
