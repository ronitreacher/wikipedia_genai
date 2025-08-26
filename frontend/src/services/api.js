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
  sendMessage: async (message, idToken) => {
    try {
      const response = await api.post(
        '/chat',
        { question: message },
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw new Error(error.response?.data?.detail || 'Failed to send message');
    }
  },

  healthCheck: async (idToken) => {
    try {
      const response = await api.get('/health', {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Health check failed:', error);
      throw new Error('Service unavailable');
    }
  },
};

export default api;
