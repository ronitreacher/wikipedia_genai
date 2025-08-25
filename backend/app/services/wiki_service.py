import wikipedia
import wikipediaapi
import re
import logging

logger = logging.getLogger(__name__)

# Configure Wikipedia API
wiki_wiki = wikipediaapi.Wikipedia(
    language='en',
    user_agent='WikipediaSearchBot/1.0 (contact: ronitroytcs@gmail.com)'
)

def clean_query(query: str) -> str:
    """
    Cleans natural language queries for Wikipedia search.
    Example: "Who is Elon Musk?" → "Elon Musk"
    """
    query = query.strip()
    query = re.sub(
        r"^(who is|who was|what is|what are|tell me about|give me information about|explain|define)\s+",
        "",
        query,
        flags=re.IGNORECASE
    )
    cleaned = query.rstrip("?.!")
    logger.info(f"Cleaned query: {cleaned}")
    return cleaned

def get_wikipedia_page(query: str):
    """
    Fetches a Wikipedia page using cleaned query and fallback search.
    """
    cleaned_query = clean_query(query)
    logger.info(f"Original query: {query}")
    logger.info(f"Cleaned query: {cleaned_query}")

    page = wiki_wiki.page(cleaned_query)
    logger.info(f"Direct page fetch for '{cleaned_query}': Exists={page.exists()}")

    if not page.exists():
        logger.info(f"No direct page found for '{cleaned_query}', trying fallback search...")
        try:
            search_results = wikipedia.search(cleaned_query)
            logger.info(f"Fallback search results: {search_results}")

            if search_results:
                best_match = search_results[0]
                logger.info(f"Using best match: {best_match}")
                page = wiki_wiki.page(best_match)
        except wikipedia.DisambiguationError as e:
            best_match = e.options[0]
            logger.info(f"Disambiguation encountered, using: {best_match}")
            page = wiki_wiki.page(best_match)
        except Exception as e:
            logger.error(f"Wikipedia search error: {e}")
            return None

    return page if page.exists() else None

def search_wikipedia(query: str) -> dict:
    """
    Returns summary and sources for a given query.
    """
    page = get_wikipedia_page(query)

    if page:
        max_length = 1500
        return {
            "response": page.summary[:max_length],
            "sources": [
                {
                    "title": page.title,
                    "url": page.fullurl
                }
            ]
        }

    cleaned_query = clean_query(query)
    return {
        "response": f"Sorry, I couldn't find any relevant Wikipedia articles for: '{cleaned_query}'.",
        "sources": []
    }
