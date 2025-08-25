# Wikipedia Chatbot

A full-stack chatbot application that uses Wikipedia as a knowledge source and Google's Gemini LLM to answer questions.

## 🚀 Features

- **React Frontend**: Modern UI with real-time chat interface
- **FastAPI Backend**: High-performance Python backend
- **LangChain Integration**: LLM orchestration framework
- **Wikipedia API**: Real-time knowledge retrieval
- **Google Gemini LLM**: Advanced natural language processing
- **Source Citations**: Transparent source attribution
- **Responsive Design**: Works on desktop and mobile

## 📋 Quick Setup

### Prerequisites
- Python 3.8+
- Node.js 14+
- Google Gemini API key

### 1. Get API Key
1. Go to [Google AI Studio](https://ai.google.dev)
2. Create a new API key
3. Copy the API key for later use

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file and add your API key
echo "GOOGLE_API_KEY=your_api_key_here" > .env
echo "PORT=8000" >> .env

# Run the backend server
python run.py
```

### 3. Frontend Setup
```bash
# Open new terminal and navigate to frontend
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
```

## 🌐 Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

## 📁 Project Structure

```
chatbot-project/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py              # FastAPI app
│   │   ├── models.py            # Pydantic models
│   │   ├── services/
│   │   │   ├── __init__.py
│   │   │   ├── llm_service.py   # Gemini LLM integration
│   │   │   └── wiki_service.py  # Wikipedia API
│   │   └── routers/
│   │       ├── __init__.py
│   │       └── chat.py          # Chat endpoints
│   ├── requirements.txt
│   ├── .env                     # Environment variables
│   └── run.py                   # Server runner
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatBot.js       # Main chat component
│   │   │   ├── MessageList.js   # Message list
│   │   │   ├── MessageInput.js  # Input component
│   │   │   └── Message.js       # Individual message
│   │   ├── services/
│   │   │   └── api.js           # API service
│   │   ├── styles/
│   │   │   └── ChatBot.css      # Styles
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   ├── package.json
│   └── .env
├── README.md
└── .gitignore
```

## 🔧 API Endpoints

- `GET /` - Health check
- `POST /api/chat` - Send message and get response
- `GET /api/health` - Service health status
- `GET /docs` - API documentation (Swagger UI)

## 🛠 Technology Stack

### Backend
- **FastAPI**: Modern Python web framework
- **LangChain**: LLM application framework
- **Google Gemini Pro**: Large language model
- **Wikipedia API**: Knowledge source
- **Pydantic**: Data validation
- **Uvicorn**: ASGI server

### Frontend
- **React 18**: JavaScript UI library
- **Axios**: HTTP client
- **CSS3**: Modern styling with animations
- **Responsive Design**: Mobile-friendly interface

## 🎨 Features in Detail

### Backend Features
- **Async Processing**: FastAPI's async capabilities
- **Error Handling**: Comprehensive error management
- **CORS Support**: Cross-origin resource sharing
- **Type Validation**: Pydantic models
- **Logging**: Structured logging throughout

### Frontend Features
- **Real-time Chat**: Interactive chat interface
- **Typing Indicators**: Visual feedback during processing
- **Source Citations**: Wikipedia links with each response
- **Connection Status**: Backend connectivity monitoring
- **Responsive Design**: Works on all device sizes
- **Smooth Animations**: CSS transitions and animations

## 🚀 Deployment

### Backend Deployment (Docker)
```dockerfile
FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["python", "run.py"]
```

### Frontend Deployment
```bash
# Build for production
npm run build

# Deploy the build folder to your hosting service
# (Netlify, Vercel, AWS S3, etc.)
```

## 🔒 Environment Variables

### Backend (.env)
```env
GOOGLE_API_KEY=your_gemini_api_key_here
PORT=8000
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:8000/api
```

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure backend CORS settings include frontend URL
   - Check if both servers are running

2. **API Key Issues**
   - Verify Gemini API key is correct
   - Check API key permissions in Google Cloud

3. **Dependencies**
   - Ensure Python 3.8+ and Node.js 14+ are installed
   - Clear npm/pip cache if installation fails

4. **Port Conflicts**
   - Backend runs on port 8000
   - Frontend runs on port 3000
   - Change ports in .env files if needed

### Debug Mode
Enable detailed logging:
```python
# In backend/app/main.py
logging.basicConfig(level=logging.DEBUG)
```

## 📝 Usage Examples

### Example Conversations
- "What is artificial intelligence?"
- "Tell me about the history of Python programming language"
- "How do solar panels work?"
- "What are the causes of climate change?"

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature-name`
3. Make changes and add tests
4. Commit changes: `git commit -am 'Add feature'`
5. Push to branch: `git push origin feature-name`
6. Create Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Google for Gemini LLM API
- Wikipedia for free knowledge access
- LangChain team for excellent framework
- FastAPI and React communities

## 📞 Support

For issues and questions:
1. Check this README
2. Review troubleshooting section
3. Create GitHub issue with details
4. Include error logs and reproduction steps