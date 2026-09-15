from typing import Dict, Any, List, Optional
from sqlalchemy.orm import Session
from backend.app.models.marketplace import MarketplaceProduct
from backend.app.models.business import Business
from backend.app.models.notification import Notification
from backend.app.services.audit_service import log_audit

DEFAULT_PRODUCTS = [
    {
        "id": "prod-1",
        "businessId": "biz-kavya-1",
        "name": "Millet Crunch (Spiced Ragi & Foxtail Clusters)",
        "brand": "Namma Crunch",
        "founderId": "founder-kavya-1",
        "founderName": "Kavya",
        "category": "Food & Beverages",
        "price": 240.0,
        "originalPrice": 280.0,
        "original_price": 280.0,
        "unit": "Pack of 2 (150g each)",
        "location": "Madurai, Tamil Nadu",
        "rating": 4.9,
        "reviewCount": 142,
        "badge": "Bestseller",
        "isVerified": True,
        "isActive": True,
        "stock": 150,
        "imageUrl": "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=500&auto=format&fit=crop&q=80",
        "image": "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=500&auto=format&fit=crop&q=80",
        "description": "Crunchy, oven-roasted heirloom millet bites seasoned with traditional South Indian curry leaf spices and cold-pressed oil. 0% preservatives, high fiber, gluten-free."
    },
    {
        "id": "prod-2",
        "businessId": "biz-2",
        "name": "Wood-Pressed Virgin Sesame Oil",
        "brand": "Vaigai Naturals",
        "founderId": "founder-2",
        "founderName": "Murugan P.",
        "category": "Food & Beverages",
        "price": 380.0,
        "originalPrice": 420.0,
        "original_price": 420.0,
        "unit": "500ml Glass Bottle",
        "location": "Theni, Tamil Nadu",
        "rating": 4.8,
        "reviewCount": 96,
        "badge": "Artisanal",
        "isVerified": True,
        "isActive": True,
        "stock": 80,
        "imageUrl": "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&auto=format&fit=crop&q=80",
        "image": "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&auto=format&fit=crop&q=80",
        "description": "Extracted using traditional Vaagai wood pestles at low RPM to retain vital nutrients and rich aroma."
    },
    {
        "id": "prod-3",
        "businessId": "biz-3",
        "name": "Pure Handloom Organic Cotton Tunic",
        "brand": "Chettinad Weaves",
        "founderId": "founder-3",
        "founderName": "Meenakshi S.",
        "category": "Fashion",
        "price": 950.0,
        "originalPrice": 1200.0,
        "original_price": 1200.0,
        "unit": "1 Piece",
        "location": "Karaikudi, Tamil Nadu",
        "rating": 4.7,
        "reviewCount": 64,
        "badge": "Eco-Friendly",
        "isVerified": True,
        "isActive": True,
        "stock": 40,
        "imageUrl": "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=500&auto=format&fit=crop&q=80",
        "image": "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=500&auto=format&fit=crop&q=80",
        "description": "Breathable natural dyed handspun khadi cotton tunic, stitched by master rural weavers."
    },
    {
        "id": "prod-4",
        "businessId": "biz-4",
        "name": "Wild Moringa & Tulsi Herbal Infusion",
        "brand": "GreenRoots Herbal",
        "founderId": "founder-4",
        "founderName": "Senthil Nathan",
        "category": "Food & Beverages",
        "price": 220.0,
        "originalPrice": 260.0,
        "original_price": 260.0,
        "unit": "25 Pyramid Bags",
        "location": "Dindigul, Tamil Nadu",
        "rating": 4.9,
        "reviewCount": 118,
        "badge": "Immunity Boost",
        "isVerified": True,
        "isActive": True,
        "stock": 120,
        "imageUrl": "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=500&auto=format&fit=crop&q=80",
        "image": "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=500&auto=format&fit=crop&q=80",
        "description": "Sun-shade dried organic drumstick leaves infused with Krishna tulsi for daily antioxidant wellness."
    }
]


def list_products(
    db: Optional[Session],
    category: Optional[str] = None,
    search: Optional[str] = None,
    page: int = 1,
    limit: int = 20
) -> Dict[str, Any]:
    take = min(50, max(1, limit))
    skip = (max(1, page) - 1) * take

    products = []
    if db:
        query = db.query(MarketplaceProduct).filter(MarketplaceProduct.is_active == True)
        if category and category.lower() != "all":
            query = query.filter(MarketplaceProduct.category.ilike(f"%{category}%"))
        if search:
            query = query.filter(
                (MarketplaceProduct.name.ilike(f"%{search}%")) |
                (MarketplaceProduct.description.ilike(f"%{search}%"))
            )
        db_prods = query.all()
        for p in db_prods:
            products.append({
                "id": p.id,
                "businessId": p.business_id,
                "name": p.name,
                "description": p.description,
                "category": p.category,
                "price": p.price,
                "originalPrice": p.original_price or (p.price + 40.0),
                "original_price": p.original_price,
                "unit": p.unit,
                "imageUrl": p.image_url,
                "image": p.image_url,
                "stock": p.stock,
                "isVerified": p.is_verified,
                "isActive": p.is_active
            })

    if not products:
        products = list(DEFAULT_PRODUCTS)
        if category and category.lower() != "all":
            products = [p for p in products if p["category"].lower() == category.lower()]
        if search:
            q = search.lower()
            products = [p for p in products if q in p["name"].lower() or q in p["description"].lower()]

    paginated = products[skip : skip + take]
    return {
        "total": len(products),
        "page": page,
        "limit": take,
        "products": paginated
    }


