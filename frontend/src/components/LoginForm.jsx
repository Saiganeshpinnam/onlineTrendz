import React, { useState } from 'react';
import Cookies from 'js-cookie';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showSubmitError, setShowSubmitError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const onChangeUsername = e => setUsername(e.target.value);
  const onChangePassword = e => setPassword(e.target.value);

  const onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, { expires: 30 });
    window.location.reload(); // Reload to update auth state
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
      <h2>Login</h2>
      <form onSubmit={submitForm}>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={onChangeUsername}
          placeholder="admin"
          required
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={onChangePassword}
          placeholder="admin123"
          required
        />
        <button type="submit">Login</button>
        {showSubmitError && <p className="error-msg">{errorMsg}</p>}
      </form>
    </div>
  );
};

export default LoginForm;
