from typing import Optional
from pydantic import BaseModel, EmailStr


class RegisterRequest(BaseModel):
    email: EmailStr
    password: Optional[str] = None
    firstName: Optional[str] = None
    lastName: Optional[str] = None
    role: str = "FOUNDER"
    phone: Optional[str] = None
    location: Optional[str] = "Tamil Nadu"


class LoginRequest(BaseModel):
    email: EmailStr
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
