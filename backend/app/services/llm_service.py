import os
from langchain_google_genai import GoogleGenerativeAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from typing import List, Dict
import logging
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()


logger = logging.getLogger(__name__)

class LLMService:
    def __init__(self):
        api_key = os.getenv('GOOGLE_API_KEY')
        if not api_key:
            raise ValueError("GOOGLE_API_KEY environment variable is not set")
        
        self.llm = GoogleGenerativeAI(
        model="gemini-2.5-flash-lite",
        google_api_key=api_key,
        temperature=0.7
        )


        
        
        self.prompt_template = PromptTemplate(
            input_variables=["question", "context"],
            template="""
            You are a helpful AI assistant that answers questions based on Wikipedia content.
            
            Question: {question}
            
            Context from Wikipedia:
            {context}
            
            Please provide a comprehensive answer based on the Wikipedia content above. 
            If the context doesn't contain enough information to answer the question, 
            say so politely and provide what information you can.
            
            Answer:
            """
        )
        
        self.chain = LLMChain(
            llm=self.llm,
            prompt=self.prompt_template
        )
    
    def generate_response(self, question: str, wikipedia_articles: List[Dict[str, str]]) -> str:
        """Generate response using Gemini LLM and Wikipedia context"""
        try:
            # Combine Wikipedia articles into context
            context = ""
            for article in wikipedia_articles:
                context += f"Title: {article['title']}\n"
                context += f"Content: {article['content']}\n"
                context += f"Source: {article['url']}\n\n"
            
            if not context.strip():
                context = "No relevant Wikipedia articles found."
            
            # Generate response using LLMChain
            response = self.chain.run(
                question=question,
                context=context
            )
            
            return response.strip()
            
        except Exception as e:
            logger.error(f"Error generating response: {str(e)}")
            return "I apologize, but I encountered an error while processing your question. Please try again."