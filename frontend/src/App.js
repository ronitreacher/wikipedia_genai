import React from 'react';
import ChatBot from './components/ChatBot';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Wikipedia Chatbot</h1>
        <p>Ask me anything and I'll search Wikipedia for answers!</p>
      </header>
      <main>
        <ChatBot />
      </main>
    </div>
  );
}

export default App;