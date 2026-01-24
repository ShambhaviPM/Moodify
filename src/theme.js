import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ThemePage = () => {
  const [selectedTheme, setSelectedTheme] = useState(null);
  const navigate = useNavigate();

  const themes = [
    'LEARNING SOMETHING NEW',
    'UNWINDING AND RELAXING', 
    'GETTING CREATIVE'
  ];

  const handleThemeSelect = (theme) => {
    setSelectedTheme(theme);
  };

  const goToDashboard = () => {
    navigate('/dashboard');
  };

  /*const handleNext = () => {
    if (selectedTheme) {
      localStorage.setItem('currentTheme', selectedTheme);
      navigate('/results');
    } else {
      alert('Please select a theme first');
    }
  };*/
  
  const handleNext = () => {
    if (selectedTheme) {
      localStorage.setItem('currentTheme', selectedTheme);
      navigate('/recommendations');  // Changed from '/results'
    } else {
      alert('Please select a theme first');
    }
  };

  const styles = {
    container: {
      position: 'relative',
      minHeight: '100vh',
      backgroundColor: 'black',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    },
    noiseOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      opacity: 0.1,
      pointerEvents: 'none',
      zIndex: 10
    },
    homeButton: {
      position: 'absolute',
      top: '1.25rem',
      left: '1.25rem',
      backgroundColor: 'rgba(255,255,255,0.1)',
      border: '2px solid white',
      color: 'white',
      padding: '0.5rem 1.5rem',
      borderRadius: '9999px',
      fontSize: '1.25rem',
      transition: 'all 0.3s',
      zIndex: 20
    },
    mainContent: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 2rem',
      position: 'relative',
      zIndex: 20,
      maxWidth: '1200px',
      margin: '0 auto'
    },
    title: {
      fontSize: '4.5rem',
      textAlign: 'center',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      color: 'white',
      marginBottom: '3rem',
      lineHeight: 'tight',
      letterSpacing: 'wider'
    },
    themeGrid: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      width: '100%',
      maxWidth: '600px'
    },
    themeButton: (isSelected) => ({
      padding: '1rem 2rem',
      borderRadius: '9999px',
      color: 'white',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      transition: 'all 0.3s ease',
      width: '100%',
      backgroundColor: isSelected 
        ? 'rgba(107, 47, 212, 0.8)' 
        : 'rgba(107, 47, 212, 0.3)',
      border: isSelected 
        ? '2px solid white' 
        : '2px solid #9F5FFF',
      transform: isSelected 
        ? 'translateX(20px)' 
        : 'translateX(0)',
      ':hover': !isSelected && {
        backgroundColor: 'rgba(107, 47, 212, 0.5)',
        transform: 'translateX(10px)'
      }
    }),
    nextButton: {
      marginTop: '2rem',
      backgroundColor: '#6B2FD4',
      color: 'white',
      padding: '1rem 3rem',
      borderRadius: '9999px',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      transition: 'all 0.3s ease',
      ':hover': {
        transform: 'translateY(-3px)',
        boxShadow: '0 0 20px rgba(107, 47, 212, 0.5)'
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.noiseOverlay}></div>

      <button 
        onClick={goToDashboard} 
        style={styles.homeButton}
      >
        HOME
      </button>

      <main style={styles.mainContent}>
        <h1 style={styles.title}>
          IF TODAY HAD A<br />
          THEME, WHAT<br />
          WOULD IT BE?
        </h1>

        <div style={styles.themeGrid}>
          {themes.map((theme) => (
            <button
              key={theme}
              onClick={() => handleThemeSelect(theme)}
              style={styles.themeButton(selectedTheme === theme)}
            >
              {theme}
            </button>
          ))}
        </div>

        {selectedTheme && (
          <button 
            onClick={handleNext}
            style={styles.nextButton}
          >
            NEXT
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width: '1.5rem', height: '1.5rem'}}>
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}
      </main>
    </div>
  );
};

export default ThemePage;