import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import ChatBot from './components/ChatBot';
import './App.css';

const allowedUsers = ['ronitroytcs@gmail.com', 'ronitroyofficial96@gmail.com'];

function App() {
  const [idToken, setIdToken] = useState(null);

  // Initialize Google Identity Services
  useEffect(() => {
    /* global google */
    if (!window.google) return;

    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID, // replace with your client ID
      callback: handleCredentialResponse,
    });

    google.accounts.id.renderButton(
      document.getElementById('google-signin-button'),
      { theme: 'outline', size: 'large' } // button customization
    );

    google.accounts.id.prompt(); // optional: auto prompt
  }, []);

  // Callback after login
  const handleCredentialResponse = (response) => {
    const token = response.credential;
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
        {!idToken && <div id="google-signin-button"></div>}
        {idToken && <ChatBot idToken={idToken} />}
      </main>
    </div>
  );
}

export default App;
