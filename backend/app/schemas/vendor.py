from typing import Optional
from pydantic import BaseModel, EmailStr, Field

class VendorBase(BaseModel):
    logo: Optional[str] = None
    contact: Optional[EmailStr] = None
    owner_first_name: str = Field(None, max_length=20)
    owner_last_name: str = Field(None, max_length=20)
    description: Optional[str] = None
    location: Optional[str] = None
    payment_type: str
    department: Optional[str] = None

    
    
class VendorCreate(VendorBase):
    name: str = Field(..., max_length=20)
    about: str = Field(..., max_length=20)
    active: bool = True


class VendorUpdate(VendorBase):
    name: str = Field(None, max_length=20)
    about: str = Field(None, max_length=20)
    active: Optional[bool] = None
    
    
class VendorResponse(VendorBase):
    id: int
    name: str
    about: str
    active: bool

    class Config:
        from_attributes = True



