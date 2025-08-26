import React, { useState } from 'react';
import jwt_decode from 'jwt-decode';
import GoogleLogin from './components/GoogleLogin';
import ChatBot from './components/ChatBot';
import './App.css';

const allowedUsers = ['ronitroytcs@gmail.com', 'ronitroyofficial96@gmail.com'];

function App() {
  const [idToken, setIdToken] = useState(null);

  const handleLogin = (token) => {
    try {
      const user = jwt_decode(token);
      const email = user?.email;
      if (email && allowedUsers.includes(email)) {
        setIdToken(token);
        console.log(`User ${email} authorized`);
      } else {
        alert('Access Denied: Your account is not authorized to use this app.');
        setIdToken(null);
        console.warn(`Unauthorized login attempt: ${email || 'Unknown user'}`);
      }
    } catch (error) {
      console.error('Invalid token', error);
      alert('Authentication failed. Please try again.');
      setIdToken(null);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Wikipedia Chatbot</h1>
        <p>Ask me anything and I'll search Wikipedia for answers!</p>
      </header>
      <main>
        {!idToken && <GoogleLogin onLogin={handleLogin} />}
        {idToken && <ChatBot idToken={idToken} />}
      </main>
    </div>
  );
}

export default App;
