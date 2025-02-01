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
    <div className="homepage">
    <div className="homepage__actions">
      <h1 class="homepage_header">Welcome</h1>

      {/* Redirect to Signup Page */}
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => navigate('/signup')}>
          Signup
        </button>
      </div>

      {/* Login Form */}
      <div className="homepage__login-form">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
        <div className="homepage__input-group">
            <label htmlFor="email">Email: </label>
            <input
              id="email"
              type="email"
              value={loginData.email}
              className='homepage__label'
              onChange={e =>
                setLoginData({ ...loginData, email: e.target.value })
              }
            />
          </div>
          <div className="homepage__input-group">
            <label htmlFor="password">Password: </label>
            <input
              id="password"
              type="password"
              value={loginData.password}
              className="homepage__label"
              onChange={e =>
                setLoginData({ ...loginData, password: e.target.value })
              }
            />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit" className="homepage__login-btn">
          Login</button>
        </form>
      </div>
      </div>
    </div>
  );
};

export default HomePage;
