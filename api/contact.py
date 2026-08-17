from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr, Field
import os, requests
from datetime import datetime, timezone
app = FastAPI(title="Amith Portfolio Contact API")
class ContactMessage(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    email: EmailStr
    message: str = Field(min_length=10, max_length=4000)
@app.post("/")
def contact(payload: ContactMessage):
    body={"name":payload.name,"email":str(payload.email),"message":payload.message,"created_at":datetime.now(timezone.utc).isoformat()}
    webhook=os.getenv("CONTACT_WEBHOOK_URL")
    if webhook:
        try:
            r=requests.post(webhook,json=body,timeout=5); r.raise_for_status()
        except requests.RequestException as exc:
            raise HTTPException(status_code=502, detail="Message delivery is temporarily unavailable.") from exc
    else:
        print("Portfolio contact message:", body)
    return {"message":"Thanks — your message has been received."}
