import React from 'react';

const Message = ({ message }) => {
  const { text, sender, timestamp, sources, isError } = message;

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className={`message ${sender}-message ${isError ? 'error-message' : ''}`}>
      <div className="message-content">
        <div className="message-text">{text}</div>
        
        {sources && sources.length > 0 && (
          <div className="message-sources">
            <strong>Sources:</strong>
            <ul>
              {sources.map((source, index) => (
                <li key={index}>
                  <a href={source.url} target="_blank" rel="noopener noreferrer">
                    {source.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="message-timestamp">
          {formatTime(timestamp)}
        </div>
      </div>
    </div>
  );
};

export default Message;
