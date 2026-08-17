from fastapi import FastAPI, HTTPException
import requests
from datetime import datetime, timezone
app = FastAPI(title="Amith GitHub Stats API")
@app.get("/")
def github_stats():
    username = "amithvardhan99"
    try:
        user = requests.get(f"https://api.github.com/users/{username}", timeout=5).json()
        repos = requests.get(f"https://api.github.com/users/{username}/repos?per_page=100&sort=updated", timeout=5).json()
        repos = repos if isinstance(repos, list) else []
        return {"username": username, "public_repos": user.get("public_repos",0), "followers": user.get("followers",0), "following": user.get("following",0), "stars": sum(r.get("stargazers_count",0) for r in repos), "forks": sum(r.get("forks_count",0) for r in repos), "profile_url": user.get("html_url",f"https://github.com/{username}"), "generated_at": datetime.now(timezone.utc).isoformat()}
    except requests.RequestException as exc:
        raise HTTPException(status_code=502, detail="GitHub statistics are temporarily unavailable.") from exc
