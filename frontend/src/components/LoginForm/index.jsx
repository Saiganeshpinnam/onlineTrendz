import React, { useState } from 'react';
import Cookies from 'js-cookie';
import './index.css'; // ✅ Import styles

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showSubmitError, setShowSubmitError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const onChangeUsername = e => setUsername(e.target.value);
  const onChangePassword = e => setPassword(e.target.value);

  const onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, { expires: 30 });
    window.location.reload();
  };

  const onSubmitFailure = msg => {
    setShowSubmitError(true);
    setErrorMsg(msg);
  };

  const submitForm = async e => {
    e.preventDefault();

    const url = 'http://localhost:7000/login';
    const userDetails = { username, password };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userDetails),
      });

      if (!response.ok) {
        const data = await response.json();
        onSubmitFailure(data.error_msg || 'Login failed');
        return;
      }

      const data = await response.json();
      onSubmitSuccess(data.jwt_token);
    } catch {
      onSubmitFailure('Network error. Please try again.');
    }
  };

  return (
    <div className="login-form-container">
      <form onSubmit={submitForm} className="login-form">
        <h2 className="form-title">🔐 Login</h2>

        <label htmlFor="username">Username:</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={onChangeUsername}
          placeholder="admin"
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={onChangePassword}
          placeholder="admin123"
          required
        />

        <button type="submit" className="login-btn">Login</button>

        {showSubmitError && <p className="error-msg">⚠️ {errorMsg}</p>}
      </form>
    </div>
  );
};

export default LoginForm;
