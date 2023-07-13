import time

from fastapi import Depends, FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer
from mangum import Mangum

from api.config import Settings, get_settings
from api.models.payload import Payload
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


handler = Mangum(app)  # for AWS Lambda


# add middleware which calculates time of the request processing
# and assign it to the response header
@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time-Sec"] = str(process_time)
    return response
