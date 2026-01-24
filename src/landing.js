import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';


function MoodifyLandingPage() {
  const styles = {
    body: {
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
    },
    moodOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
    },
    container: {
      textAlign: 'center',
      color: 'white',
      zIndex: 5,
      padding: '2rem',
      position: 'relative',
    },
    logo: {
      fontSize: '4rem',
      fontWeight: 'bold',
      marginBottom: '1rem',
      background: 'linear-gradient(to right, #a855f7, #3b82f6)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      textShadow: '0 0 20px rgba(168, 85, 247, 0.3)',
      animation: 'glow 2s ease-in-out infinite alternate',
    },
    tagline: {
      fontSize: '1.5rem',
      color: '#e2e8f0',
      marginBottom: '2rem',
      letterSpacing: '2px',
    },
    ctaButton: {
      padding: '1.2rem 2.5rem',
      fontSize: '1.2rem',
      background: 'linear-gradient(45deg, #a855f7, #3b82f6)',
      color: 'white',
      border: 'none',
      borderRadius: '50px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 0 20px rgba(168, 85, 247, 0.3)',
      textDecoration: 'none',
    },
    moodBubble: {
      position: 'absolute',
      borderRadius: '50%',
      background: 'radial-gradient(circle at center, rgba(168, 85, 247, 0.3), rgba(59, 130, 246, 0.1))',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.5rem',
      color: 'white',
      boxShadow: '0 0 20px rgba(168, 85, 247, 0.2)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    },
  };
  
  // Updated Bubble Positions
  const moodBubbles = [
    { emoji: '😊', top: '15%', left: '20%', width: '100px', height: '100px' },
    { emoji: '🎮', bottom: '20%', left: '15%', width: '80px', height: '80px' },
    { emoji: '🎵', top: '30%', right: '20%', width: '90px', height: '90px' },
    { emoji: '📚', bottom: '15%', right: '10%', width: '110px', height: '110px' },
  ];
  

  const musicNotes = ['♪', '♫', '♬', '♪'];
  
  return (
    <div className="min-h-screen relative" style={styles.body}>
      <div style={styles.moodOverlay} />
      
      {moodBubbles.map((bubble, index) => (
        <div
          key={index}
          className="animate-bubble-float"
          style={{
            ...styles.moodBubble,
            top: bubble.top,
            left: bubble.left,
            right: bubble.right,
            width: bubble.width,
            height: bubble.height,
            animationDelay: bubble.delay,
          }}
        >
          {bubble.emoji}
        </div>
      ))}
      
      <div style={styles.gamingElements}>
        <div className="animate-float-controller">
          <svg className="w-32 h-32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M21 6H3a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2z" />
            <circle cx="7" cy="12" r="1" />
            <circle cx="11" cy="12" r="1" />
            <circle cx="15" cy="12" r="1" />
          </svg>
        </div>
        <div className="animate-float-headset">
          <svg className="w-24 h-24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
            <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
          </svg>
        </div>
      </div>

      <div style={styles.musicNotes}>
        {musicNotes.map((note, index) => (
          <div
            key={index}
            className="animate-float-note"
            style={{
              position: 'absolute',
              left: `${20 + index * 20}%`,
              fontSize: '2rem',
              color: 'rgba(168, 85, 247, 0.6)',
              animationDelay: `${index}s`,
            }}
          >
            {note}
          </div>
        ))}
      </div>
      
      <div style={styles.container}>
        <h1 style={styles.logo}>MOODIFY</h1>
        <p style={styles.tagline}>TURN BOREDOM INTO PRODUCTIVE FUN</p>
        <Link 
          to="/login" 
          style={styles.ctaButton}
          className="hover:transform hover:scale-105 hover:-translate-y-2 hover:shadow-lg"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default MoodifyLandingPage;