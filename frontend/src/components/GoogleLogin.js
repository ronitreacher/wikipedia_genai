import React, { useEffect, useCallback } from 'react';

function GoogleLogin({ onLogin }) {
  const handleCredentialResponse = useCallback((response) => {
    onLogin(response.credential); // Pass ID token to App component
  }, [onLogin]);

  useEffect(() => {
    if (window.google && window.google.accounts) {
      window.google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
      });
      window.google.accounts.id.renderButton(
        document.getElementById('googleSignInDiv'),
        { theme: 'outline', size: 'large' }
      );
    }
  }, [handleCredentialResponse]);

  return <div id="googleSignInDiv"></div>;
}

export default GoogleLogin;
