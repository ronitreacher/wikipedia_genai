from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Dict
from app.services.llm_service import LLMService
from app.services.wiki_service import search_wikipedia as fetch_wikipedia_articles

router = APIRouter()

# Request and Response Models
class ChatRequest(BaseModel):
    question: str

class ChatResponse(BaseModel):
    response: str
    sources: List[Dict[str, str]]

# Initialize LLM service
llm_service = LLMService()

@router.post("/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    try:
        question = request.question

        # Fetch Wikipedia data using wiki_service
        wiki_result = fetch_wikipedia_articles(question)

        # If no results, respond gracefully
        if not wiki_result["sources"]:
            return ChatResponse(
                response=f"Sorry, I couldn't find any relevant Wikipedia articles for: '{question}'.",
                sources=[]
            )

        # Construct the Wikipedia articles for LLM
        wikipedia_articles = [{
            "title": wiki_result["sources"][0]["title"],
            "content": wiki_result["response"],  # Using the summary/content
            "url": wiki_result["sources"][0]["url"]
        }]

        # Call the LLM to generate a response
        answer = llm_service.generate_response(
            question=question,
            wikipedia_articles=wikipedia_articles
        )

        # Prepare the sources for API response
        sources = [{
            "title": wiki_result["sources"][0]["title"],
            "url": wiki_result["sources"][0]["url"]
        }]

        return ChatResponse(response=answer, sources=sources)

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")
