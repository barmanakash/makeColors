# Backend — Contact API

A small FastAPI service that powers the contact form on the frontend.

## Setup

```bash
cd Backend
python -m venv venv

# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt
```

## Run

```bash
uvicorn main:app --reload --port 8000
```

The API will be available at `http://localhost:8000`.
Interactive docs: `http://localhost:8000/docs`

## Endpoints

| Method | Path            | Description                              |
|--------|-----------------|-------------------------------------------|
| GET    | `/api/health`   | Health check                              |
| POST   | `/api/contact`  | Submit a contact form message             |
| GET    | `/api/contact`  | List saved submissions (local dev only)   |

Submissions are appended to `data/messages.json`. That file is gitignored
since it will contain real names/emails once people start submitting the
form — don't commit it.

## Request body for POST /api/contact

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "service": "AI Agent Development",
  "message": "Hey, I'd like to talk about..."
}
```
