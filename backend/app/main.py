from fastapi import FastAPI, Header, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from .routers import chat
import logging
import os
from dotenv import load_dotenv
from google.oauth2 import id_token
from google.auth.transport import requests

# Load environment variables from .env file
load_dotenv()

app = FastAPI(
    title="Wikipedia Chatbot API",
    description="A chatbot that answers questions using Wikipedia and Gemini LLM",
    version="1.0.0"
)


@app.on_event("startup")
async def startup_event():
    # Any startup initialization here
    pass


# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


# Check if API key is loaded
GOOGLE_CLIENT_ID = os.getenv('GOOGLE_CLIENT_ID')
if not GOOGLE_CLIENT_ID:
    logger.error("GOOGLE_CLIENT_ID not found in environment variables!")
    logger.error("Please check your .env file in the backend directory")
else:
    logger.info("Google Client ID loaded successfully")

frontend_url = os.getenv("FRONTEND_URL")
# Configure CORS
app.add_middleware(
    CORSMiddleware,
    # allow_origins=["http://localhost:3000", "http://127.0.0.1:3000", frontend_url],
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Allowed users' emails (can also be loaded from env or DB)
ALLOWED_USERS = {'ronitroytcs@gmail.com', 'ronitroyofficial96@gmail.com'}


def verify_token(authorization: str = Header(...)):
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid authorization header")

    token = authorization.split(" ")[1]
    try:
        # Verify token and audience (Google Client ID)
        id_info = id_token.verify_oauth2_token(token, requests.Request(), GOOGLE_CLIENT_ID)
        email = id_info.get("email")
        if email not in ALLOWED_USERS:
            raise HTTPException(status_code=403, detail="User not authorized")
        return id_info
    except Exception as e:
        logger.error(f"Token verification error: {e}")
        raise HTTPException(status_code=401, detail="Invalid or expired token")


# Override or extend existing endpoints to include user verification

@app.get("/api/health")
async def health_check(user=Depends(verify_token)):
    return {"status": "ok", "user": user.get("email")}


# Include routers, optionally add verify_token dependency if needed
app.include_router(chat.router, prefix="/api", tags=["chat"])

@app.get("/")
async def root():
    return {"message": "Wikipedia Chatbot API is running"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
