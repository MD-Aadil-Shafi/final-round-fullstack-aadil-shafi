from fastapi import APIRouter, Depends, HTTPException, Query, Request
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select,func, or_, asc, desc

from app.schemas.vendor import VendorCreate, VendorUpdate, VendorResponse
from app.models.vendors import Vendor
from app.schemas.common import PaginationResponse
from app.db.session import get_db
from app.core.rate_limit import limiter

router = APIRouter(prefix="/vendors", tags=["Vendors"])

@limiter.limit("40/minute")
@router.post("/", response_model=VendorResponse)
async def create_vendor(
    request:Request,
    vendor: VendorCreate,
    db: AsyncSession = Depends(get_db),
):
    db_vendor = Vendor(
        **vendor.dict(),
    )
    db.add(db_vendor)
    await db.commit()
    await db.refresh(db_vendor)
    return db_vendor

@limiter.limit("40/minute")
@router.get("/{id}", response_model=VendorResponse)
async def get_vendor(
    request:Request,
    id: int,
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(
        select(Vendor).where(Vendor.id == id).limit(1)
    )
    vendor = result.scalar_one_or_none()
    
    if not vendor or vendor.is_deleted == True:
        raise HTTPException(404, "vendor not found")
    
    return vendor


@router.put("/{id}", response_model=VendorResponse)
async def update_vendor(
    id: int,
    vendor: VendorUpdate,
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Vendor).where(Vendor.id == id).limit(1)
    )
    db_vendor = result.scalar_one_or_none()
    
    if not db_vendor or db_vendor.is_deleted == True:
        raise HTTPException(404, "Vendor not found")
    
    
    for key, value in vendor.model_dump(exclude_unset=True).items():
        setattr(db_vendor, key, value)
        
    await db.commit()
    await db.refresh(db_vendor)
    return db_vendor


@router.delete("/{id}")
async def delete_vendor(
    id: int,
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(
        select(Vendor).where(
            Vendor.id == id,
            Vendor.is_deleted == False,
            ).limit(1)
    )
    vendor = result.scalar_one_or_none()
    
    if not vendor: 
        raise HTTPException(404, "vendor not found")
    
    vendor.is_deleted = True
    # uncomment this to delete permanently
    # await db.delete(vendor)
    await db.commit()
    return {"message": "vendor deleted"}


@router.get("/", response_model=PaginationResponse[VendorResponse])
async def list_vendors(
    db: AsyncSession = Depends(get_db),
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
    search: str | None = None,
    sort_by: str = "created_at",
    order: str = "desc",
):
    base_query = select(Vendor).where(Vendor.is_deleted == False)
    
    if search:
        base_query = base_query.where(
            or_(
                Vendor.name.ilike(f"%{search}%"),
                Vendor.contact.ilike(f"%{search}%"),
                Vendor.department.ilike(f"%{search}%"),
                Vendor.location.ilike(f"%{search}%"),
            )
        )
        
    count_query = select(func.count()).select_from(base_query.subquery())
    total = await db.scalar(count_query)
    
    sort_column = getattr(Vendor, sort_by, None)
    if not sort_column:
        raise HTTPException(400, "Invalid sort field")
    
    base_query = base_query.order_by(
        desc(sort_column) if order == "desc" else asc(sort_column)
    )
        
    base_query = base_query.offset((page - 1) * limit).limit(limit)
    
    result = await db.execute(base_query)
    
    return {
        "total": total,
        "page": page,
        "limit": limit,
        "items": result.scalars().all()
    }
        