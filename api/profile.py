from fastapi import FastAPI
from data import PROFILE
app = FastAPI(title="Amith Portfolio Profile API")
@app.get("/")
def profile():
    return PROFILE
