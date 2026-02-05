import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import RecommendationData from './recommendation-data';
import Particles from './components/Particles';
import SoundToggle from './components/SoundToggle';
import XPNotification from './components/XPNotification';
import { useGameState } from './hooks/useGameState';
import soundManager from './utils/sounds';
import './styles/cyberpunk.css';

const RecommendationsPage = () => {
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [xpAdded, setXpAdded] = useState(false);
  const { addXP, notification, levelUp } = useGameState();

  useEffect(() => {
    setMounted(true);
    const mood = localStorage.getItem('selectedMood');
    const activity = localStorage.getItem('selectedActivity');
    const theme = localStorage.getItem('currentTheme');

    const generateRecommendations = () => {
      const allContent = RecommendationData.contentSections;
      const moodProfile = RecommendationData.recommendationMatrix.mood[mood];
      const themeRecommendations = RecommendationData.recommendationMatrix.theme[theme];

      const filteredRecommendations = allContent
        .filter(section =>
          themeRecommendations?.includes(section.id) ||
          section.tags?.some(tag => moodProfile?.preference?.includes(tag))
        )
        .slice(0, 3);

      return filteredRecommendations;
    };

    const generatedRecs = generateRecommendations();
    setRecommendations(generatedRecs);

    // Add XP for viewing recommendations (only once)
    if (!xpAdded) {
      setTimeout(() => {
        addXP('VIEW_RECOMMENDATION');
        setXpAdded(true);
      }, 500);
    }
  }, [addXP, xpAdded]);

  const handleSelectRecommendation = (recommendation) => {
    soundManager.playSelect();
    localStorage.setItem('selectedRecommendation', JSON.stringify(recommendation));
    navigate('/results');
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
          to="/theme"
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
        <span style={styles.badge}>RECOMMENDATIONS</span>
      </div>

      {/* Main Content */}
      <main style={{
        ...styles.main,
        opacity: mounted ? 1 : 0,
        transform: mounted ? 'translateY(0)' : 'translateY(20px)'
      }}>
        <div style={styles.titleSection}>
          <p style={styles.label}>PERSONALIZED FOR YOU</p>
          <h1 style={styles.title}>
            CHOOSE YOUR <span style={styles.titleAccent}>ADVENTURE</span>
          </h1>
          <p style={styles.subtitle}>Select a recommendation to explore</p>
        </div>

        {/* Recommendation Cards */}
        <div style={styles.cardGrid}>
          {recommendations.map((rec, index) => (
            <div
              key={rec.id}
              style={{
                ...styles.card,
                animationDelay: `${index * 0.1}s`,
              }}
              onClick={() => handleSelectRecommendation(rec)}
              onMouseEnter={(e) => {
                soundManager.playHover();
                e.currentTarget.style.borderColor = '#a855f7';
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 0 40px rgba(168, 85, 247, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.2)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={styles.cardImageContainer}>
                <img
                  src={rec.imageSrc}
                  alt={rec.imageAlt}
                  style={styles.cardImage}
                />
                <div style={styles.cardOverlay} />
              </div>
              <div style={styles.cardContent}>
                <h2 style={styles.cardTitle}>{rec.title}</h2>
                <p style={styles.cardDescription}>{rec.description}</p>
                <div style={styles.cardFooter}>
                  <span style={styles.exploreText}>EXPLORE →</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {recommendations.length === 0 && (
          <div style={styles.emptyState}>
            <p>No recommendations found. Try different selections.</p>
            <Link to="/mood-tracker" style={styles.retryButton}>START OVER</Link>
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
  badge: {
    padding: '0.5rem 1rem',
    background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(59, 130, 246, 0.2))',
    border: '1px solid rgba(168, 85, 247, 0.3)',
    borderRadius: '20px',
    color: '#a855f7',
    fontSize: '0.7rem',
    letterSpacing: '0.1em',
  },
  main: {
    maxWidth: '1000px',
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
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '1.5rem',
  },
  card: {
    background: 'rgba(30, 41, 59, 0.6)',
    border: '1px solid rgba(168, 85, 247, 0.2)',
    borderRadius: '16px',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  cardImageContainer: {
    position: 'relative',
    height: '180px',
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.3s ease',
  },
  cardOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    background: 'linear-gradient(transparent, rgba(15, 23, 42, 0.9))',
  },
  cardContent: {
    padding: '1.25rem',
  },
  cardTitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#a855f7',
    marginBottom: '0.5rem',
    letterSpacing: '0.05em',
  },
  cardDescription: {
    fontSize: '0.85rem',
    color: '#94a3b8',
    lineHeight: 1.5,
    fontFamily: 'system-ui, sans-serif',
    marginBottom: '1rem',
  },
  cardFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  exploreText: {
    fontSize: '0.75rem',
    color: '#3b82f6',
    letterSpacing: '0.1em',
  },
  emptyState: {
    padding: '3rem',
    textAlign: 'center',
    color: '#94a3b8',
  },
  retryButton: {
    display: 'inline-block',
    marginTop: '1rem',
    padding: '0.75rem 1.5rem',
    background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(59, 130, 246, 0.2))',
    border: '1px solid #a855f7',
    borderRadius: '8px',
    color: 'white',
    textDecoration: 'none',
    fontSize: '0.8rem',
    letterSpacing: '0.1em',
  },
};

export default RecommendationsPage;
