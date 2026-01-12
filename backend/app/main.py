from fastapi import FastAPI
from app.db.session import engine
from app.db.base import Base
from app.routes import vendors
from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware
from app.core.rate_limit import limiter
from app.core.errors import rate_limit_handler
from fastapi.exceptions import RequestValidationError
from app.core.errors import (
    validation_exception_handler,
    generic_exception_handler
)
import app.models
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="vendors api for theta by Aadil")

app.state.limiter = limiter
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "*",
    ],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(SlowAPIMiddleware)
app.add_exception_handler(RateLimitExceeded, rate_limit_handler)
app.add_exception_handler(RequestValidationError, validation_exception_handler)
app.add_exception_handler(Exception, generic_exception_handler)


@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
        
app.include_router(vendors.router)


# run by below command by activation venv
# uvicorn app.main:app --reload --port 8000
