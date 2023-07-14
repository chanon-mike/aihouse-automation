import time
from api.models.db import create_table_if_not_exist
from typing import List

from fastapi import Depends, FastAPI, Request, Body
from fastapi.middleware.cors import CORSMiddleware
from mangum import Mangum

import api.repos.user as user_repo
import api.repos.reservation as reservation_repo
from api.config import Settings, get_settings
from api.models.payload import Payload
from api.models.user import User
from api.security.dependencies import verify_token

app = FastAPI(
    title="aihouse-serverless",
    openapi_url="/openapi.json",
    docs_url="/docs",
)
settings: Settings = get_settings()
create_table_if_not_exist()

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CLIENT_ORIGIN_URL,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/user")
def get_all_user():
    """Get all user objects from the database"""
    return user_repo.get_all_users()


@app.post("/user")
def post_user(user: User):
    """Create a user object to the database"""
    return user_repo.create_user(user)


@app.get("/user/{user_id}")
def get_user(user_id: str, token: Payload = Depends(verify_token)):
    """Get a user object from the database"""
    return user_repo.get_user_by_id(user_id)


@app.put("/user/{user_id}/reservation")
def update_user_reservation(
    user_id: str, reservation_date: List[str] = Body(...), token: Payload = Depends(verify_token)
):
    """Update a user's reservation dates"""
    return reservation_repo.update_user_reservation(user_id, reservation_date)


@app.delete("/user/{user_id}")
def delete_user(user_id: str, token: Payload = Depends(verify_token)):
    """Delete a user object from the database"""
    return user_repo.delete_user(user_id)


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
