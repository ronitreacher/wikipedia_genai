import React, { useState } from 'react';
import GoogleLogin from './components/GoogleLogin';
import ChatBot from './components/ChatBot';
import './App.css';

function App() {
  const [idToken, setIdToken] = useState(null);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Wikipedia Chatbot</h1>
        <p>Ask me anything and I'll search Wikipedia for answers!</p>
      </header>
      <main>
        {!idToken && <GoogleLogin onLogin={setIdToken} />}
        {idToken && <ChatBot idToken={idToken} />}
      </main>
    </div>
  );
}

export default App;
