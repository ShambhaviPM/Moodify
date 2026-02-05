import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Particles from './components/Particles';
import SoundToggle from './components/SoundToggle';
import XPNotification from './components/XPNotification';
import { useGameState } from './hooks/useGameState';
import soundManager from './utils/sounds';
import './styles/cyberpunk.css';

const ActivitiesPage = () => {
  const [selectedActivity, setSelectedActivity] = useState('');
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();
  const { addXP, notification, levelUp } = useGameState();

  const activities = [
    { id: 'ART & DESIGN', icon: '🎨', color: '#ec4899', description: 'Creative expression' },
    { id: 'FITNESS', icon: '💪', color: '#22c55e', description: 'Physical wellness' },
    { id: 'TECH', icon: '💻', color: '#3b82f6', description: 'Digital exploration' },
    { id: 'TRAVEL AND CULTURE', icon: '🌍', color: '#f59e0b', description: 'World discovery' },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (selectedActivity) {
      localStorage.setItem('selectedActivity', selectedActivity);
    }
  }, [selectedActivity]);

  const handleActivitySelect = (activity) => {
    soundManager.playSelect();
    setSelectedActivity(activity);
  };

  const handleNext = () => {
    if (selectedActivity) {
      soundManager.playSuccess();
      addXP('SELECT_ACTIVITY');
      setTimeout(() => navigate('/theme'), 300);
    }
  };

  return (
    <div style={styles.container}>
      <Particles count={20} />
      <div style={styles.scanlines} />
      <div style={styles.gradientOrb1} />
      <div style={styles.gradientOrb2} />

      {/* Header */}
      <div style={styles.header}>
        <Link
          to="/mood-tracker"
          style={styles.backButton}
          onMouseEnter={(e) => {
            soundManager.playHover();
            e.target.style.borderColor = '#a855f7';
            e.target.style.color = '#a855f7';
          }}
          onMouseLeave={(e) => {
            e.target.style.borderColor = 'rgba(168, 85, 247, 0.3)';
            e.target.style.color = '#94a3b8';
          }}
        >
          ← BACK
        </Link>
        <div style={styles.stepIndicator}>
          <span style={styles.stepDone}>✓</span>
          <span style={styles.stepLineDone} />
          <span style={styles.stepActive}>2</span>
          <span style={styles.stepLine} />
          <span style={styles.step}>3</span>
        </div>
      </div>

      {/* Main Content */}
      <main style={{
        ...styles.main,
        opacity: mounted ? 1 : 0,
        transform: mounted ? 'translateY(0)' : 'translateY(20px)'
      }}>
        <div style={styles.titleSection}>
          <p style={styles.label}>STEP 02 / ACTIVITY SELECTION</p>
          <h1 style={styles.title}>
            WHAT <span style={styles.titleAccent}>SPARKS</span> YOU TODAY?
          </h1>
          <p style={styles.subtitle}>Choose your area of interest</p>
        </div>

        {/* Activity Grid */}
        <div style={styles.activityGrid}>
          {activities.map((activity) => (
            <button
              key={activity.id}
              style={{
                ...styles.activityCard,
                ...(selectedActivity === activity.id ? {
                  borderColor: activity.color,
                  boxShadow: `0 0 30px ${activity.color}40`,
                  background: `linear-gradient(135deg, ${activity.color}15, ${activity.color}05)`,
                } : {}),
              }}
              onClick={() => handleActivitySelect(activity.id)}
              onMouseEnter={(e) => {
                soundManager.playHover();
                if (selectedActivity !== activity.id) {
                  e.currentTarget.style.borderColor = `${activity.color}80`;
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedActivity !== activity.id) {
                  e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.2)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }
              }}
            >
              <span style={{ ...styles.activityIcon, filter: selectedActivity === activity.id ? 'none' : 'grayscale(50%)' }}>
                {activity.icon}
              </span>
              <span style={{ ...styles.activityLabel, color: selectedActivity === activity.id ? activity.color : '#e2e8f0' }}>
                {activity.id}
              </span>
              <span style={styles.activityDesc}>{activity.description}</span>
              {selectedActivity === activity.id && (
                <div style={{ ...styles.selectedBadge, background: activity.color }}>
                  ✓
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Next Button */}
        <button
          style={{
            ...styles.nextButton,
            opacity: selectedActivity ? 1 : 0.5,
            pointerEvents: selectedActivity ? 'auto' : 'none',
          }}
          onClick={handleNext}
          disabled={!selectedActivity}
          onMouseEnter={(e) => {
            if (selectedActivity) {
              soundManager.playHover();
              e.target.style.boxShadow = '0 0 40px rgba(168, 85, 247, 0.6)';
              e.target.style.transform = 'translateY(-3px)';
            }
          }}
          onMouseLeave={(e) => {
            e.target.style.boxShadow = '0 0 20px rgba(168, 85, 247, 0.3)';
            e.target.style.transform = 'translateY(0)';
          }}
        >
          <span>CONTINUE</span>
          <span style={styles.buttonArrow}>→</span>
        </button>

        <p style={styles.xpHint}>+15 XP for selecting activity</p>
      </main>

      <SoundToggle />
      <XPNotification notification={notification} levelUp={levelUp} />
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
    position: 'relative',
    overflow: 'hidden',
    fontFamily: "'Orbitron', sans-serif",
  },
  scanlines: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.03), rgba(0,0,0,0.03) 1px, transparent 1px, transparent 2px)',
    pointerEvents: 'none',
    zIndex: 10,
  },
  gradientOrb1: {
    position: 'fixed',
    top: '20%',
    left: '10%',
    width: '300px',
    height: '300px',
    background: 'radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 70%)',
    borderRadius: '50%',
    filter: 'blur(60px)',
    pointerEvents: 'none',
  },
  gradientOrb2: {
    position: 'fixed',
    bottom: '20%',
    right: '10%',
    width: '400px',
    height: '400px',
    background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
    borderRadius: '50%',
    filter: 'blur(60px)',
    pointerEvents: 'none',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.5rem 2rem',
    position: 'relative',
    zIndex: 100,
  },
  backButton: {
    padding: '0.5rem 1rem',
    background: 'transparent',
    border: '1px solid rgba(168, 85, 247, 0.3)',
    borderRadius: '6px',
    color: '#94a3b8',
    fontSize: '0.75rem',
    textDecoration: 'none',
    fontFamily: "'Orbitron', sans-serif",
    letterSpacing: '0.1em',
    transition: 'all 0.3s ease',
  },
  stepIndicator: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  step: {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    background: 'rgba(30, 41, 59, 0.8)',
    border: '1px solid rgba(168, 85, 247, 0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.7rem',
    color: '#64748b',
  },
  stepDone: {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    background: '#22c55e',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.7rem',
    color: 'white',
    fontWeight: '700',
  },
  stepActive: {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #a855f7, #3b82f6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.7rem',
    color: 'white',
    fontWeight: '700',
  },
  stepLine: {
    width: '30px',
    height: '2px',
    background: 'rgba(168, 85, 247, 0.3)',
  },
  stepLineDone: {
    width: '30px',
    height: '2px',
    background: '#22c55e',
  },
  main: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '2rem',
    textAlign: 'center',
    position: 'relative',
    zIndex: 5,
    transition: 'all 0.5s ease',
  },
  titleSection: {
    marginBottom: '3rem',
  },
  label: {
    fontSize: '0.7rem',
    color: '#64748b',
    letterSpacing: '0.3em',
    marginBottom: '1rem',
  },
  title: {
    fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
    fontWeight: '700',
    color: 'white',
    marginBottom: '0.75rem',
    lineHeight: 1.2,
  },
  titleAccent: {
    background: 'linear-gradient(135deg, #a855f7, #3b82f6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  subtitle: {
    fontSize: '0.9rem',
    color: '#94a3b8',
    fontFamily: 'system-ui, sans-serif',
  },
  activityGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '1rem',
    marginBottom: '2.5rem',
  },
  activityCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '1.5rem',
    background: 'rgba(30, 41, 59, 0.6)',
    border: '2px solid rgba(168, 85, 247, 0.2)',
    borderRadius: '16px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    position: 'relative',
  },
  activityIcon: {
    fontSize: '2.5rem',
    transition: 'filter 0.3s ease',
  },
  activityLabel: {
    fontSize: '0.85rem',
    fontWeight: '600',
    letterSpacing: '0.05em',
    transition: 'color 0.3s ease',
  },
  activityDesc: {
    fontSize: '0.7rem',
    color: '#64748b',
    fontFamily: 'system-ui, sans-serif',
  },
  selectedBadge: {
    position: 'absolute',
    top: '-8px',
    right: '-8px',
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '0.75rem',
    fontWeight: '700',
  },
  nextButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '1rem 2.5rem',
    background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(59, 130, 246, 0.2))',
    border: '2px solid #a855f7',
    borderRadius: '12px',
    color: 'white',
    fontSize: '1rem',
    fontWeight: '600',
    fontFamily: "'Orbitron', sans-serif",
    letterSpacing: '0.1em',
    cursor: 'pointer',
    boxShadow: '0 0 20px rgba(168, 85, 247, 0.3)',
    transition: 'all 0.3s ease',
  },
  buttonArrow: {
    fontSize: '1.2rem',
  },
  xpHint: {
    marginTop: '1rem',
    fontSize: '0.75rem',
    color: '#a855f7',
    letterSpacing: '0.05em',
  },
};

export default ActivitiesPage;
