from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.orm import Session
from typing import Optional, Dict, Any

from backend.app.core.database import get_db
from backend.app.core.dependencies import get_current_user
from backend.app.services import marketplace_service
from backend.app.schemas.marketplace import ProductCreate

router = APIRouter(tags=["Marketplace"])


@router.get("")
@router.get("/")
def list_products(

    category: Optional[str] = None,
    search: Optional[str] = None,
    page: int = 1,
    limit: int = 20,
    db: Session = Depends(get_db)
):
    result = marketplace_service.list_products(db, category=category, search=search, page=page, limit=limit)
    return {
        "success": True,
        **result
    }


@router.get("/{id}")
def get_product(id: str, db: Session = Depends(get_db)):
    prod = marketplace_service.get_product_by_id(db, id)
    if not prod:
        raise HTTPException(status_code=404, detail="Product not found")
    return {
        "success": True,
        "product": prod
    }


@router.post("/products", status_code=status.HTTP_201_CREATED)
def create_product(
    data: ProductCreate,
    request: Request,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    client_ip = request.client.host if request.client else None
    prod = marketplace_service.create_product(
        db=db,
        founder_id=current_user["id"],
        data=data.model_dump(),
        ip_address=client_ip
    )
    return {
        "success": True,
        "product": prod
    }


@router.patch("/products/{id}")
def update_product(
    id: str,
    data: Dict[str, Any],
    request: Request,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    client_ip = request.client.host if request.client else None
    updated = marketplace_service.update_product(
        db=db,
        product_id=id,
        data=data,
        user_id=current_user["id"],
        ip_address=client_ip
    )
    if not updated:
        raise HTTPException(status_code=404, detail="Product not found")
    return {
        "success": True,
        "product": updated
    }


@router.delete("/products/{id}")
def delete_product(
    id: str,
    request: Request,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    client_ip = request.client.host if request.client else None
    success = marketplace_service.delete_product(
        db=db,
        product_id=id,
        user_id=current_user["id"],
        ip_address=client_ip
    )
    return {"success": success, "message": "Product removed from marketplace"}
