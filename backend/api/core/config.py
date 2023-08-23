from functools import lru_cache
from typing import Optional

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """
    Settings for the FastAPI server.
    """

    CLIENT_ORIGIN_URL: str

    # AUTH0 configuration
    AUTH0_DOMAIN: str
    AUTH0_AUDIENCE: str

    # Testing AUTH0 configuration
    AUTH0_TEST_CLIENT_ID: Optional[str] = None
    AUTH0_TEST_CLIENT_SECRET: Optional[str] = None

    # AWS
    AWS_KEY: str
    AWS_SECRET: str
    AWS_REGION: str
    STAGE: Optional[str] = "local"

    model_config = SettingsConfigDict(env_file=".env")


@lru_cache()
def get_settings(**kwargs) -> Settings:
    """
    Get settings. ready for FastAPI's Depends.

    lru_cache - cache the Settings object per arguments given.
    """
    settings = Settings(**kwargs)
    return settings
