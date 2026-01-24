//signup frontend
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const styles = {
    loginPage: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    signupContainer: {
      background: 'rgba(255, 255, 255, 0.1)',
      padding: '2rem',
      borderRadius: '20px',
      backdropFilter: 'blur(10px)',
      width: '100%',
      maxWidth: '600px',
      maxHeight: '1900px',
      boxShadow: '0 0 30px rgba(168, 85, 247, 0.3)'
    },
    heading: {
      color: 'white',
      fontSize: '2rem',
      marginBottom: '2rem',
      textAlign: 'center',
      background: 'linear-gradient(to right, #a855f7, #3b82f6)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    },
    inputGroup: {
      marginBottom: '1.5rem'
    },
    label: {
      display: 'block',
      color: '#e2e8f0',
      marginBottom: '0.5rem',
      fontSize: '0.9rem'
    },
    input: {
      width: '100%',
      padding: '0.8rem',
      border: 'none',
      borderRadius: '10px',
      background: 'rgba(255, 255, 255, 0.1)',
      color: 'white',
      fontSize: '1rem',
      transition: 'all 0.3s ease'
    },
    inputFocus: {
      outline: 'none',
      boxShadow: '0 0 10px rgba(168, 85, 247, 0.5)',
      background: 'rgba(255, 255, 255, 0.15)'
    },
    button: {
      width: '100%',
      padding: '1rem',
      border: 'none',
      borderRadius: '10px',
      background: 'linear-gradient(45deg, #a855f7, #3b82f6)',
      color: 'white',
      fontSize: '1.1rem',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    buttonHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)'
    },
    loginLink: {
      textAlign: 'center',
      marginTop: '1rem',
      color: '#e2e8f0'
    },
    link: {
      color: '#a855f7',
      textDecoration: 'none',
      transition: 'color 0.3s ease'
    },
    linkHover: {
      color: '#3b82f6'
    }
  };

  const handleSignup = (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    // Simple frontend validation
    if (username && email && password) {
      setMessage('Registration successful! Redirecting to login...');
      
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } else {
      setMessage('Please fill in all fields');
      setIsSubmitting(false);
    }
  };

  return (
    <div style={styles.loginPage}>
      <div style={styles.signupContainer}>
        <h2 style={styles.heading}>Create Account</h2>
        <form onSubmit={handleSignup}>
          <div style={styles.inputGroup}>
            <label htmlFor="signup-username" style={styles.label}>Username</label>
            <input 
              type="text" 
              id="signup-username" 
              style={styles.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required 
              onFocus={(e) => {
                e.target.style.boxShadow = styles.inputFocus.boxShadow;
                e.target.style.background = styles.inputFocus.background;
              }}
              onBlur={(e) => {
                e.target.style.boxShadow = '';
                e.target.style.background = styles.input.background;
              }}
            />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="signup-email" style={styles.label}>Email</label>
            <input 
              type="email" 
              id="signup-email" 
              style={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              onFocus={(e) => {
                e.target.style.boxShadow = styles.inputFocus.boxShadow;
                e.target.style.background = styles.inputFocus.background;
              }}
              onBlur={(e) => {
                e.target.style.boxShadow = '';
                e.target.style.background = styles.input.background;
              }}
            />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="signup-password" style={styles.label}>Password</label>
            <input 
              type="password" 
              id="signup-password" 
              style={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
              onFocus={(e) => {
                e.target.style.boxShadow = styles.inputFocus.boxShadow;
                e.target.style.background = styles.inputFocus.background;
              }}
              onBlur={(e) => {
                e.target.style.boxShadow = '';
                e.target.style.background = styles.input.background;
              }}
            />
          </div>
          
          {message && <div style={{color: 'white', marginBottom: '1rem'}}>{message}</div>}
          
          <button 
            type="submit" 
            style={styles.button}
            disabled={isSubmitting}
            onMouseEnter={(e) => {
              e.target.style.transform = styles.buttonHover.transform;
              e.target.style.boxShadow = styles.buttonHover.boxShadow;
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = '';
              e.target.style.boxShadow = '';
            }}
          >
            Sign Up
          </button>
        </form>
        <div style={styles.loginLink}>
          Already have an account? <a 
            href="/login" 
            style={styles.link}
            onMouseEnter={(e) => e.target.style.color = styles.linkHover.color}
            onMouseLeave={(e) => e.target.style.color = styles.link.color}
          >
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default Signup;