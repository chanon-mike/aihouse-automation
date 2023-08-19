import time

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from mangum import Mangum

from api.config import Settings, get_settings
from api.models.db import create_table_if_not_exist
from api.routes.user import router as user_router

settings: Settings = get_settings()
create_table_if_not_exist()

app = FastAPI(
    title="aihouse-serverless",
    openapi_url="/openapi.json",
    docs_url="/docs",
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CLIENT_ORIGIN_URL,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(user_router)


@app.get("/")
def root():
    return {"Hello": "World"}


@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    """Add process time header to the response header"""
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time-Sec"] = str(process_time)
    return response


handler = Mangum(app)  # for AWS Lambda
