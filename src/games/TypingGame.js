import React, { useState, useEffect, useRef, useCallback } from 'react';
import GameWrapper from './GameWrapper';
import { typingWords } from './game-data';
import soundManager from '../utils/sounds';
import { useGameState } from '../hooks/useGameState';

const TypingGame = () => {
  const activity = localStorage.getItem('selectedActivity') || 'TECH';
  const { addXP } = useGameState();
  const inputRef = useRef(null);

  const getWords = useCallback(() => {
    const pool = typingWords[activity] || typingWords['TECH'];
    return [...pool].sort(() => Math.random() - 0.5);
  }, [activity]);

  const [words, setWords] = useState(getWords);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [input, setInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [correctWords, setCorrectWords] = useState(0);
  const [totalTyped, setTotalTyped] = useState(0);
  const [totalChars, setTotalChars] = useState(0);
  const [xpAwarded, setXpAwarded] = useState(false);

  // Timer
  useEffect(() => {
    if (!gameStarted || gameComplete) return;
    if (timeLeft <= 0) {
      setGameComplete(true);
      if (!xpAwarded) {
        const wpm = correctWords;
        addXP('COMPLETE_GAME', 25);
        if (wpm > 50) addXP('GAME_BONUS', 15);
        setXpAwarded(true);
        soundManager.playLevelUp();
      }
      return;
    }
    const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, gameStarted, gameComplete, correctWords, addXP, xpAwarded]);

  // Focus input
  useEffect(() => {
    if (inputRef.current && !gameComplete) inputRef.current.focus();
  }, [gameComplete]);

  const handleInput = (e) => {
    const value = e.target.value;
    if (!gameStarted) setGameStarted(true);

    if (value.endsWith(' ') || value.endsWith('\n')) {
      const typed = value.trim();

      // Ignore empty submissions
      if (!typed) {
        setInput('');
        return;
      }

      setTotalTyped(t => t + 1);
      setTotalChars(t => t + typed.length);

      if (typed.toLowerCase() === words[currentIndex].toLowerCase()) {
        soundManager.playSuccess();
        setCorrectWords(c => c + 1);
      } else {
        soundManager.playError();
      }

      setCurrentIndex(i => {
        const next = i + 1;
        if (next >= words.length) {
          setWords(getWords());
          return 0;
        }
        return next;
      });
      setInput('');

      // Refocus input after clearing
      if (inputRef.current) {
        inputRef.current.focus();
      }
    } else {
      setInput(value);
    }
  };

  const handlePlayAgain = () => {
    setWords(getWords());
    setCurrentIndex(0);
    setInput('');
    setTimeLeft(60);
    setGameStarted(false);
    setGameComplete(false);
    setCorrectWords(0);
    setTotalTyped(0);
    setTotalChars(0);
    setXpAwarded(false);
  };

  const accuracy = totalTyped > 0 ? Math.round((correctWords / totalTyped) * 100) : 100;
  const wpm = correctWords; // Since it's a 60-second round, words = WPM

  const stats = [
    { label: 'WPM', value: wpm },
    { label: 'ACCURACY', value: `${accuracy}%` },
    { label: 'WORDS', value: `${correctWords}/${totalTyped}` },
    { label: 'XP EARNED', value: `+${25 + (wpm > 50 ? 15 : 0)}` },
  ];

  const currentWord = words[currentIndex];
  const upcomingWords = words.slice(currentIndex + 1, currentIndex + 6);

  return (
    <GameWrapper title="SPEED TYPER" gameComplete={gameComplete} stats={stats} onPlayAgain={handlePlayAgain}>
      <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
        <div style={styles.gameHeader}>
          <span style={styles.stat}>WPM: {correctWords}</span>
          <span style={{
            ...styles.stat,
            color: timeLeft <= 10 ? '#ef4444' : '#a855f7',
          }}>
            ⏱ {timeLeft}s
          </span>
          <span style={styles.stat}>ACCURACY: {accuracy}%</span>
        </div>

        {/* Timer bar */}
        <div style={styles.timerBar}>
          <div style={{ ...styles.timerFill, width: `${(timeLeft / 60) * 100}%` }} />
        </div>

        {/* Current word display */}
        <div style={styles.wordDisplay}>
          <div style={styles.upcomingRow}>
            {upcomingWords.map((w, i) => (
              <span key={i} style={{ ...styles.upcomingWord, opacity: 1 - (i * 0.15) }}>{w}</span>
            ))}
          </div>
          <div style={styles.currentWordContainer}>
            <span style={styles.currentWord}>
              {currentWord.split('').map((char, i) => (
                <span key={i} style={{
                  color: i < input.length
                    ? (input[i] === char ? '#22c55e' : '#ef4444')
                    : '#e2e8f0',
                }}>
                  {char}
                </span>
              ))}
            </span>
          </div>
        </div>

        {/* Input */}
        <input
          ref={inputRef}
          value={input}
          onChange={handleInput}
          disabled={gameComplete}
          placeholder={gameStarted ? '' : 'Start typing...'}
          style={styles.input}
          autoComplete="off"
          spellCheck="false"
        />

        {!gameStarted && (
          <p style={styles.hint}>Type the word and press SPACE or ENTER to submit</p>
        )}
        {gameStarted && (
          <p style={styles.hint}>⌨️ Keep typing! Time: {timeLeft}s remaining</p>
        )}
      </div>
    </GameWrapper>
  );
};

const styles = {
  gameHeader: {
    display: 'flex', justifyContent: 'center', gap: '1.5rem',
    marginBottom: '1rem', flexWrap: 'wrap',
  },
  stat: {
    fontSize: '0.75rem', color: '#a855f7', letterSpacing: '0.1em',
    padding: '0.4rem 0.75rem',
    background: 'rgba(168, 85, 247, 0.1)',
    border: '1px solid rgba(168, 85, 247, 0.2)',
    borderRadius: '6px',
  },
  timerBar: {
    width: '100%', height: '4px',
    background: 'rgba(168, 85, 247, 0.15)', borderRadius: '2px',
    marginBottom: '2rem', overflow: 'hidden',
  },
  timerFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #a855f7, #3b82f6)',
    transition: 'width 1s linear', borderRadius: '2px',
  },
  wordDisplay: {
    padding: '2rem',
    background: 'rgba(30, 41, 59, 0.6)',
    border: '1px solid rgba(168, 85, 247, 0.2)',
    borderRadius: '16px', marginBottom: '1.5rem',
  },
  upcomingRow: {
    display: 'flex', justifyContent: 'center', gap: '1rem',
    marginBottom: '1.5rem', flexWrap: 'wrap',
  },
  upcomingWord: {
    fontSize: '0.8rem', color: '#64748b',
    fontFamily: "'Courier New', monospace",
  },
  currentWordContainer: {
    padding: '1rem',
    background: 'rgba(168, 85, 247, 0.05)',
    borderRadius: '8px',
  },
  currentWord: {
    fontSize: '2rem', fontWeight: '700',
    fontFamily: "'Courier New', monospace",
    letterSpacing: '0.15em',
  },
  input: {
    width: '100%', maxWidth: '400px',
    padding: '1rem 1.5rem',
    background: 'rgba(30, 41, 59, 0.8)',
    border: '2px solid rgba(168, 85, 247, 0.3)',
    borderRadius: '12px',
    color: 'white', fontSize: '1.2rem',
    fontFamily: "'Courier New', monospace",
    textAlign: 'center', outline: 'none',
    letterSpacing: '0.1em',
    transition: 'border-color 0.3s ease',
  },
  hint: {
    marginTop: '1rem', fontSize: '0.7rem',
    color: '#64748b', letterSpacing: '0.1em',
  },
};

export default TypingGame;
