import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ActivitiesPage = () => {
  const [selectedActivity, setSelectedActivity] = useState('');

  const activities = [
    'ART & DESIGN', 
    'FITNESS', 
    'TECH', 
    'TRAVEL AND CULTURE'
  ];

  useEffect(() => {
    localStorage.setItem('selectedActivity', selectedActivity);
  }, [selectedActivity]);

  const handleActivitySelect = (activity) => {
    setSelectedActivity(activity);
  };

  const styles = {
    page: {
      background: 'linear-gradient(to bottom right, #9333ea, #3b82f6)',
      minHeight: '100vh',
      padding: '1.5rem'
    },
    backLink: {
      color: 'white',
      transition: 'color 0.3s ease',
      display: 'inline-block',
      marginBottom: '2rem'
    },
    backLinkHover: {
      color: '#e9d5ff'
    },
    container: {
      maxWidth: '42rem',
      margin: '0 auto',
      textAlign: 'center'
    },
    title: {
      fontSize: '2.25rem',
      fontWeight: 'bold',
      color: 'white',
      marginBottom: '3rem'
    },
    activitiesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '1rem',
      marginBottom: '3rem'
    },
    activityButton: {
      padding: '1.5rem',
      borderRadius: '0.5rem',
      fontSize: '1.25rem',
      fontWeight: '600',
      transition: 'all 0.3s ease'
    },
    unselectedActivityButton: {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      color: 'white'
    },
    selectedActivityButton: {
      backgroundColor: 'white',
      color: '#9333ea'
    },
    nextButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto',
      gap: '0.5rem',
      padding: '0.75rem 2rem',
      borderRadius: '9999px',
      fontWeight: '600'
    },
    selectedNextButton: {
      backgroundColor: 'white',
      color: '#9333ea'
    },
    disabledNextButton: {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      color: 'rgba(255, 255, 255, 0.5)'
    }
  };

  return (
    <div style={styles.page}>
      <Link 
        to="/dashboard" 
        style={styles.backLink}
        onMouseEnter={(e) => e.target.style.color = styles.backLinkHover.color}
        onMouseLeave={(e) => e.target.style.color = styles.backLink.color}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 12h18M9 6l-6 6 6 6"/>
        </svg>
      </Link>

      <div style={styles.container}>
        <h1 style={styles.title}>WHAT SPARKS YOU TODAY?</h1>

        <div style={styles.activitiesGrid}>
          {activities.map((activity) => (
            <button 
              key={activity}
              onClick={() => handleActivitySelect(activity)}
              style={{
                ...styles.activityButton,
                ...(selectedActivity === activity 
                  ? styles.selectedActivityButton 
                  : styles.unselectedActivityButton)
              }}
              onMouseEnter={(e) => {
                if (selectedActivity !== activity) {
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedActivity !== activity) {
                  e.target.style.backgroundColor = styles.unselectedActivityButton.backgroundColor;
                }
              }}
            >
              {activity}
            </button>
          ))}
        </div>

        <Link 
          to="/theme" 
          style={{
            ...styles.nextButton,
            ...(selectedActivity 
              ? styles.selectedNextButton 
              : styles.disabledNextButton)
          }}
          {...(selectedActivity ? {} : { 'aria-disabled': true })}
        >
          <span>NEXT</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M14 5l7 7-7 7"/>
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default ActivitiesPage;