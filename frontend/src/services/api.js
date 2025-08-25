import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const chatService = {
  sendMessage: async (message) => {
    try {
      const response = await api.post('/chat', { question: message });
      return response.data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw new Error(error.response?.data?.detail || 'Failed to send message');
    }
  },

  healthCheck: async () => {
    try {
      const response = await api.get('/health');
      return response.data;
    } catch (error) {
      console.error('Health check failed:', error);
      throw new Error('Service unavailable');
    }
  },
};

export default api;