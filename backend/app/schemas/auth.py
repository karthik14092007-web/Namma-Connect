from typing import Optional
from pydantic import BaseModel


class RegisterRequest(BaseModel):
    email: str
    password: Optional[str] = None
    firstName: Optional[str] = None
    lastName: Optional[str] = None
    role: str = "FOUNDER"
    phone: Optional[str] = None
    location: Optional[str] = "Tamil Nadu"


class LoginRequest(BaseModel):
    email: str
    password: str


class UserResponse(BaseModel):
    id: str
    email: str
    firstName: str
    lastName: str
    role: str
    isEmailVerified: bool = False


class TokenResponse(BaseModel):
    success: bool = True
    accessToken: str
    tokenType: str = "bearer"
    user: UserResponse
