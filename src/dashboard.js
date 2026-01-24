import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      setUsername(user.username || user.email);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleDiveIn = () => {
    navigate('/mood-tracker');
  };

  const styles = {
    navbar: {
      display: 'flex',
      justifyContent: 'right', // Ensures space between nav links and user profile
      alignItems: 'center',
      padding: '1.5rem 2rem',
      width: '100%',
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
    },
    userProfile: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      marginLeft: 'auto', // Pushes the user profile section to the right
      fontSize: '1.2rem',
    },
    profileIcon: {
      width: '40px',
      height: '40px',
      background: 'rgba(255, 255, 255, 0.2)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.2rem',
    },
    logoutButton: {
      background: 'rgba(255, 77, 77, 0.2)',
      border: '1px solid rgba(255, 77, 77, 0.3)',
      padding: '0.5rem 1.5rem',
      borderRadius: '25px',
      color: 'white',
      transition: 'all 0.3s ease',
    },
    logoutButtonHover: {
      background: 'rgba(255, 77, 77, 0.3)',
      transform: 'translateY(-2px)',
    },
    page: {
      backgroundImage: 'linear-gradient(to bottom right, #1a4a5e, #1e1e7c)',
      minHeight: '100vh',
      color: 'white',
      display: 'flex',
      flexDirection: 'column'
    },
     mainContent: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '2rem'
    },
    welcomeText: {
      fontSize: '5rem',
      fontWeight: 'bold',
      marginBottom: '2rem',
      background: 'linear-gradient(45deg, #ffffff, #a8c0ff)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    },
    subtitle: {
      fontSize: '2rem',
      marginBottom: '3rem'
    },
    card: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      borderRadius: '20px',
      padding: '3rem',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      transition: 'transform 0.3s ease',
      textAlign: 'center',
      maxWidth: '800px',
      width: '90%',
      marginTop: '2rem'
    },
    cardTitle: {
      fontSize: '4rem',
      marginBottom: '2rem'
    },
    cardText: {
      fontSize: '2rem',
      opacity: 0.8,
      lineHeight: 1.6,
      marginBottom: '2rem'
    },
    actionButton: {
      display: 'inline-block',
      background: 'linear-gradient(45deg, #4a90e2, #67b8f7)',
      color: 'white',
      padding: '1.5rem 3rem',
      borderRadius: '25px',
      textDecoration: 'none',
      fontSize: '2.5rem',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    },
    actionButtonHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)'
    },
    userProfile: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      fontSize: '1.2rem'
    },
    profileIcon: {
      width: '40px',
      height: '40px',
      background: 'rgba(255, 255, 255, 0.2)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.2rem'
    },
    logoutButton: {
      background: 'rgba(255, 77, 77, 0.2)',
      border: '1px solid rgba(255, 77, 77, 0.3)',
      padding: '0.5rem 1.5rem',
      borderRadius: '25px',
      color: 'white',
      transition: 'all 0.3s ease'
    },
    logoutButtonHover: {
      background: 'rgba(255, 77, 77, 0.3)',
      transform: 'translateY(-2px)'
    }
  };

  return (
    <div style={styles.page}>
      <nav style={styles.navbar}>
        <div style={styles.userProfile}>
          <span>{username}</span>
          <div style={styles.profileIcon}>👤</div>
          <button 
            onClick={handleLogout} 
            style={styles.logoutButton}
            onMouseEnter={(e) => Object.assign(e.target.style, styles.logoutButtonHover)}
            onMouseLeave={(e) => {
              e.target.style.background = styles.logoutButton.background;
              e.target.style.transform = '';
            }}
          >
            Logout
          </button>
        </div>
      </nav>

      <main style={styles.mainContent}>
        <h1 style={styles.welcomeText}>
          Welcome to Your Dashboard
        </h1>
        <p style={styles.subtitle}>Track your mood and discover insights about yourself</p>
        
        <div style={styles.card}>
          <h1 style={styles.cardTitle}>LETS GET STARTED</h1>
          <p style={styles.cardText}>
            Log your daily mood and activities to build a comprehensive emotional diary.
          </p>
          <button 
            onClick={handleDiveIn} 
            style={styles.actionButton}
            onMouseEnter={(e) => Object.assign(e.target.style, styles.actionButtonHover)}
            onMouseLeave={(e) => {
              e.target.style.transform = '';
              e.target.style.boxShadow = '';
            }}
          >
            DIVE IN!!
          </button>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;