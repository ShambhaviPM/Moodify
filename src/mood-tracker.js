import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Particles from './components/Particles';
import SoundToggle from './components/SoundToggle';
import XPNotification from './components/XPNotification';
import { useGameState } from './hooks/useGameState';
import soundManager from './utils/sounds';
import './styles/cyberpunk.css';

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState('');
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();
  const { addXP, notification, levelUp } = useGameState();

  useEffect(() => {
    setMounted(true);
  }, []);

  const moods = [
    { id: 'HAPPY', label: 'HAPPY', emoji: '😊', color: '#22c55e', description: 'Feeling great and energetic' },
    { id: 'NEUTRAL', label: 'NEUTRAL', emoji: '😐', color: '#3b82f6', description: 'Balanced and calm' },
    { id: 'NOT SO GREAT', label: 'NOT SO GREAT', emoji: '😔', color: '#a855f7', description: 'Need some comfort' },
  ];

  const selectMood = (mood) => {
    soundManager.playSelect();
    setSelectedMood(mood);
    localStorage.setItem('selectedMood', mood);
  };

  const goToNext = () => {
    if (selectedMood) {
      soundManager.playSuccess();
      addXP('SELECT_MOOD');
      setTimeout(() => navigate('/activities'), 300);
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
          to="/dashboard"
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
          <span style={styles.stepActive}>1</span>
          <span style={styles.stepLine} />
          <span style={styles.step}>2</span>
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
          <p style={styles.label}>STEP 01 / MOOD ANALYSIS</p>
          <h1 style={styles.title}>
            HOW ARE YOU <span style={styles.titleAccent}>FEELING</span> TODAY?
          </h1>
          <p style={styles.subtitle}>Select your current emotional state</p>
        </div>

        {/* Mood Cards */}
        <div style={styles.moodGrid}>
          {moods.map((mood) => (
            <button
              key={mood.id}
              style={{
                ...styles.moodCard,
                ...(selectedMood === mood.id ? {
                  borderColor: mood.color,
                  boxShadow: `0 0 30px ${mood.color}40`,
                  background: `linear-gradient(135deg, ${mood.color}15, ${mood.color}05)`,
                } : {}),
              }}
              onClick={() => selectMood(mood.id)}
              onMouseEnter={(e) => {
                soundManager.playHover();
                if (selectedMood !== mood.id) {
                  e.currentTarget.style.borderColor = `${mood.color}80`;
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedMood !== mood.id) {
                  e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.2)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }
              }}
            >
              <span style={{ ...styles.moodEmoji, filter: selectedMood === mood.id ? 'none' : 'grayscale(50%)' }}>
                {mood.emoji}
              </span>
              <span style={{ ...styles.moodLabel, color: selectedMood === mood.id ? mood.color : '#e2e8f0' }}>
                {mood.label}
              </span>
              <span style={styles.moodDesc}>{mood.description}</span>
              {selectedMood === mood.id && (
                <div style={{ ...styles.selectedBadge, background: mood.color }}>
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
            opacity: selectedMood ? 1 : 0.5,
            pointerEvents: selectedMood ? 'auto' : 'none',
          }}
          onClick={goToNext}
          disabled={!selectedMood}
          onMouseEnter={(e) => {
            if (selectedMood) {
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

        {/* XP Hint */}
        <p style={styles.xpHint}>+15 XP for selecting your mood</p>
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
  main: {
    maxWidth: '700px',
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
  moodGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginBottom: '2.5rem',
  },
  moodCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1.25rem 1.5rem',
    background: 'rgba(30, 41, 59, 0.6)',
    border: '2px solid rgba(168, 85, 247, 0.2)',
    borderRadius: '16px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    position: 'relative',
    textAlign: 'left',
  },
  moodEmoji: {
    fontSize: '2.5rem',
    transition: 'filter 0.3s ease',
  },
  moodLabel: {
    fontSize: '1rem',
    fontWeight: '600',
    letterSpacing: '0.1em',
    flex: 1,
    transition: 'color 0.3s ease',
  },
  moodDesc: {
    fontSize: '0.75rem',
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

export default MoodTracker;
