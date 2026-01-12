from typing import Optional
from pydantic import BaseModel, Field


class ExpenseCreate(BaseModel):
    amount: float = Field(..., gt=0)
    vendor_id: int
    
class ExpenseUpdate(BaseModel):
    amount: Optional[float] = Field(None, gt=0)
    vendor_id: Optional[int] = None

class ExpenseResponse(ExpenseCreate):
    id: int
    class Config:
        from_attributes = True
