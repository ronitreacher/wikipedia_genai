import React, { useState } from 'react';

const MessageInput = ({ onSendMessage, disabled }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() && !disabled) {
      onSendMessage(inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form className="message-input-container" onSubmit={handleSubmit}>
      <div className="input-group">
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={disabled ? "Connecting..." : "Ask me anything about Wikipedia..."}
          disabled={disabled}
          className="message-input"
          rows={1}
        />
        <button
          type="submit"
          disabled={disabled || !inputValue.trim()}
          className="send-button"
        >
          Send
        </button>
      </div>
    </form>
  );
};

export default MessageInput;