from pydantic import BaseSettings, validator


class Settings(BaseSettings):
    """
    Settings for the FastAPI server.
    """
    # AUTH0 configuration
    AUTH0_DOMAIN: str
    AUTH0_AUDIENCE: str

    # FastAPI configuration
    PORT: int
    CLIENT_ORIGIN_URL: str
    RELOAD: bool

    @classmethod
    @validator("CLIENT_ORIGIN_URL", "AUTH0_AUDIENCE", "AUTH0_DOMAIN")
    def check_not_empty(cls, v):
        assert v != "", f"{v} is not defined"
        return v

    class Config:
        """
        Tell BaseSettings the env file path
        """
        env_file = ".env"
        env_file_encoding = "utf-8"


settings = Settings()
