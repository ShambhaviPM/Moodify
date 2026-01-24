import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState('');
  const navigate = useNavigate();

  const selectMood = (mood) => {
    setSelectedMood(mood);
    localStorage.setItem('selectedMood', mood);
  };

  const goToNext = () => {
    if (selectedMood) {
      navigate('/activities');
    }
  };

  const styles = {
    page: {
      backgroundColor: '#000000',
      minHeight: '100vh',
      margin: 0,
      padding: 0
    },
    homeButton: {
      position: 'absolute',
      top: '20px',
      left: '20px',
      background: 'rgba(255, 255, 255, 0.1)',
      padding: '8px 16px',
      borderRadius: '20px',
      color: 'white',
      textDecoration: 'none',
      transition: 'background 0.3s ease'
    },
    homeButtonHover: {
      background: 'rgba(255, 255, 255, 0.2)'
    },
    container: {
      maxWidth: '800px',
      margin: '0 auto',
      textAlign: 'center',
      paddingTop: '8rem'
    },
    title: {
      fontSize: '3rem',
      fontWeight: 'bold',
      color: 'white',
      marginBottom: '4rem'
    },
    moodButtonsContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      marginBottom: '3rem',
      padding: '0 1rem'
    },
    moodButton: {
      padding: '1rem',
      borderRadius: '0.5rem',
      fontSize: '1.25rem',
      fontWeight: 'normal',
      color: 'white',
      backgroundColor: '#7c3aed',
      border: 'none',
      transition: 'all 0.3s ease',
      opacity: 0.8,
      width: '100%',
      maxWidth: '400px',
      margin: '0 auto'
    },
    selectedMoodButton: {
      backgroundColor: '#9333ea',
      opacity: 1,
      transform: 'scale(1.02)'
    },
    moodButtonHover: {
      opacity: 1
    },
    nextButton: {
      padding: '0.75rem 2rem',
      borderRadius: '9999px',
      fontWeight: '600',
      backgroundColor: '#ec4899',
      color: 'white',
      opacity: 0.9,
      transition: 'all 0.3s ease'
    },
    nextButtonDisabled: {
      opacity: 0.5,
      pointerEvents: 'none'
    }
  };

  return (
    <div style={styles.page}>
      <a 
        href="/dashboard" 
        style={styles.homeButton}
        onMouseEnter={(e) => Object.assign(e.target.style, styles.homeButtonHover)}
        onMouseLeave={(e) => e.target.style.background = styles.homeButton.background}
      >
        HOME
      </a>

      <div style={styles.container}>
        <h1 style={styles.title}>
          HOW ARE YOU
          <br />
          FEELING TODAY?
        </h1>
        
        <div style={styles.moodButtonsContainer}>
          {['HAPPY', 'NEUTRAL', 'NOT SO GREAT'].map((mood) => (
            <button
              key={mood}
              style={{
                ...styles.moodButton,
                ...(selectedMood === mood ? styles.selectedMoodButton : {})
              }}
              onMouseEnter={(e) => Object.assign(e.target.style, styles.moodButtonHover)}
              onMouseLeave={(e) => {
                e.target.style.opacity = styles.moodButton.opacity;
                if (selectedMood !== mood) {
                  e.target.style.transform = '';
                  e.target.style.backgroundColor = styles.moodButton.backgroundColor;
                }
              }}
              onClick={() => selectMood(mood)}
            >
              {mood}
            </button>
          ))}
        </div>

        <button 
          style={styles.nextButton}
          onClick={goToNext}
          disabled={!selectedMood}
        >
          NEXT
        </button>
      </div>
    </div>
  );
};

export default MoodTracker;