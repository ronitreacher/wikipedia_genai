import uvicorn
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Check if API key exists
api_key = os.getenv('GOOGLE_API_KEY')
if not api_key:
    print("❌ ERROR: GOOGLE_API_KEY not found!")
    print("Please check your .env file and make sure it contains:")
    print("GOOGLE_API_KEY=your_actual_api_key_here")
    exit(1)
else:
    print("✅ Google API key loaded successfully")

from app.main import app

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)