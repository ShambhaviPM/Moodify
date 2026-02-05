import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Particles from './components/Particles';
import SoundToggle from './components/SoundToggle';
import XPNotification from './components/XPNotification';
import { useGameState } from './hooks/useGameState';
import soundManager from './utils/sounds';
import './styles/cyberpunk.css';

const ContentPage = () => {
  const [mounted, setMounted] = useState(false);
  const [xpAwarded, setXpAwarded] = useState(false);
  const { addXP, notification, levelUp } = useGameState();

  const recommendation = JSON.parse(localStorage.getItem('selectedRecommendation') || 'null');

  useEffect(() => {
    setMounted(true);

    // Award completion XP
    if (!xpAwarded && recommendation) {
      setTimeout(() => {
        addXP('COMPLETE_FLOW');
        setXpAwarded(true);
        soundManager.playLevelUp();
      }, 800);
    }
  }, [addXP, xpAwarded, recommendation]);

  return (
    <div style={styles.container}>
      <Particles count={20} />
      <div style={styles.scanlines} />
      <div style={styles.gradientOrb1} />
      <div style={styles.gradientOrb2} />

      {/* Header */}
      <div style={styles.header}>
        <Link
          to="/results"
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
        <div style={styles.headerRight}>
          <span style={styles.badge}>FLOW COMPLETE</span>
          <Link
            to="/dashboard"
            style={styles.homeButton}
            onClick={() => soundManager.playSelect()}
            onMouseEnter={(e) => {
              soundManager.playHover();
              e.target.style.background = 'rgba(168, 85, 247, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(168, 85, 247, 0.1)';
            }}
          >
            DASHBOARD
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <main style={{
        ...styles.main,
        opacity: mounted ? 1 : 0,
        transform: mounted ? 'translateY(0)' : 'translateY(20px)'
      }}>
        {recommendation ? (
          <>
            {/* Content Card */}
            <div style={styles.contentCard}>
              <div style={styles.imageContainer}>
                <img
                  src={recommendation.imageSrc}
                  alt={recommendation.imageAlt}
                  style={styles.image}
                />
                <div style={styles.imageOverlay} />
                <div style={styles.completeBadge}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <span>UNLOCKED</span>
                </div>
              </div>

              <div style={styles.contentBody}>
                <p style={styles.label}>YOUR PERSONALIZED CONTENT</p>
                <h1 style={styles.title}>{recommendation.title}</h1>
                <p style={styles.description}>{recommendation.description}</p>

                {/* Tags */}
                {recommendation.tags && (
                  <div style={styles.tagContainer}>
                    {recommendation.tags.map((tag, index) => (
                      <span key={index} style={styles.tag}>{tag}</span>
                    ))}
                  </div>
                )}

                {/* External Links */}
                {recommendation.links && recommendation.links.length > 0 && (
                  <div style={styles.linksSection}>
                    <p style={styles.linksLabel}>EXPLORE RESOURCES</p>
                    <div style={styles.linksContainer}>
                      {recommendation.links.map((link, index) => (
                        <a
                          key={index}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={styles.linkButton}
                          onClick={() => soundManager.playSelect()}
                          onMouseEnter={(e) => {
                            soundManager.playHover();
                            e.currentTarget.style.borderColor = '#a855f7';
                            e.currentTarget.style.transform = 'translateY(-3px)';
                            e.currentTarget.style.boxShadow = '0 0 25px rgba(168, 85, 247, 0.4)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.3)';
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                          }}
                        >
                          <span style={styles.linkIcon}>↗</span>
                          <span>{link.label}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div style={styles.actionSection}>
              <Link
                to="/mood-tracker"
                style={styles.restartButton}
                onClick={() => soundManager.playSelect()}
                onMouseEnter={(e) => {
                  soundManager.playHover();
                  e.currentTarget.style.boxShadow = '0 0 30px rgba(168, 85, 247, 0.5)';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 15px rgba(168, 85, 247, 0.3)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <span>START NEW JOURNEY</span>
                <span style={styles.buttonArrow}>→</span>
              </Link>
              <p style={styles.hint}>Earn more XP by exploring different moods</p>
            </div>
          </>
        ) : (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4M12 16h.01" />
              </svg>
            </div>
            <h2 style={styles.emptyTitle}>NO CONTENT FOUND</h2>
            <p style={styles.emptyText}>Start a new journey to discover personalized content</p>
            <Link
              to="/mood-tracker"
              style={styles.emptyButton}
              onClick={() => soundManager.playSelect()}
            >
              BEGIN JOURNEY
            </Link>
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
    top: '10%',
    left: '5%',
    width: '350px',
    height: '350px',
    background: 'radial-gradient(circle, rgba(168, 85, 247, 0.12) 0%, transparent 70%)',
    borderRadius: '50%',
    filter: 'blur(60px)',
    pointerEvents: 'none',
  },
  gradientOrb2: {
    position: 'fixed',
    bottom: '10%',
    right: '5%',
    width: '400px',
    height: '400px',
    background: 'radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, transparent 70%)',
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
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
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
  homeButton: {
    padding: '0.5rem 1rem',
    background: 'rgba(168, 85, 247, 0.1)',
    border: '1px solid rgba(168, 85, 247, 0.3)',
    borderRadius: '6px',
    color: '#a855f7',
    fontSize: '0.75rem',
    textDecoration: 'none',
    fontFamily: "'Orbitron', sans-serif",
    letterSpacing: '0.1em',
    transition: 'all 0.3s ease',
  },
  main: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '1rem 2rem 3rem',
    position: 'relative',
    zIndex: 5,
    transition: 'all 0.5s ease',
  },
  contentCard: {
    background: 'rgba(30, 41, 59, 0.7)',
    border: '1px solid rgba(168, 85, 247, 0.3)',
    borderRadius: '20px',
    overflow: 'hidden',
    marginBottom: '2rem',
  },
  imageContainer: {
    position: 'relative',
    height: '300px',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
    background: 'linear-gradient(transparent, rgba(15, 23, 42, 0.95))',
  },
  completeBadge: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    background: 'rgba(34, 197, 94, 0.2)',
    border: '1px solid rgba(34, 197, 94, 0.5)',
    borderRadius: '20px',
    color: '#22c55e',
    fontSize: '0.7rem',
    letterSpacing: '0.1em',
  },
  contentBody: {
    padding: '2rem',
  },
  label: {
    fontSize: '0.7rem',
    color: '#64748b',
    letterSpacing: '0.3em',
    marginBottom: '0.75rem',
  },
  title: {
    fontSize: 'clamp(1.5rem, 4vw, 2rem)',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #a855f7, #3b82f6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '1rem',
    lineHeight: 1.3,
  },
  description: {
    fontSize: '1rem',
    color: '#cbd5e1',
    lineHeight: 1.7,
    fontFamily: 'system-ui, sans-serif',
    marginBottom: '1.5rem',
  },
  tagContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    marginBottom: '2rem',
  },
  tag: {
    padding: '0.35rem 0.75rem',
    background: 'rgba(168, 85, 247, 0.15)',
    border: '1px solid rgba(168, 85, 247, 0.3)',
    borderRadius: '15px',
    color: '#a855f7',
    fontSize: '0.7rem',
    letterSpacing: '0.05em',
  },
  linksSection: {
    borderTop: '1px solid rgba(168, 85, 247, 0.2)',
    paddingTop: '1.5rem',
  },
  linksLabel: {
    fontSize: '0.7rem',
    color: '#64748b',
    letterSpacing: '0.2em',
    marginBottom: '1rem',
  },
  linksContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  linkButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '1rem 1.25rem',
    background: 'rgba(30, 41, 59, 0.6)',
    border: '1px solid rgba(168, 85, 247, 0.3)',
    borderRadius: '10px',
    color: 'white',
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontFamily: "'Orbitron', sans-serif",
    letterSpacing: '0.05em',
    transition: 'all 0.3s ease',
  },
  linkIcon: {
    fontSize: '1.1rem',
    color: '#a855f7',
  },
  actionSection: {
    textAlign: 'center',
  },
  restartButton: {
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
    textDecoration: 'none',
    cursor: 'pointer',
    boxShadow: '0 0 15px rgba(168, 85, 247, 0.3)',
    transition: 'all 0.3s ease',
  },
  buttonArrow: {
    fontSize: '1.2rem',
  },
  hint: {
    marginTop: '1rem',
    fontSize: '0.75rem',
    color: '#64748b',
    letterSpacing: '0.05em',
  },
  emptyState: {
    textAlign: 'center',
    padding: '4rem 2rem',
  },
  emptyIcon: {
    marginBottom: '1.5rem',
    opacity: 0.6,
  },
  emptyTitle: {
    fontSize: '1.5rem',
    color: '#94a3b8',
    marginBottom: '0.75rem',
  },
  emptyText: {
    fontSize: '0.9rem',
    color: '#64748b',
    fontFamily: 'system-ui, sans-serif',
    marginBottom: '2rem',
  },
  emptyButton: {
    display: 'inline-block',
    padding: '1rem 2rem',
    background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(59, 130, 246, 0.2))',
    border: '2px solid #a855f7',
    borderRadius: '10px',
    color: 'white',
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontFamily: "'Orbitron', sans-serif",
    letterSpacing: '0.1em',
  },
};

export default ContentPage;
