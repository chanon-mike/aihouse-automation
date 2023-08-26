from typing import Any, Generator

import pytest
import requests
from fastapi import FastAPI
from starlette.testclient import TestClient

from api.core.config import Settings, get_settings
from api.models.user import UserModel
from api.schemas.user import UserAccount as UserAccountSchema


@pytest.fixture(autouse=True)
def mock_tables() -> Generator[None, None, None]:
    """Mock DynamoDB table."""
    UserModel.Meta.table_name = "User_Test"
    if not UserModel.exists():
        UserModel.create_table(read_capacity_units=1, write_capacity_units=1, wait=True)
    yield
    UserModel.delete_table()


@pytest.fixture
def app() -> FastAPI:
    """Mock FastAPI."""
    from api.main import app as api_app

    return api_app


@pytest.fixture()
def client(app: FastAPI, mock_tables: Any) -> Generator[TestClient, None, None]:
    yield TestClient(app=app)


@pytest.fixture(scope="session")
def access_token() -> str:
    settings: Settings = get_settings()

    url = f"https://{settings.AUTH0_DOMAIN}/oauth/token"
    header = {"content-type": "application/json"}
    data = {
        "grant_type": "client_credentials",
        "client_id": settings.AUTH0_TEST_CLIENT_ID,
        "client_secret": settings.AUTH0_TEST_CLIENT_SECRET,
        "audience": settings.AUTH0_AUDIENCE,
    }

    response = requests.post(url, headers=header, json=data)
    return response.json()["access_token"]


@pytest.fixture
def mock_user() -> UserAccountSchema:
    return UserAccountSchema(
        id="test_id",
        name="test_name",
        email="test@example.com",
        room="test_room",
        reservations=["2023-8-10"],
    )
