from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer

from api.core.config import Settings, get_settings
from api.schemas.payload import Payload
from api.security.dependencies import verify_token

app = FastAPI()
settings: Settings = get_settings()
token_auth_scheme = HTTPBearer()

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CLIENT_ORIGIN_URL,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/public")
def public():
    """No access token required to access this route"""

    result = {
        "status": "success",
        "msg": (
            "Hello from a public endpoint! "
            "You don't need to be authenticated to see this."
        ),
    }
    return result


@app.get("/api/private")
def private(token: Payload = Depends(verify_token)):
    """A valid access token is required to access this route"""
    print(token)
    result = {
        "status": "success",
        "msg": (
            "Hello from a private endpoint! "
            "You need to be authenticated to see this."
        ),
    }
    return result


@app.get("/")
def root():
    return {"Hello": "World"}
