import { useState } from 'react';
import './login.css';
import axiosInstance from '../lib/axiosInstance';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!username || !pass) {
      setError('Please fill in both fields');
      return;
    }

    try {
      const res = await axiosInstance.post('/users', { username, password: pass });

      if (res.data.success) {
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('userId', res.data.user.id);
        alert('Login successful:', res.data.user);
        onLogin();
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('Server error or invalid credentials');
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2>CR Dashboard Login</h2>
        {error && <p className="error">{error}</p>}
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={pass}
          onChange={e => setPass(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;