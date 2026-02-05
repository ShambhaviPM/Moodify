import React from 'react';

const XPNotification = ({ notification, levelUp }) => {
  return (
    <>
      {/* XP Gain Notification */}
      {notification && (
        <div style={styles.xpNotification} key={Date.now()}>
          <span style={styles.xpIcon}>+</span>
          <span style={styles.xpAmount}>{notification.amount} XP</span>
        </div>
      )}

      {/* Level Up Popup */}
      {levelUp && (
        <div style={styles.levelUpOverlay}>
          <div style={styles.levelUpPopup}>
            <div style={styles.levelUpIcon}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={levelUp.color} strokeWidth="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>
            <h3 style={{ ...styles.levelUpTitle, color: levelUp.color }}>LEVEL UP!</h3>
            <p style={styles.levelUpLevel}>Level {levelUp.level}</p>
            <p style={{ ...styles.levelUpRank, color: levelUp.color }}>{levelUp.title}</p>
          </div>
        </div>
      )}
    </>
  );
};

const styles = {
  xpNotification: {
    position: 'fixed',
    top: '20px',
    right: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '1rem 1.5rem',
    background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.9), rgba(59, 130, 246, 0.9))',
    border: '1px solid rgba(168, 85, 247, 0.8)',
    borderRadius: '12px',
    color: 'white',
    fontFamily: "'Orbitron', sans-serif",
    fontSize: '1rem',
    boxShadow: '0 0 30px rgba(168, 85, 247, 0.5)',
    animation: 'xpPop 0.5s ease, xpFade 0.5s ease 2s forwards',
    zIndex: 10000,
  },
  xpIcon: {
    fontSize: '1.2rem',
    fontWeight: '700',
  },
  xpAmount: {
    fontWeight: '700',
    letterSpacing: '0.05em',
  },
  levelUpOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10001,
    animation: 'fadeIn 0.3s ease',
  },
  levelUpPopup: {
    textAlign: 'center',
    padding: '3rem 4rem',
    background: 'rgba(15, 23, 42, 0.95)',
    border: '2px solid rgba(168, 85, 247, 0.5)',
    borderRadius: '24px',
    boxShadow: '0 0 60px rgba(168, 85, 247, 0.4)',
    animation: 'popIn 0.5s ease',
  },
  levelUpIcon: {
    marginBottom: '1rem',
    animation: 'pulse 1s ease infinite',
  },
  levelUpTitle: {
    fontFamily: "'Orbitron', sans-serif",
    fontSize: '2rem',
    fontWeight: '700',
    marginBottom: '0.5rem',
    textTransform: 'uppercase',
    letterSpacing: '0.2em',
    textShadow: '0 0 20px currentColor',
  },
  levelUpLevel: {
    fontFamily: "'Orbitron', sans-serif",
    fontSize: '1rem',
    color: '#9ca3af',
    marginBottom: '0.25rem',
  },
  levelUpRank: {
    fontFamily: "'Orbitron', sans-serif",
    fontSize: '1.5rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
  },
};

// Add keyframe animations to document
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes xpPop {
    0% { transform: translateX(100px) scale(0.5); opacity: 0; }
    50% { transform: translateX(-10px) scale(1.1); }
    100% { transform: translateX(0) scale(1); opacity: 1; }
  }
  @keyframes xpFade {
    to { transform: translateX(100px); opacity: 0; }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes popIn {
    0% { transform: scale(0); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }
`;
document.head.appendChild(styleSheet);

export default XPNotification;
