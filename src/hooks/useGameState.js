import { useState, useEffect, useCallback } from 'react';

// XP rewards for different actions
const XP_REWARDS = {
  LOGIN: 10,
  SELECT_MOOD: 15,
  SELECT_ACTIVITY: 15,
  SELECT_THEME: 15,
  VIEW_RECOMMENDATION: 25,
  COMPLETE_FLOW: 50,
};

// Level thresholds and titles
const LEVELS = [
  { level: 1, minXP: 0, title: 'Rookie', color: '#9ca3af' },
  { level: 2, minXP: 100, title: 'Explorer', color: '#3b82f6' },
  { level: 3, minXP: 250, title: 'Seeker', color: '#a855f7' },
  { level: 4, minXP: 500, title: 'Master', color: '#ec4899' },
  { level: 5, minXP: 1000, title: 'Legend', color: '#f59e0b' },
];

// Get level info from XP
const getLevelInfo = (xp) => {
  let currentLevel = LEVELS[0];
  let nextLevel = LEVELS[1];

  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].minXP) {
      currentLevel = LEVELS[i];
      nextLevel = LEVELS[i + 1] || null;
      break;
    }
  }

  const xpInCurrentLevel = xp - currentLevel.minXP;
  const xpForNextLevel = nextLevel ? nextLevel.minXP - currentLevel.minXP : 0;
  const progress = nextLevel ? (xpInCurrentLevel / xpForNextLevel) * 100 : 100;

  return {
    level: currentLevel.level,
    title: currentLevel.title,
    color: currentLevel.color,
    xp,
    xpInCurrentLevel,
    xpForNextLevel,
    progress: Math.min(progress, 100),
    nextLevel: nextLevel?.level || null,
    nextTitle: nextLevel?.title || 'Max Level',
  };
};

export const useGameState = () => {
  const [xp, setXP] = useState(() => {
    const saved = localStorage.getItem('moodify_xp');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [notification, setNotification] = useState(null);
  const [levelUp, setLevelUp] = useState(null);

  // Save XP to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('moodify_xp', xp.toString());
  }, [xp]);

  // Add XP with notification
  const addXP = useCallback((action, customAmount = null) => {
    const amount = customAmount || XP_REWARDS[action] || 0;
    if (amount <= 0) return;

    const oldLevelInfo = getLevelInfo(xp);
    const newXP = xp + amount;
    const newLevelInfo = getLevelInfo(newXP);

    setXP(newXP);

    // Show XP notification
    setNotification({ amount, action });
    setTimeout(() => setNotification(null), 2500);

    // Check for level up
    if (newLevelInfo.level > oldLevelInfo.level) {
      setTimeout(() => {
        setLevelUp({
          level: newLevelInfo.level,
          title: newLevelInfo.title,
          color: newLevelInfo.color,
        });
        setTimeout(() => setLevelUp(null), 3000);
      }, 500);
    }
  }, [xp]);

  // Reset XP (for testing)
  const resetXP = useCallback(() => {
    setXP(0);
    localStorage.removeItem('moodify_xp');
  }, []);

  // Get current level info
  const levelInfo = getLevelInfo(xp);

  return {
    xp,
    levelInfo,
    notification,
    levelUp,
    addXP,
    resetXP,
    XP_REWARDS,
    LEVELS,
  };
};

export default useGameState;
