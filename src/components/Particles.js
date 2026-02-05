import React, { useMemo } from 'react';

const Particles = ({ count = 20 }) => {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 15}s`,
      animationDuration: `${15 + Math.random() * 10}s`,
      size: Math.random() > 0.5 ? 4 : 2,
      color: Math.random() > 0.5 ? '#a855f7' : '#3b82f6',
    }));
  }, [count]);

  return (
    <div style={styles.container}>
      {particles.map((particle) => (
        <div
          key={particle.id}
          style={{
            ...styles.particle,
            left: particle.left,
            width: particle.size,
            height: particle.size,
            background: particle.color,
            animationDelay: particle.animationDelay,
            animationDuration: particle.animationDuration,
          }}
        />
      ))}
    </div>
  );
};

const styles = {
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    overflow: 'hidden',
    zIndex: 1,
  },
  particle: {
    position: 'absolute',
    borderRadius: '50%',
    opacity: 0.6,
    animation: 'particleFloat 15s infinite linear',
  },
};

// Add keyframe animation
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes particleFloat {
    0% {
      transform: translateY(100vh) translateX(0) rotate(0deg);
      opacity: 0;
    }
    10% { opacity: 0.6; }
    90% { opacity: 0.6; }
    100% {
      transform: translateY(-100vh) translateX(100px) rotate(360deg);
      opacity: 0;
    }
  }
`;
if (!document.querySelector('[data-particles-style]')) {
  styleSheet.setAttribute('data-particles-style', 'true');
  document.head.appendChild(styleSheet);
}

export default Particles;
