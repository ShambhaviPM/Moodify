import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Particles from './components/Particles';
import SoundToggle from './components/SoundToggle';
import soundManager from './utils/sounds';
import { API_BASE_URL } from './config';
import './styles/cyberpunk.css';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('error');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSignup = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage('');
    soundManager.playClick();

    if (!username || !email || !password) {
      soundManager.playError();
      setMessage('Please fill in all fields');
      setMessageType('error');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        soundManager.playSuccess();
        setMessage('ACCOUNT CREATED! Redirecting...');
        setMessageType('success');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        soundManager.playError();
        setMessage(data.message || 'Registration failed');
        setMessageType('error');
        setIsSubmitting(false);
      }
    } catch (error) {
      soundManager.playError();
      setMessage('Server error. Please try again.');
      setMessageType('error');
      setIsSubmitting(false);
    }
  };

  return (
    <div style={styles.container}>
      <Particles count={20} />
      <div style={styles.scanlines} />

      {/* Gradient Orbs */}
      <div style={styles.gradientOrb1} />
      <div style={styles.gradientOrb2} />

      {/* Corner Decorations */}
      <div style={styles.cornerTL} />
      <div style={styles.cornerBR} />

      {/* Signup Card */}
      <div style={{
        ...styles.card,
        opacity: mounted ? 1 : 0,
        transform: mounted ? 'translateY(0)' : 'translateY(20px)'
      }}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerLine} />
          <h2 style={styles.title}>
            <span style={styles.titleBracket}>[</span>
            NEW USER REGISTRATION
            <span style={styles.titleBracket}>]</span>
          </h2>
          <div style={styles.headerLine} />
        </div>

        <p style={styles.subtitle}>CREATE YOUR IDENTITY</p>

        <form onSubmit={handleSignup} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              <span style={styles.labelIcon}>▸</span> USERNAME
            </label>
            <input
              type="text"
              style={styles.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onFocus={(e) => {
                e.target.style.borderColor = '#a855f7';
                e.target.style.boxShadow = '0 0 15px rgba(168, 85, 247, 0.3)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(168, 85, 247, 0.3)';
                e.target.style.boxShadow = 'none';
              }}
              placeholder="Choose a username"
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>
              <span style={styles.labelIcon}>▸</span> EMAIL
            </label>
            <input
              type="email"
              style={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={(e) => {
                e.target.style.borderColor = '#a855f7';
                e.target.style.boxShadow = '0 0 15px rgba(168, 85, 247, 0.3)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(168, 85, 247, 0.3)';
                e.target.style.boxShadow = 'none';
              }}
              placeholder="user@example.com"
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>
              <span style={styles.labelIcon}>▸</span> PASSWORD
            </label>
            <input
              type="password"
              style={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={(e) => {
                e.target.style.borderColor = '#a855f7';
                e.target.style.boxShadow = '0 0 15px rgba(168, 85, 247, 0.3)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(168, 85, 247, 0.3)';
                e.target.style.boxShadow = 'none';
              }}
              placeholder="Min. 6 characters"
              required
            />
          </div>

          {message && (
            <div style={{
              ...styles.message,
              background: messageType === 'success' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
              borderColor: messageType === 'success' ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)',
              color: messageType === 'success' ? '#22c55e' : '#f87171',
            }}>
              <span style={styles.messageIcon}>{messageType === 'success' ? '✓' : '⚠'}</span> {message}
            </div>
          )}

          <button
            type="submit"
            style={{
              ...styles.button,
              opacity: isSubmitting ? 0.7 : 1,
            }}
            disabled={isSubmitting}
            onMouseEnter={(e) => {
              if (!isSubmitting) {
                soundManager.playHover();
                e.target.style.boxShadow = '0 0 30px rgba(168, 85, 247, 0.5)';
                e.target.style.transform = 'translateY(-2px)';
              }
            }}
            onMouseLeave={(e) => {
              e.target.style.boxShadow = 'none';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            {isSubmitting ? (
              <span style={styles.loadingText}>PROCESSING...</span>
            ) : (
              <>
                <span>CREATE ACCOUNT</span>
                <span style={styles.buttonArrow}>→</span>
              </>
            )}
          </button>
        </form>

        <div style={styles.footer}>
          <span style={styles.footerText}>ALREADY REGISTERED?</span>
          <Link
            to="/login"
            style={styles.link}
            onMouseEnter={() => soundManager.playHover()}
          >
            LOGIN
          </Link>
        </div>

        {/* Decorative Elements */}
        <div style={styles.cardCornerTL} />
        <div style={styles.cardCornerBR} />
      </div>

      <SoundToggle />
    </div>
  );
};

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
    position: 'absolute',
    bottom: '20%',
    right: '10%',
    width: '400px',
    height: '400px',
    background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
    borderRadius: '50%',
    filter: 'blur(60px)',
    pointerEvents: 'none',
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
  card: {
    width: '100%',
    maxWidth: '420px',
    padding: '2.5rem',
    background: 'rgba(15, 23, 42, 0.9)',
    borderRadius: '16px',
    border: '1px solid rgba(168, 85, 247, 0.3)',
    backdropFilter: 'blur(20px)',
    position: 'relative',
    zIndex: 5,
    transition: 'all 0.5s ease',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '0.5rem',
  },
  headerLine: {
    flex: 1,
    height: '1px',
    background: 'linear-gradient(90deg, transparent, rgba(168, 85, 247, 0.5), transparent)',
  },
  title: {
    fontSize: '0.9rem',
    fontWeight: '700',
    color: '#a855f7',
    textAlign: 'center',
    letterSpacing: '0.1em',
    whiteSpace: 'nowrap',
  },
  titleBracket: {
    color: '#3b82f6',
    fontWeight: '300',
  },
  subtitle: {
    textAlign: 'center',
    fontSize: '0.7rem',
    color: '#64748b',
    letterSpacing: '0.2em',
    marginBottom: '2rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  label: {
    fontSize: '0.75rem',
    color: '#94a3b8',
    letterSpacing: '0.1em',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  labelIcon: {
    color: '#a855f7',
    fontSize: '0.6rem',
  },
  input: {
    width: '100%',
    padding: '1rem',
    background: 'rgba(30, 41, 59, 0.8)',
    border: '1px solid rgba(168, 85, 247, 0.3)',
    borderRadius: '8px',
    color: 'white',
    fontSize: '1rem',
    fontFamily: 'inherit',
    transition: 'all 0.3s ease',
    outline: 'none',
  },
  message: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    fontSize: '0.85rem',
    border: '1px solid',
  },
  messageIcon: {
    fontSize: '1rem',
  },
  button: {
    width: '100%',
    padding: '1rem',
    background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%)',
    border: '2px solid #a855f7',
    borderRadius: '8px',
    color: 'white',
    fontSize: '0.9rem',
    fontWeight: '600',
    fontFamily: "'Orbitron', sans-serif",
    letterSpacing: '0.15em',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.75rem',
    transition: 'all 0.3s ease',
    marginTop: '0.5rem',
  },
  buttonArrow: {
    transition: 'transform 0.3s ease',
  },
  loadingText: {
    animation: 'pulse 1s ease-in-out infinite',
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.75rem',
    marginTop: '2rem',
    paddingTop: '1.5rem',
    borderTop: '1px solid rgba(168, 85, 247, 0.2)',
  },
  footerText: {
    fontSize: '0.75rem',
    color: '#64748b',
    letterSpacing: '0.1em',
  },
  link: {
    fontSize: '0.75rem',
    color: '#a855f7',
    textDecoration: 'none',
    letterSpacing: '0.1em',
    fontWeight: '600',
    transition: 'color 0.3s ease',
  },
  cardCornerTL: {
    position: 'absolute',
    top: '-1px',
    left: '-1px',
    width: '20px',
    height: '20px',
    borderTop: '2px solid #a855f7',
    borderLeft: '2px solid #a855f7',
    borderTopLeftRadius: '16px',
  },
  cardCornerBR: {
    position: 'absolute',
    bottom: '-1px',
    right: '-1px',
    width: '20px',
    height: '20px',
    borderBottom: '2px solid #3b82f6',
    borderRight: '2px solid #3b82f6',
    borderBottomRightRadius: '16px',
  },
};

export default Signup;