def get_product_by_id(db: Optional[Session], product_id: str) -> Optional[Dict[str, Any]]:
    if db:
        p = db.query(MarketplaceProduct).filter(MarketplaceProduct.id == product_id).first()
        if p:
            return {
                "id": p.id,
                "businessId": p.business_id,
                "name": p.name,
                "description": p.description,
                "category": p.category,
                "price": p.price,
                "originalPrice": p.original_price,
                "unit": p.unit,
                "imageUrl": p.image_url,
                "image": p.image_url,
                "stock": p.stock,
                "isVerified": p.is_verified,
                "isActive": p.is_active
            }

    for default_p in DEFAULT_PRODUCTS:
        if default_p["id"] == product_id:
            return default_p

    return None


def create_product(
    db: Session,
    founder_id: str,
    data: Dict[str, Any],
    ip_address: Optional[str] = None
) -> Dict[str, Any]:
    business_id = data.get("businessId")
    if not business_id and db:
        biz = db.query(Business).filter(Business.founder_id == founder_id).first()
        business_id = biz.id if biz else "biz-default"

    price = float(data.get("price", 100.0) or 100.0)
    orig_price = float(data.get("originalPrice", price + 50.0) or price + 50.0)

    prod = MarketplaceProduct(
        business_id=business_id or "biz-default",
        name=data.get("name", "New Product"),
        description=data.get("description", ""),
        category=data.get("category", "Food & Beverages"),
        price=price,
        original_price=orig_price,
        unit=data.get("unit", "Pack of 1"),
        image_url=data.get("imageUrl") or data.get("image") or "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=500&auto=format&fit=crop&q=80",
        stock=int(data.get("stock", 100) or 100),
        is_verified=True,
        is_active=True
    )

    if db:
        db.add(prod)
        notif = Notification(
            user_id=founder_id,
            title="Product Listed on Marketplace",
            message=f"'{prod.name}' is now live on the Namma-Connect regional D2C Marketplace!",
            type="SYSTEM",
            read=False,
            link="/marketplace"
        )
        db.add(notif)
        db.commit()
        db.refresh(prod)
        log_audit(db, founder_id, "PRODUCT_CREATED", "MarketplaceProduct", prod.id, ip_address=ip_address)

    return {
        "id": prod.id,
        "businessId": prod.business_id,
        "name": prod.name,
        "description": prod.description,
        "category": prod.category,
        "price": prod.price,
        "originalPrice": prod.original_price,
        "unit": prod.unit,
        "imageUrl": prod.image_url,
        "stock": prod.stock,
        "isVerified": prod.is_verified,
        "isActive": prod.is_active
    }


def update_product(
    db: Session,
    product_id: str,
    data: Dict[str, Any],
    user_id: str,
    ip_address: Optional[str] = None
) -> Optional[Dict[str, Any]]:
    if not db:
        return None
    prod = db.query(MarketplaceProduct).filter(MarketplaceProduct.id == product_id).first()
    if not prod:
        return None

    if "name" in data and data["name"] is not None:
        prod.name = data["name"]
    if "description" in data and data["description"] is not None:
        prod.description = data["description"]
    if "category" in data and data["category"] is not None:
        prod.category = data["category"]
    if "price" in data and data["price"] is not None:
        prod.price = float(data["price"])
    if "originalPrice" in data and data["originalPrice"] is not None:
        prod.original_price = float(data["originalPrice"])
    if "stock" in data and data["stock"] is not None:
        prod.stock = int(data["stock"])
    if "unit" in data and data["unit"] is not None:
        prod.unit = data["unit"]
    if "imageUrl" in data and data["imageUrl"] is not None:
        prod.image_url = data["imageUrl"]

    db.commit()
    db.refresh(prod)
    log_audit(db, user_id, "PRODUCT_UPDATED", "MarketplaceProduct", prod.id, ip_address=ip_address)
    return {
        "id": prod.id,
        "businessId": prod.business_id,
        "name": prod.name,
        "description": prod.description,
        "category": prod.category,
        "price": prod.price,
        "originalPrice": prod.original_price,
        "unit": prod.unit,
        "imageUrl": prod.image_url,
        "stock": prod.stock,
        "isVerified": prod.is_verified,
        "isActive": prod.is_active
    }


def delete_product(db: Session, product_id: str, user_id: str, ip_address: Optional[str] = None) -> bool:
    if not db:
        return False
    prod = db.query(MarketplaceProduct).filter(MarketplaceProduct.id == product_id).first()
    if not prod:
        return False
    prod.is_active = False
    db.commit()
    log_audit(db, user_id, "PRODUCT_DELETED", "MarketplaceProduct", prod.id, ip_address=ip_address)
    return True
