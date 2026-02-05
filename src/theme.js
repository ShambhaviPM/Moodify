import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Particles from './components/Particles';
import SoundToggle from './components/SoundToggle';
import XPNotification from './components/XPNotification';
import { useGameState } from './hooks/useGameState';
import soundManager from './utils/sounds';
import './styles/cyberpunk.css';

const ThemePage = () => {
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();
  const { addXP, notification, levelUp } = useGameState();

  const themes = [
    { id: 'LEARNING SOMETHING NEW', icon: '📚', color: '#3b82f6', description: 'Expand your knowledge' },
    { id: 'UNWINDING AND RELAXING', icon: '🧘', color: '#22c55e', description: 'Find your calm' },
    { id: 'GETTING CREATIVE', icon: '✨', color: '#ec4899', description: 'Express yourself' },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeSelect = (theme) => {
    soundManager.playSelect();
    setSelectedTheme(theme);
  };

  const handleNext = () => {
    if (selectedTheme) {
      localStorage.setItem('currentTheme', selectedTheme);
      soundManager.playSuccess();
      addXP('SELECT_THEME');
      setTimeout(() => navigate('/recommendations'), 300);
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
          to="/activities"
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
          <span style={styles.stepDone}>✓</span>
          <span style={styles.stepLineDone} />
          <span style={styles.stepActive}>3</span>
        </div>
      </div>

      {/* Main Content */}
      <main style={{
        ...styles.main,
        opacity: mounted ? 1 : 0,
        transform: mounted ? 'translateY(0)' : 'translateY(20px)'
      }}>
        <div style={styles.titleSection}>
          <p style={styles.label}>STEP 03 / THEME SELECTION</p>
          <h1 style={styles.title}>
            WHAT'S YOUR <span style={styles.titleAccent}>VIBE</span> TODAY?
          </h1>
          <p style={styles.subtitle}>Define your intent for this session</p>
        </div>

        {/* Theme Cards */}
        <div style={styles.themeGrid}>
          {themes.map((theme) => (
            <button
              key={theme.id}
              style={{
                ...styles.themeCard,
                ...(selectedTheme === theme.id ? {
                  borderColor: theme.color,
                  boxShadow: `0 0 30px ${theme.color}40`,
                  background: `linear-gradient(135deg, ${theme.color}15, ${theme.color}05)`,
                } : {}),
              }}
              onClick={() => handleThemeSelect(theme.id)}
              onMouseEnter={(e) => {
                soundManager.playHover();
                if (selectedTheme !== theme.id) {
                  e.currentTarget.style.borderColor = `${theme.color}80`;
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedTheme !== theme.id) {
                  e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.2)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }
              }}
            >
              <span style={{ ...styles.themeIcon, filter: selectedTheme === theme.id ? 'none' : 'grayscale(50%)' }}>
                {theme.icon}
              </span>
              <div style={styles.themeInfo}>
                <span style={{ ...styles.themeLabel, color: selectedTheme === theme.id ? theme.color : '#e2e8f0' }}>
                  {theme.id}
                </span>
                <span style={styles.themeDesc}>{theme.description}</span>
              </div>
              {selectedTheme === theme.id && (
                <div style={{ ...styles.selectedBadge, background: theme.color }}>
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
            opacity: selectedTheme ? 1 : 0.5,
            pointerEvents: selectedTheme ? 'auto' : 'none',
          }}
          onClick={handleNext}
          disabled={!selectedTheme}
          onMouseEnter={(e) => {
            if (selectedTheme) {
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
          <span>GET RECOMMENDATIONS</span>
          <span style={styles.buttonArrow}>→</span>
        </button>

        <p style={styles.xpHint}>+15 XP for selecting theme • +25 XP for viewing recommendations</p>
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
  stepLineDone: {
    width: '30px',
    height: '2px',
    background: '#22c55e',
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
  themeGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginBottom: '2.5rem',
  },
  themeCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.25rem',
    padding: '1.5rem',
    background: 'rgba(30, 41, 59, 0.6)',
    border: '2px solid rgba(168, 85, 247, 0.2)',
    borderRadius: '16px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    position: 'relative',
    textAlign: 'left',
  },
  themeIcon: {
    fontSize: '2.5rem',
    transition: 'filter 0.3s ease',
  },
  themeInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
  },
  themeLabel: {
    fontSize: '0.9rem',
    fontWeight: '600',
    letterSpacing: '0.05em',
    transition: 'color 0.3s ease',
  },
  themeDesc: {
    fontSize: '0.75rem',
    color: '#64748b',
    fontFamily: 'system-ui, sans-serif',
  },
  selectedBadge: {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '0.85rem',
    fontWeight: '700',
  },
  nextButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '1rem 2rem',
    background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(59, 130, 246, 0.2))',
    border: '2px solid #a855f7',
    borderRadius: '12px',
    color: 'white',
    fontSize: '0.9rem',
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
    fontSize: '0.7rem',
    color: '#64748b',
    letterSpacing: '0.05em',
  },
};

export default ThemePage;
