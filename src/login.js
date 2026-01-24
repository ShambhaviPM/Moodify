

//login frontend
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();

    
    if (email === 'shib@gmail.com' && password === 'hihi') {
      const user = { email, username: 'shib' };
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', 'example-token'); 
      navigate('/dashboard');
    }

    if (email === 'sham@gmail.com' && password === 'hihi') {
      const user = { email, username: 'shambhavi' };
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', 'example-token'); 
      navigate('/dashboard');
    }
    
    if (email === 'shwetha@gmail.com' && password === '1234') {
      const user = { email, username: 'shwetha' };
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', 'example-token'); 
      navigate('/dashboard');
    }
     
      
    else {
      setMessage('Invalid email or password');
    }
  };

  const styles = {
    loginPage: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#0f172a', // Dark blue background
    },
    loginContainer: {
      width: '100%',
      maxWidth: '400px',
      padding: '2rem',
      backgroundColor: '#1e293b', // Slightly lighter dark background
      borderRadius: '10px',
      boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)', // Purple glow
      textAlign: 'center',
    },
    heading: {
      marginBottom: '1.5rem',
      color: '#a855f7', // Bright purple
      fontSize: '1.5rem',
      fontWeight: 'bold',
    },
    inputGroup: {
      marginBottom: '1rem',
      textAlign: 'left',
    },
    label: {
      display: 'block',
      marginBottom: '0.5rem',
      color: '#9ca3af', // Neutral gray
      fontSize: '0.9rem',
    },
    input: {
      width: '100%',
      padding: '0.75rem',
      backgroundColor: '#1f2937', // Dark input field
      border: '1px solid #334155',
      borderRadius: '5px',
      color: 'white',
      fontSize: '1rem',
      outline: 'none',
      transition: 'border-color 0.3s ease',
    },
    inputFocus: {
      borderColor: '#a855f7', // Purple border on focus
    },
    message: {
      marginBottom: '1rem',
      color: '#f87171', // Red for error messages
      fontSize: '0.9rem',
    },
    loginButton: {
      width: '100%',
      padding: '1rem',
      border: 'none',
      borderRadius: '10px',
      background: 'linear-gradient(45deg, #a855f7, #3b82f6)', // Gradient for the button
      color: 'white',
      fontSize: '1.1rem',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)', // Subtle shadow
    },
    loginButtonHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)', // Purple glow on hover
    },
    signupLink: {
      marginTop: '1rem',
      color: '#cbd5e1', // Neutral gray
      fontSize: '0.9rem',
    },
    link: {
      color: '#a855f7', // Purple link
      textDecoration: 'none',
      transition: 'color 0.3s ease',
    },
    linkHover: {
      color: '#3b82f6', // Bright blue on hover
    },
  };
  

  return (
    <div style={styles.loginPage}>
      <div style={styles.loginContainer}>
        <h2 style={styles.heading}>Welcome Back</h2>
        <form onSubmit={handleLogin}>
          <div style={styles.inputGroup}>
            <label htmlFor="email" style={styles.label}>
              Email
            </label>
            <input
              type="email"
              id="email"
              style={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="password" style={styles.label}>
              Password
            </label>
            <input
              type="password"
              id="password"
              style={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {message && <div style={styles.message}>{message}</div>}
          <button
            type="submit"
            style={styles.loginButton}
            onMouseEnter={(e) => Object.assign(e.target.style, styles.loginButtonHover)}
            onMouseLeave={(e) => {
              e.target.style.transform = '';
              e.target.style.boxShadow = '';
            }}
          >
            Login
          </button>
        </form>
        <div style={styles.signupLink}>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
