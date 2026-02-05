import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Particles from './components/Particles';
import SoundToggle from './components/SoundToggle';
import soundManager from './utils/sounds';
import './styles/cyberpunk.css';

function MoodifyLandingPage() {
  const [glitchActive, setGlitchActive] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Random glitch effect
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 5000);
    return () => clearInterval(glitchInterval);
  }, []);

  const handleButtonHover = () => {
    soundManager.playHover();
  };

  const handleButtonClick = () => {
    soundManager.playClick();
  };

  const moodBubbles = [
    { emoji: '😊', top: '15%', left: '10%', size: 80, delay: 0 },
    { emoji: '🎮', bottom: '25%', left: '8%', size: 70, delay: 2 },
    { emoji: '🎵', top: '20%', right: '12%', size: 75, delay: 1 },
    { emoji: '📚', bottom: '20%', right: '8%', size: 85, delay: 3 },
    { emoji: '🚀', top: '60%', left: '15%', size: 60, delay: 4 },
    { emoji: '💡', top: '40%', right: '18%', size: 65, delay: 2.5 },
  ];

  return (
    <div style={styles.container}>
      {/* Particles Background */}
      <Particles count={30} />

      {/* Scanlines Overlay */}
      <div style={styles.scanlines} />

      {/* Gradient Orbs */}
      <div style={styles.gradientOrb1} />
      <div style={styles.gradientOrb2} />

      {/* Floating Mood Bubbles */}
      {moodBubbles.map((bubble, index) => (
        <div
          key={index}
          style={{
            ...styles.moodBubble,
            top: bubble.top,
            bottom: bubble.bottom,
            left: bubble.left,
            right: bubble.right,
            width: bubble.size,
            height: bubble.size,
            animationDelay: `${bubble.delay}s`,
            opacity: mounted ? 1 : 0,
          }}
        >
          <span style={{ fontSize: bubble.size * 0.4 }}>{bubble.emoji}</span>
        </div>
      ))}

      {/* Main Content */}
      <div style={{ ...styles.content, opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(20px)' }}>
        {/* Glitch Title */}
        <h1
          style={{
            ...styles.title,
            ...(glitchActive ? styles.titleGlitch : {}),
          }}
          data-text="MOODIFY"
        >
          <span style={styles.titleMain}>MOOD</span>
          <span style={styles.titleAccent}>IFY</span>
        </h1>

        {/* Subtitle with typing effect */}
        <div style={styles.subtitleContainer}>
          <span style={styles.subtitleBracket}>[</span>
          <p style={styles.subtitle}>TURN BOREDOM INTO PRODUCTIVE FUN</p>
          <span style={styles.subtitleBracket}>]</span>
        </div>

        {/* Decorative Line */}
        <div style={styles.decorativeLine}>
          <div style={styles.lineLeft} />
          <div style={styles.lineDiamond} />
          <div style={styles.lineRight} />
        </div>

        {/* CTA Button */}
        <Link
          to="/login"
          style={styles.ctaButton}
          onMouseEnter={handleButtonHover}
          onClick={handleButtonClick}
        >
          <span style={styles.ctaText}>INITIALIZE</span>
          <span style={styles.ctaArrow}>→</span>
          <div style={styles.ctaGlow} />
        </Link>

        {/* Stats/Info Bar */}
        <div style={styles.statsBar}>
          <div style={styles.statItem}>
            <span style={styles.statValue}>4</span>
            <span style={styles.statLabel}>ACTIVITIES</span>
          </div>
          <div style={styles.statDivider} />
          <div style={styles.statItem}>
            <span style={styles.statValue}>3</span>
            <span style={styles.statLabel}>MOODS</span>
          </div>
          <div style={styles.statDivider} />
          <div style={styles.statItem}>
            <span style={styles.statValue}>∞</span>
            <span style={styles.statLabel}>POSSIBILITIES</span>
          </div>
        </div>
      </div>

      {/* Corner Decorations */}
      <div style={styles.cornerTL} />
      <div style={styles.cornerBR} />

      {/* Sound Toggle */}
      <SoundToggle />
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
    fontFamily: "'Orbitron', sans-serif",
  },
  scanlines: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.03), rgba(0,0,0,0.03) 1px, transparent 1px, transparent 2px)',
    pointerEvents: 'none',
    zIndex: 10,
  },
  gradientOrb1: {
    position: 'absolute',
    top: '10%',
    left: '10%',
    width: '400px',
    height: '400px',
    background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%)',
    borderRadius: '50%',
    filter: 'blur(60px)',
    pointerEvents: 'none',
  },
  gradientOrb2: {
    position: 'absolute',
    bottom: '10%',
    right: '10%',
    width: '500px',
    height: '500px',
    background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
    borderRadius: '50%',
    filter: 'blur(60px)',
    pointerEvents: 'none',
  },
  moodBubble: {
    position: 'absolute',
    borderRadius: '50%',
    background: 'rgba(30, 41, 59, 0.6)',
    border: '1px solid rgba(168, 85, 247, 0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backdropFilter: 'blur(10px)',
    animation: 'float 6s ease-in-out infinite',
    transition: 'opacity 0.5s ease, transform 0.3s ease',
    zIndex: 2,
  },
  content: {
    textAlign: 'center',
    zIndex: 5,
    padding: '2rem',
    transition: 'opacity 0.8s ease, transform 0.8s ease',
  },
  title: {
    fontSize: 'clamp(3rem, 10vw, 6rem)',
    fontWeight: '900',
    marginBottom: '0.5rem',
    letterSpacing: '0.1em',
    position: 'relative',
    display: 'inline-block',
  },
  titleMain: {
    background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textShadow: '0 0 40px rgba(168, 85, 247, 0.5)',
  },
  titleAccent: {
    background: 'linear-gradient(135deg, #a855f7 0%, #3b82f6 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textShadow: '0 0 40px rgba(168, 85, 247, 0.8)',
  },
  titleGlitch: {
    animation: 'glitch 0.2s linear',
  },
  subtitleContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
    marginBottom: '2rem',
  },
  subtitleBracket: {
    fontSize: '1.5rem',
    color: '#a855f7',
    fontWeight: '300',
  },
  subtitle: {
    fontSize: 'clamp(0.8rem, 2vw, 1.1rem)',
    color: '#94a3b8',
    letterSpacing: '0.3em',
    textTransform: 'uppercase',
    margin: 0,
  },
  decorativeLine: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
    marginBottom: '2.5rem',
  },
  lineLeft: {
    width: '80px',
    height: '1px',
    background: 'linear-gradient(90deg, transparent, #a855f7)',
  },
  lineDiamond: {
    width: '8px',
    height: '8px',
    background: '#a855f7',
    transform: 'rotate(45deg)',
    boxShadow: '0 0 10px #a855f7',
  },
  lineRight: {
    width: '80px',
    height: '1px',
    background: 'linear-gradient(90deg, #a855f7, transparent)',
  },
  ctaButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1.2rem 3rem',
    fontSize: '1rem',
    fontWeight: '600',
    fontFamily: "'Orbitron', sans-serif",
    color: 'white',
    background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%)',
    border: '2px solid #a855f7',
    borderRadius: '8px',
    textDecoration: 'none',
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    letterSpacing: '0.15em',
    cursor: 'pointer',
  },
  ctaText: {
    position: 'relative',
    zIndex: 2,
  },
  ctaArrow: {
    position: 'relative',
    zIndex: 2,
    transition: 'transform 0.3s ease',
  },
  ctaGlow: {
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(168, 85, 247, 0.4), transparent)',
    transition: 'left 0.5s ease',
  },
  statsBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '2rem',
    marginTop: '3rem',
    padding: '1rem 2rem',
    background: 'rgba(15, 23, 42, 0.6)',
    borderRadius: '12px',
    border: '1px solid rgba(168, 85, 247, 0.2)',
  },
  statItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.25rem',
  },
  statValue: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#a855f7',
  },
  statLabel: {
    fontSize: '0.6rem',
    color: '#64748b',
    letterSpacing: '0.1em',
  },
  statDivider: {
    width: '1px',
    height: '30px',
    background: 'rgba(168, 85, 247, 0.3)',
  },
  cornerTL: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    width: '60px',
    height: '60px',
    borderTop: '2px solid rgba(168, 85, 247, 0.5)',
    borderLeft: '2px solid rgba(168, 85, 247, 0.5)',
  },
  cornerBR: {
    position: 'absolute',
    bottom: '20px',
    right: '20px',
    width: '60px',
    height: '60px',
    borderBottom: '2px solid rgba(59, 130, 246, 0.5)',
    borderRight: '2px solid rgba(59, 130, 246, 0.5)',
  },
};

// Add keyframe animations
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
  @keyframes glitch {
    0% { transform: translate(0); }
    20% { transform: translate(-2px, 2px); }
    40% { transform: translate(-2px, -2px); }
    60% { transform: translate(2px, 2px); }
    80% { transform: translate(2px, -2px); }
    100% { transform: translate(0); }
  }
  a[href="/login"]:hover {
    box-shadow: 0 0 30px rgba(168, 85, 247, 0.5);
    transform: translateY(-3px);
    border-color: #3b82f6;
  }
  a[href="/login"]:hover span:last-of-type {
    transform: translateX(5px);
  }
  a[href="/login"]:hover div {
    left: 100%;
  }
`;
if (!document.querySelector('[data-landing-style]')) {
  styleSheet.setAttribute('data-landing-style', 'true');
  document.head.appendChild(styleSheet);
}

export default MoodifyLandingPage;
