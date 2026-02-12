import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import RecommendationData from './recommendation-data';
import Particles from './components/Particles';
import SoundToggle from './components/SoundToggle';
import soundManager from './utils/sounds';
import { API_BASE_URL } from './config';
import './styles/cyberpunk.css';

const RecommendationsPage = () => {
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [feedback, setFeedback] = useState({}); // Track feedback per recommendation
  const [interactionIds, setInteractionIds] = useState({});

  const trackInteraction = async (recommendationId, recommendationTitle) => {
    try {
      const mood = localStorage.getItem('selectedMood');
      const activity = localStorage.getItem('selectedActivity');
      const theme = localStorage.getItem('currentTheme');
      const token = localStorage.getItem('token');

      if (!token) return;

      const response = await fetch(`${API_BASE_URL}/interactions/track`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          mood,
          activity,
          theme,
          recommendationId,
          clicked: true,
          timeSpent: 0
        })
      });

      if (response.ok) {
        const data = await response.json();
        setInteractionIds(prev => ({
          ...prev,
          [recommendationId]: data.interactionId
        }));
      }
    } catch (error) {
      console.error('Error tracking interaction:', error);
    }
  };

  const submitFeedback = async (recommendationId, feedbackValue) => {
    try {
      const token = localStorage.getItem('token');
      const interactionId = interactionIds[recommendationId];

      if (!token || !interactionId) return;

      await fetch(`${API_BASE_URL}/interactions/feedback`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          interactionId,
          feedback: feedbackValue
        })
      });

      setFeedback(prev => ({
        ...prev,
        [recommendationId]: feedbackValue
      }));
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  useEffect(() => {
    setMounted(true);
    const mood = localStorage.getItem('selectedMood');
    const activity = localStorage.getItem('selectedActivity');
    const theme = localStorage.getItem('currentTheme');
    const token = localStorage.getItem('token');

    const energy = localStorage.getItem('energyLevel');
    // Use the 4-tier filtering: activity -> theme -> energy -> mood scoring
    const generatedRecs = RecommendationData.findRecommendations(mood, activity, theme, energy, 3);
    setRecommendations(generatedRecs);

    // Track that user viewed recommendations
    generatedRecs.forEach(rec => {
      trackInteraction(rec.id, rec.title);
    });

    // Try ML enhancement: if user has history, the ML engine may suggest
    // a better #1 pick based on their liked items
    if (token && mood && activity && theme) {
      fetch(`${API_BASE_URL}/recommendations/ml`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ mood, activity, theme })
      })
        .then(res => res.ok ? res.json() : null)
        .then(data => {
          if (data?.success && data.isML && data.recommendation) {
            const mlId = data.recommendation.id;
            // Find the full content item from local data (ML only sends id/title)
            const fullItem = RecommendationData.contentSections.find(c => c.id === mlId);
            if (fullItem) {
              setRecommendations(prev => {
                const alreadyIn = prev.find(r => r.id === mlId);
                if (alreadyIn) {
                  // Boost it to position #1
                  return [alreadyIn, ...prev.filter(r => r.id !== mlId)];
                }
                // Swap it in for the last item
                return [fullItem, ...prev.slice(0, 2)];
              });
            }
          }
        })
        .catch(() => { /* ML is optional, local recs are the fallback */ });
    }

  }, []);

  const handleSelectRecommendation = (recommendation) => {
    soundManager.playSelect();
    localStorage.setItem('selectedRecommendation', JSON.stringify(recommendation));
    // If it's an in-app experience, go directly there
    if (recommendation.inApp) {
      navigate(recommendation.inApp.route);
    } else {
      navigate('/results');
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
          to="/energy"
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
                
                {/* Feedback Buttons */}
                <div style={styles.feedbackContainer}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      soundManager.playSelect();
                      submitFeedback(rec.id, 'liked');
                    }}
                    style={{
                      ...styles.feedbackButton,
                      opacity: feedback[rec.id] === 'liked' ? 1 : 0.6,
                      borderColor: feedback[rec.id] === 'liked' ? '#10b981' : 'rgba(16, 185, 129, 0.3)',
                      color: feedback[rec.id] === 'liked' ? '#10b981' : 'rgba(16, 185, 129, 0.7)',
                    }}
                    title="I like this recommendation"
                  >
                    👍
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      soundManager.playSelect();
                      submitFeedback(rec.id, 'disliked');
                    }}
                    style={{
                      ...styles.feedbackButton,
                      opacity: feedback[rec.id] === 'disliked' ? 1 : 0.6,
                      borderColor: feedback[rec.id] === 'disliked' ? '#ef4444' : 'rgba(239, 68, 68, 0.3)',
                      color: feedback[rec.id] === 'disliked' ? '#ef4444' : 'rgba(239, 68, 68, 0.7)',
                    }}
                    title="Not what I'm looking for"
                  >
                    👎
                  </button>
                </div>

                <div style={styles.cardFooter}>
                  <button
                    onClick={() => handleSelectRecommendation(rec)}
                    style={styles.exploreButton}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#a855f7';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'rgba(168, 85, 247, 0.7)';
                    }}
                  >
                    EXPLORE →
                  </button>
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
  feedbackContainer: {
    display: 'flex',
    gap: '0.75rem',
    justifyContent: 'center',
    marginBottom: '1rem',
  },
  feedbackButton: {
    background: 'transparent',
    border: '1px solid rgba(168, 85, 247, 0.3)',
    borderRadius: '6px',
    padding: '0.5rem 0.75rem',
    fontSize: '1.2rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  cardFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  exploreButton: {
    background: 'transparent',
    border: 'none',
    fontSize: '0.75rem',
    color: 'rgba(168, 85, 247, 0.7)',
    letterSpacing: '0.1em',
    cursor: 'pointer',
    transition: 'color 0.3s ease',
    fontFamily: "'Orbitron', sans-serif",
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
