from typing import Optional
from pydantic import BaseModel


class ProductCreate(BaseModel):
    name: str
    description: str
    category: str
    price: float
    originalPrice: Optional[float] = None
    unit: Optional[str] = "Pack of 1"
    imageUrl: Optional[str] = None
    stock: Optional[int] = 100


class ProductResponse(BaseModel):
    id: str
    businessId: str
    name: str
    description: str
    category: str
    price: float
    originalPrice: Optional[float] = None
    unit: str
    imageUrl: Optional[str] = None
    stock: int
    isVerified: bool = True
    isActive: bool = True
