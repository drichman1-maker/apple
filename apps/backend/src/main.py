from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from contextlib import asynccontextmanager
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
import asyncio

# Rate Limiter Setup
# CRITICAL: In production, MUST use storage_uri="redis://..." for multi-instance deployments
# Without Redis, each instance has its own counter, making limits ineffective
def get_tenant_id(request: Request):
    return request.headers.get("x-app-id", "default")

limiter = Limiter(key_func=get_tenant_id, default_limits=["100/minute"])

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Start cleanup task
    from .tasks import run_cleanup_loop
    cleanup_task = asyncio.create_task(run_cleanup_loop())
    
    yield
    
    # Clean up resources
    cleanup_task.cancel()
    try:
        await cleanup_task
    except asyncio.CancelledError:
        pass


app = FastAPI(title="Stateless Backend API", lifespan=lifespan)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

@app.middleware("http")
async def verify_app_id(request: Request, call_next):
    # Health check bypass
    if request.url.path == "/health":
        return await call_next(request)
    
    from .validators import validate_app_id, sanitize_log_string
    
    app_id = request.headers.get("x-app-id")
    is_valid, error_msg = validate_app_id(app_id)
    
    if not is_valid:
        return JSONResponse(
            status_code=401,
            content={"detail": error_msg}
        )
    
    # Inject validated app_id into state
    request.state.app_id = app_id
    response = await call_next(request)
    return response

# Apply global limit explicitly if needed, but default_limits handles it.


@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.get("/")
def read_root(request: Request):
    return {"message": "Hello World", "tenant": request.state.app_id}

# Monetization Endpoints
from .monetization import MonetizationService
from pydantic import BaseModel

monetization = MonetizationService()

class ReceiptRequest(BaseModel):
    receipt_data: str

@app.post("/monetization/referral")
def create_referral(request: Request):
    code = monetization.generate_affiliate_code(request.state.app_id)
    return {"code": code}

@app.post("/monetization/validate-receipt")
def validate_ios_receipt(payload: ReceiptRequest):
    is_valid = monetization.validate_receipt(payload.receipt_data)
    return {"valid": is_valid}
