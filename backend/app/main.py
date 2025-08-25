from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import chat
import logging
import os
from dotenv import load_dotenv

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
api_key = os.getenv('GOOGLE_API_KEY')
if not api_key:
    logger.error("GOOGLE_API_KEY not found in environment variables!")
    logger.error("Please check your .env file in the backend directory")
else:
    logger.info("Google API key loaded successfully")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(chat.router, prefix="/api", tags=["chat"])

@app.get("/")
async def root():
    return {"message": "Wikipedia Chatbot API is running"}
@app.get("/api/health")
async def health_check():
    return {"status": "ok"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)