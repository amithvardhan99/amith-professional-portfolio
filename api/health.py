from fastapi import FastAPI
from datetime import datetime, timezone
app = FastAPI(title="Amith Portfolio Health API")
@app.get("/")
def health():
    return {"status":"ok","service":"amith-portfolio-api","timestamp":datetime.now(timezone.utc).isoformat()}
