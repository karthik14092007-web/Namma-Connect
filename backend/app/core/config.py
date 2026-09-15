import os
from pathlib import Path
from pydantic_settings import BaseSettings, SettingsConfigDict

# Base directory for backend
BASE_DIR = Path(__file__).resolve().parent.parent.parent


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=(BASE_DIR / ".env", BASE_DIR.parent / ".env"),
        env_file_encoding="utf-8",
        extra="ignore"
    )

    # Supabase Connection
    supabase_url: str = ""
    supabase_anon_key: str = ""
    supabase_service_role_key: str = ""
    supabase_jwt_secret: str = "namma_connect_supabase_jwt_secret_development_only"

    # PostgreSQL Database URL (Supabase Connection Pooler or Direct)
    database_url: str = ""

    # JWT Settings
    jwt_audience: str = "authenticated"
    jwt_algorithm: str = "HS256"

    # Application Settings
    port: int = 5000
    environment: str = "development"
    client_url: str = "http://localhost:5173"

    @property
    def is_database_configured(self) -> bool:
        return bool(self.database_url and self.database_url.startswith("postgresql"))


settings = Settings()
