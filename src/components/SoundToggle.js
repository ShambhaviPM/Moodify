import React, { useState } from 'react';
import soundManager from '../utils/sounds';

const SoundToggle = () => {
  const [enabled, setEnabled] = useState(soundManager.isEnabled());

  const handleToggle = () => {
    const newState = soundManager.toggle();
    setEnabled(newState);
  };

  return (
    <button
      onClick={handleToggle}
      style={styles.button}
      title={enabled ? 'Mute sounds' : 'Enable sounds'}
      aria-label={enabled ? 'Mute sounds' : 'Enable sounds'}
    >
      {enabled ? (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </svg>
      ) : (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      )}
    </button>
  );
};

const styles = {
  button: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    width: '50px',
    height: '50px',
    background: 'rgba(30, 41, 59, 0.9)',
    border: '1px solid rgba(168, 85, 247, 0.5)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: '#a855f7',
    transition: 'all 0.3s ease',
    zIndex: 1000,
    backdropFilter: 'blur(10px)',
  },
};

// Add hover effect via stylesheet
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  button[title*="sounds"]:hover {
    box-shadow: 0 0 20px rgba(168, 85, 247, 0.5);
    transform: scale(1.1);
    border-color: #a855f7;
  }
`;
if (!document.querySelector('[data-sound-toggle-style]')) {
  styleSheet.setAttribute('data-sound-toggle-style', 'true');
  document.head.appendChild(styleSheet);
}

export default SoundToggle;
