// HomePage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css'; // Make sure to import your CSS file


const HomePage = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  // Dummy login function: replace this with your real login logic or API call.
  const handleLogin = (e) => {
    e.preventDefault();
    // Here you could add validation or an API call to authenticate the user.
    // For this example, let's assume any non-empty credentials are valid.
    if (loginData.email.trim() && loginData.password.trim()) {
      // Redirect to the dashboard on successful login
      navigate('/Dashboard');
    } else {
      setError('Please enter both email and password.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome</h1>

      {/* Redirect to Signup Page */}
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => navigate('/signup')}>
          Signup
        </button>
      </div>

      {/* Login Form */}
      <div>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="email">Email: </label>
            <input
              id="email"
              type="email"
              value={loginData.email}
              onChange={e =>
                setLoginData({ ...loginData, email: e.target.value })
              }
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="password">Password: </label>
            <input
              id="password"
              type="password"
              value={loginData.password}
              onChange={e =>
                setLoginData({ ...loginData, password: e.target.value })
              }
            />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default HomePage;
