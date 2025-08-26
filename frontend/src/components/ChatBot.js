import React, { useState, useEffect, useCallback } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { chatService } from '../services/api';
import '../styles/ChatBot.css';

const ChatBot = ({ idToken }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your Wikipedia assistant. Ask me anything and I'll search Wikipedia for you!",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const checkConnection = useCallback(async () => {
    try {
      await chatService.healthCheck(idToken);
      setIsConnected(true);
    } catch (error) {
      setIsConnected(false);
    }
  }, [idToken]);

  useEffect(() => {
    if (idToken) {
      checkConnection();
    } else {
      setIsConnected(false);
    }
  }, [idToken, checkConnection]);

  const handleSendMessage = async (messageText) => {
    if (!messageText.trim() || isLoading || !idToken) return;

    const userMessage = {
      id: Date.now(),
      text: messageText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await chatService.sendMessage(messageText, idToken);

      const botMessage = {
        id: Date.now() + 1,
        text: response.response,
        sender: 'bot',
        timestamp: new Date(),
        sources: response.sources,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        text: `Sorry, I encountered an error: ${error.message}. Please try again.`,
        sender: 'bot',
        timestamp: new Date(),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <div className="connection-status">
          <div className={`status-indicator ${isConnected ? 'connected' : 'disconnected'}`}></div>
          <span>{isConnected ? 'Connected' : 'Disconnected'}</span>
        </div>
      </div>

      <div className="chatbot-body">
        <MessageList messages={messages} isLoading={isLoading} />
        <MessageInput onSendMessage={handleSendMessage} disabled={!isConnected || isLoading} />
      </div>
    </div>
  );
};

export default ChatBot;
