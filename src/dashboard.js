import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Particles from './components/Particles';
import SoundToggle from './components/SoundToggle';
import XPBar from './components/XPBar';
import XPNotification from './components/XPNotification';
import { useGameState } from './hooks/useGameState';
import soundManager from './utils/sounds';
import './styles/cyberpunk.css';

const Dashboard = () => {
  const [username, setUsername] = useState('');
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();
  const { levelInfo, notification, levelUp } = useGameState();

  useEffect(() => {
    setMounted(true);
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
    soundManager.playClick();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleDiveIn = () => {
    soundManager.playNavigate();
    navigate('/mood-tracker');
  };

  const stats = [
    { label: 'SESSIONS', value: Math.floor(levelInfo.xp / 50) || 0 },
    { label: 'LEVEL', value: levelInfo.level },
    { label: 'RANK', value: levelInfo.title },
  ];

  return (
    <div style={styles.container}>
      <Particles count={25} />
      <div style={styles.scanlines} />
      <div style={styles.gradientOrb1} />
      <div style={styles.gradientOrb2} />

      {/* Navbar */}
      <nav style={styles.navbar}>
        <div style={styles.navLeft}>
          <span style={styles.logo}>MOODIFY</span>
          <span style={styles.logoTag}>v2.0</span>
        </div>
        <div style={styles.navRight}>
          <XPBar levelInfo={levelInfo} compact />
          <div style={styles.userInfo}>
            <div style={styles.avatar}>
              {username.charAt(0).toUpperCase()}
            </div>
            <span style={styles.username}>{username}</span>
          </div>
          <button
            onClick={handleLogout}
            style={styles.logoutBtn}
            onMouseEnter={(e) => {
              soundManager.playHover();
              e.target.style.borderColor = '#ef4444';
              e.target.style.color = '#ef4444';
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = 'rgba(239, 68, 68, 0.3)';
              e.target.style.color = '#94a3b8';
            }}
          >
            LOGOUT
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main style={{
        ...styles.main,
        opacity: mounted ? 1 : 0,
        transform: mounted ? 'translateY(0)' : 'translateY(20px)'
      }}>
        {/* Welcome Section */}
        <div style={styles.welcomeSection}>
          <p style={styles.welcomeLabel}>WELCOME BACK</p>
          <h1 style={styles.welcomeTitle}>
            <span style={styles.titleAccent}>{username.toUpperCase()}</span>
          </h1>
          <p style={styles.welcomeSubtitle}>Ready to explore your mood today?</p>
        </div>

        {/* Stats Cards */}
        <div style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <div
              key={index}
              style={styles.statCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#a855f7';
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 0 20px rgba(168, 85, 247, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.2)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <span style={styles.statValue}>{stat.value}</span>
              <span style={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>

        {/* XP Progress Card */}
        <div style={styles.xpCard}>
          <div style={styles.xpCardHeader}>
            <span style={styles.xpCardTitle}>PROGRESSION STATUS</span>
            <span style={styles.xpCardXP}>{levelInfo.xp} TOTAL XP</span>
          </div>
          <XPBar levelInfo={levelInfo} />
          <div style={styles.xpTip}>
            <span style={styles.tipIcon}>💡</span>
            <span>Complete mood sessions to earn XP and level up!</span>
          </div>
        </div>

        {/* CTA Card */}
        <div style={styles.ctaCard}>
          <div style={styles.ctaContent}>
            <h2 style={styles.ctaTitle}>BEGIN YOUR SESSION</h2>
            <p style={styles.ctaText}>
              Track your mood and discover personalized content recommendations tailored just for you.
            </p>
          </div>
          <button
            onClick={handleDiveIn}
            style={styles.ctaButton}
            onMouseEnter={(e) => {
              soundManager.playHover();
              e.target.style.boxShadow = '0 0 40px rgba(168, 85, 247, 0.6)';
              e.target.style.transform = 'translateY(-3px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.boxShadow = '0 0 20px rgba(168, 85, 247, 0.3)';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            <span>DIVE IN</span>
            <span style={styles.ctaArrow}>→</span>
          </button>
        </div>

        {/* Corner Decorations */}
        <div style={styles.cornerTL} />
        <div style={styles.cornerBR} />
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
    top: '10%',
    left: '5%',
    width: '400px',
    height: '400px',
    background: 'radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 70%)',
    borderRadius: '50%',
    filter: 'blur(60px)',
    pointerEvents: 'none',
  },
  gradientOrb2: {
    position: 'fixed',
    bottom: '10%',
    right: '5%',
    width: '500px',
    height: '500px',
    background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
    borderRadius: '50%',
    filter: 'blur(60px)',
    pointerEvents: 'none',
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    background: 'rgba(15, 23, 42, 0.8)',
    borderBottom: '1px solid rgba(168, 85, 247, 0.2)',
    backdropFilter: 'blur(10px)',
    position: 'relative',
    zIndex: 100,
  },
  navLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  logo: {
    fontSize: '1.2rem',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #a855f7, #3b82f6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    letterSpacing: '0.1em',
  },
  logoTag: {
    fontSize: '0.6rem',
    color: '#64748b',
    padding: '0.15rem 0.4rem',
    border: '1px solid #64748b',
    borderRadius: '4px',
  },
  navRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  avatar: {
    width: '36px',
    height: '36px',
    background: 'linear-gradient(135deg, #a855f7, #3b82f6)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.9rem',
    fontWeight: '700',
    color: 'white',
  },
  username: {
    fontSize: '0.85rem',
    color: '#e2e8f0',
    fontWeight: '500',
  },
  logoutBtn: {
    padding: '0.5rem 1rem',
    background: 'transparent',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    borderRadius: '6px',
    color: '#94a3b8',
    fontSize: '0.7rem',
    fontFamily: "'Orbitron', sans-serif",
    letterSpacing: '0.1em',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  main: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '3rem 2rem',
    position: 'relative',
    zIndex: 5,
    transition: 'all 0.5s ease',
  },
  welcomeSection: {
    textAlign: 'center',
    marginBottom: '3rem',
  },
  welcomeLabel: {
    fontSize: '0.75rem',
    color: '#64748b',
    letterSpacing: '0.3em',
    marginBottom: '0.5rem',
  },
  welcomeTitle: {
    fontSize: 'clamp(2rem, 5vw, 3rem)',
    fontWeight: '700',
    color: 'white',
    marginBottom: '0.5rem',
  },
  titleAccent: {
    background: 'linear-gradient(135deg, #a855f7, #3b82f6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  welcomeSubtitle: {
    fontSize: '1rem',
    color: '#94a3b8',
    fontFamily: 'system-ui, sans-serif',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1rem',
    marginBottom: '2rem',
  },
  statCard: {
    background: 'rgba(30, 41, 59, 0.6)',
    border: '1px solid rgba(168, 85, 247, 0.2)',
    borderRadius: '12px',
    padding: '1.5rem',
    textAlign: 'center',
    transition: 'all 0.3s ease',
    cursor: 'default',
  },
  statValue: {
    display: 'block',
    fontSize: '1.75rem',
    fontWeight: '700',
    color: '#a855f7',
    marginBottom: '0.25rem',
  },
  statLabel: {
    fontSize: '0.65rem',
    color: '#64748b',
    letterSpacing: '0.1em',
  },
  xpCard: {
    background: 'rgba(30, 41, 59, 0.6)',
    border: '1px solid rgba(168, 85, 247, 0.2)',
    borderRadius: '16px',
    padding: '1.5rem',
    marginBottom: '2rem',
  },
  xpCardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  xpCardTitle: {
    fontSize: '0.75rem',
    color: '#94a3b8',
    letterSpacing: '0.1em',
  },
  xpCardXP: {
    fontSize: '0.75rem',
    color: '#a855f7',
    fontWeight: '600',
  },
  xpTip: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginTop: '1rem',
    padding: '0.75rem',
    background: 'rgba(168, 85, 247, 0.1)',
    borderRadius: '8px',
    fontSize: '0.8rem',
    color: '#94a3b8',
    fontFamily: 'system-ui, sans-serif',
  },
  tipIcon: {
    fontSize: '1rem',
  },
  ctaCard: {
    background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(59, 130, 246, 0.1))',
    border: '1px solid rgba(168, 85, 247, 0.3)',
    borderRadius: '20px',
    padding: '2.5rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    gap: '1.5rem',
  },
  ctaContent: {
    maxWidth: '500px',
  },
  ctaTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: 'white',
    marginBottom: '0.75rem',
    letterSpacing: '0.05em',
  },
  ctaText: {
    fontSize: '0.95rem',
    color: '#94a3b8',
    lineHeight: 1.6,
    fontFamily: 'system-ui, sans-serif',
  },
  ctaButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1.25rem 3rem',
    background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.3), rgba(59, 130, 246, 0.3))',
    border: '2px solid #a855f7',
    borderRadius: '12px',
    color: 'white',
    fontSize: '1.1rem',
    fontWeight: '700',
    fontFamily: "'Orbitron', sans-serif",
    letterSpacing: '0.15em',
    cursor: 'pointer',
    boxShadow: '0 0 20px rgba(168, 85, 247, 0.3)',
    transition: 'all 0.3s ease',
  },
  ctaArrow: {
    fontSize: '1.3rem',
    transition: 'transform 0.3s ease',
  },
  cornerTL: {
    position: 'fixed',
    top: '80px',
    left: '20px',
    width: '60px',
    height: '60px',
    borderTop: '2px solid rgba(168, 85, 247, 0.3)',
    borderLeft: '2px solid rgba(168, 85, 247, 0.3)',
    pointerEvents: 'none',
  },
  cornerBR: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    width: '60px',
    height: '60px',
    borderBottom: '2px solid rgba(59, 130, 246, 0.3)',
    borderRight: '2px solid rgba(59, 130, 246, 0.3)',
    pointerEvents: 'none',
  },
};

export default Dashboard;
