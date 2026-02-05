import React from 'react';
import '../styles/cyberpunk.css';

const XPBar = ({ levelInfo, compact = false }) => {
  if (!levelInfo) return null;

  const {
    level,
    title,
    color,
    xp,
    xpInCurrentLevel,
    xpForNextLevel,
    progress,
    nextTitle,
  } = levelInfo;

  if (compact) {
    return (
      <div style={styles.compactContainer}>
        <div style={styles.compactLevel}>
          <span style={{ ...styles.levelNumber, color }}>LV.{level}</span>
          <span style={styles.levelTitle}>{title}</span>
        </div>
        <div style={styles.compactBarTrack}>
          <div
            style={{
              ...styles.compactBarFill,
              width: `${progress}%`,
              background: `linear-gradient(90deg, ${color}, #3b82f6)`,
            }}
          />
        </div>
        <span style={styles.compactXP}>{xp} XP</span>
      </div>
    );
  }

  return (
    <div className="xp-bar-container" style={styles.container}>
      <div style={styles.header}>
        <div style={styles.levelInfo}>
          <span style={{ ...styles.levelBadge, borderColor: color, color }}>
            LEVEL {level}
          </span>
          <span style={{ ...styles.title, color }}>{title}</span>
        </div>
        <span style={styles.xpText}>{xp} XP</span>
      </div>

      <div style={styles.barTrack}>
        <div
          style={{
            ...styles.barFill,
            width: `${progress}%`,
            background: `linear-gradient(90deg, ${color}, #3b82f6)`,
          }}
        >
          <div style={styles.shimmer} />
        </div>
      </div>

      <div style={styles.footer}>
        <span style={styles.progressText}>
          {xpInCurrentLevel} / {xpForNextLevel || 'MAX'}
        </span>
        {nextTitle !== 'Max Level' && (
          <span style={styles.nextLevel}>Next: {nextTitle}</span>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    background: 'rgba(15, 23, 42, 0.9)',
    border: '1px solid rgba(168, 85, 247, 0.3)',
    borderRadius: '16px',
    padding: '1rem 1.25rem',
    backdropFilter: 'blur(10px)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.75rem',
  },
  levelInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  levelBadge: {
    fontFamily: "'Orbitron', sans-serif",
    fontSize: '0.7rem',
    fontWeight: '700',
    padding: '0.25rem 0.5rem',
    border: '1px solid',
    borderRadius: '4px',
    letterSpacing: '0.05em',
  },
  title: {
    fontFamily: "'Orbitron', sans-serif",
    fontSize: '0.85rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
  },
  xpText: {
    fontFamily: "'Orbitron', sans-serif",
    fontSize: '0.9rem',
    fontWeight: '700',
    color: '#a855f7',
  },
  barTrack: {
    height: '10px',
    background: 'rgba(30, 41, 59, 0.8)',
    borderRadius: '5px',
    overflow: 'hidden',
    position: 'relative',
  },
  barFill: {
    height: '100%',
    borderRadius: '5px',
    transition: 'width 0.5s ease',
    position: 'relative',
    overflow: 'hidden',
  },
  shimmer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
    animation: 'xp-shimmer 2s infinite',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '0.5rem',
    fontSize: '0.7rem',
    color: '#64748b',
    fontFamily: "'Orbitron', sans-serif",
  },
  progressText: {
    letterSpacing: '0.05em',
  },
  nextLevel: {
    color: '#9ca3af',
    letterSpacing: '0.05em',
  },
  // Compact styles
  compactContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.5rem 1rem',
    background: 'rgba(15, 23, 42, 0.8)',
    borderRadius: '20px',
    border: '1px solid rgba(168, 85, 247, 0.3)',
  },
  compactLevel: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  levelNumber: {
    fontFamily: "'Orbitron', sans-serif",
    fontSize: '0.75rem',
    fontWeight: '700',
  },
  levelTitle: {
    fontFamily: "'Orbitron', sans-serif",
    fontSize: '0.65rem',
    color: '#9ca3af',
    textTransform: 'uppercase',
  },
  compactBarTrack: {
    width: '80px',
    height: '6px',
    background: 'rgba(30, 41, 59, 0.8)',
    borderRadius: '3px',
    overflow: 'hidden',
  },
  compactBarFill: {
    height: '100%',
    borderRadius: '3px',
    transition: 'width 0.5s ease',
  },
  compactXP: {
    fontFamily: "'Orbitron', sans-serif",
    fontSize: '0.7rem',
    color: '#a855f7',
    fontWeight: '600',
  },
};

export default XPBar;
