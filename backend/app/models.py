from pydantic import BaseModel
from typing import List, Optional

class ChatMessage(BaseModel):
    message: str
    
class ChatResponse(BaseModel):
    response: str
    sources: Optional[List[str]] = []
    
class HealthResponse(BaseModel):
    status: str
    message: str