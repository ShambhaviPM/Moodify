import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Particles from './components/Particles';
import SoundToggle from './components/SoundToggle';
import XPNotification from './components/XPNotification';
import { useGameState } from './hooks/useGameState';
import soundManager from './utils/sounds';
import './styles/cyberpunk.css';

const PersonalizedContentPage = () => {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  const [ready, setReady] = useState(false);
  const { notification, levelUp } = useGameState();

  useEffect(() => {
    setMounted(true);
    // Simulate content generation
    const timer = setTimeout(() => {
      setReady(true);
      soundManager.playSuccess();
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const recommendation = JSON.parse(localStorage.getItem('selectedRecommendation') || 'null');

  return (
    <div style={styles.container}>
      <Particles count={25} />
      <div style={styles.scanlines} />
      <div style={styles.gradientOrb1} />
      <div style={styles.gradientOrb2} />

      {/* Header */}
      <div style={styles.header}>
        <Link
          to="/recommendations"
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
        <span style={styles.badge}>CONTENT READY</span>
      </div>

      {/* Main Content */}
      <main style={{
        ...styles.main,
        opacity: mounted ? 1 : 0,
        transform: mounted ? 'translateY(0)' : 'translateY(20px)'
      }}>
        {!ready ? (
          <div style={styles.loadingSection}>
            <div style={styles.loadingIcon}>
              <div style={styles.spinner} />
            </div>
            <p style={styles.loadingText}>GENERATING YOUR UNIQUE EXPERIENCE</p>
            <div style={styles.loadingBar}>
              <div style={styles.loadingProgress} />
            </div>
          </div>
        ) : (
          <div style={styles.readySection}>
            <div style={styles.checkIcon}>
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M9 12l2 2 4-4" />
              </svg>
            </div>
            <p style={styles.label}>ANALYSIS COMPLETE</p>
            <h1 style={styles.title}>
              YOUR <span style={styles.titleAccent}>CONTENT</span> IS READY
            </h1>
            <p style={styles.subtitle}>
              {recommendation ? recommendation.title : 'Personalized just for you'}
            </p>

            <Link
              to="/content"
              style={styles.ctaButton}
              onClick={() => soundManager.playSelect()}
              onMouseEnter={(e) => {
                soundManager.playHover();
                e.currentTarget.style.boxShadow = '0 0 50px rgba(168, 85, 247, 0.6)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 0 30px rgba(168, 85, 247, 0.4)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <span>DISCOVER YOUR CONTENT</span>
              <span style={styles.buttonArrow}>→</span>
            </Link>

            <p style={styles.xpHint}>+50 XP bonus for completing the flow</p>
          </div>
        )}
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
    background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%)',
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
    background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
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
  badge: {
    padding: '0.5rem 1rem',
    background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(59, 130, 246, 0.2))',
    border: '1px solid rgba(34, 197, 94, 0.5)',
    borderRadius: '20px',
    color: '#22c55e',
    fontSize: '0.7rem',
    letterSpacing: '0.1em',
  },
  main: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '4rem 2rem',
    textAlign: 'center',
    position: 'relative',
    zIndex: 5,
    transition: 'all 0.5s ease',
  },
  loadingSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2rem',
  },
  loadingIcon: {
    width: '100px',
    height: '100px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinner: {
    width: '60px',
    height: '60px',
    border: '3px solid rgba(168, 85, 247, 0.2)',
    borderTop: '3px solid #a855f7',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  loadingText: {
    fontSize: '0.9rem',
    color: '#94a3b8',
    letterSpacing: '0.2em',
  },
  loadingBar: {
    width: '200px',
    height: '4px',
    background: 'rgba(168, 85, 247, 0.2)',
    borderRadius: '2px',
    overflow: 'hidden',
  },
  loadingProgress: {
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, #a855f7, #3b82f6)',
    animation: 'loadingBar 1.5s ease-out forwards',
  },
  readySection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    animation: 'fadeIn 0.5s ease',
  },
  checkIcon: {
    marginBottom: '1.5rem',
    animation: 'popIn 0.5s ease',
  },
  label: {
    fontSize: '0.7rem',
    color: '#22c55e',
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
    fontSize: '1rem',
    color: '#94a3b8',
    fontFamily: 'system-ui, sans-serif',
    marginBottom: '2.5rem',
  },
  ctaButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '1.25rem 2.5rem',
    background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.3), rgba(59, 130, 246, 0.3))',
    border: '2px solid #a855f7',
    borderRadius: '12px',
    color: 'white',
    fontSize: '1rem',
    fontWeight: '600',
    fontFamily: "'Orbitron', sans-serif",
    letterSpacing: '0.1em',
    textDecoration: 'none',
    cursor: 'pointer',
    boxShadow: '0 0 30px rgba(168, 85, 247, 0.4)',
    transition: 'all 0.3s ease',
  },
  buttonArrow: {
    fontSize: '1.3rem',
  },
  xpHint: {
    marginTop: '1.5rem',
    fontSize: '0.75rem',
    color: '#64748b',
    letterSpacing: '0.05em',
  },
};

// Add keyframe animations
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  @keyframes loadingBar {
    from { transform: translateX(-100%); }
    to { transform: translateX(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes popIn {
    0% { transform: scale(0); }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); }
  }
`;
if (!document.querySelector('[data-results-style]')) {
  styleSheet.setAttribute('data-results-style', 'true');
  document.head.appendChild(styleSheet);
}

export default PersonalizedContentPage;
