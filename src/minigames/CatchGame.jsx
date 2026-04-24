import React, { useEffect, useRef, useState, useCallback } from 'react';
import styles from './CatchGame.module.css';
import LuffyHatSvg from '../components/LuffyHatSvg';

const DIFFICULTY_CONFIG = {
  easy: {
    maxMisses: 3,
    defaultTime: 60,
    target: 8,
    spawnInterval: 1200,
    fallDurationMin: 3500,
    fallDurationMax: 5500,
  },
  hard: {
    maxMisses: 2,
    defaultTime: 45,
    target: 10,
    spawnInterval: 900,
    fallDurationMin: 2000,
    fallDurationMax: 3500,
  },
};

let nextId = 0;

export default function CatchGame({ difficulty = 'easy', onComplete, timeLimit = null }) {
  const cfg = DIFFICULTY_CONFIG[difficulty] || DIFFICULTY_CONFIG.easy;
  const maxMisses = cfg.maxMisses;
  const target = cfg.target;
  const totalTime = timeLimit ?? cfg.defaultTime;

  // Hat position as percent (0–100), adjusted so hat stays within bounds
  const [hatX, setHatX] = useState(50);
  const [meats, setMeats] = useState([]);
  const [caught, setCaught] = useState(0);
  const [missed, setMissed] = useState(0);
  const [timeLeft, setTimeLeft] = useState(totalTime);
  const [status, setStatus] = useState('playing'); // 'playing' | 'won' | 'lost'
  const [shakeMiss, setShakeMiss] = useState(false);
  const [flashCaught, setFlashCaught] = useState(false);
  const [stars, setStars] = useState(0);

  const wrapperRef = useRef(null);
  const meatsRef = useRef([]);
  const hatXRef = useRef(50);
  const caughtRef = useRef(0);
  const missedRef = useRef(0);
  const statusRef = useRef('playing');
  const rafRef = useRef(null);
  const lastFrameTime = useRef(null);
  const spawnTimerRef = useRef(null);
  const countdownRef = useRef(null);
  const touchStartX = useRef(null);
  const gameAreaRef = useRef(null);

  // Sync hatX state → ref
  const updateHatX = useCallback((val) => {
    const clamped = Math.min(Math.max(val, 3), 93); // keep hat mostly on screen
    hatXRef.current = clamped;
    setHatX(clamped);
  }, []);

  const computeStars = useCallback((misses, timeleft) => {
    if (misses === 0) return 3;
    if (misses === 1) return 2;
    return 1;
  }, []);

  const endGame = useCallback(
    (outcome, currentMisses, currentTimeLeft) => {
      if (statusRef.current !== 'playing') return;
      statusRef.current = outcome;
      setStatus(outcome);

      // Stop loops
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (spawnTimerRef.current) clearInterval(spawnTimerRef.current);
      if (countdownRef.current) clearInterval(countdownRef.current);

      const earnedStars = outcome === 'won' ? computeStars(currentMisses, currentTimeLeft) : 1;
      setStars(earnedStars);

      const berries =
        outcome === 'won'
          ? Math.max(50, (maxMisses + 1 - currentMisses) * 100 + currentTimeLeft * 2)
          : 0;

      setTimeout(() => {
        if (onComplete) onComplete(earnedStars, berries);
      }, 1200);
    },
    [computeStars, maxMisses, onComplete]
  );

  // requestAnimationFrame loop — moves meats downward
  const runFrame = useCallback(
    (timestamp) => {
      if (statusRef.current !== 'playing') return;

      if (!lastFrameTime.current) lastFrameTime.current = timestamp;
      const delta = timestamp - lastFrameTime.current; // ms since last frame
      lastFrameTime.current = timestamp;

      const gameArea = gameAreaRef.current;
      const areaHeight = gameArea ? gameArea.clientHeight : 600;
      const areaWidth = gameArea ? gameArea.clientWidth : 400;

      let newMissed = missedRef.current;
      let newCaught = caughtRef.current;
      let missOccurred = false;
      let catchOccurred = false;

      const updated = [];

      for (const meat of meatsRef.current) {
        // Convert percent-per-second to percent movement this frame
        // fallSpeed is stored as % of container height per second
        const dy = (meat.speedPct * delta) / 1000;
        const newY = meat.y + dy;

        // Check catch: meat is near bottom (y > 80%) and hat overlaps
        // Hat is at bottom: 60px from bottom. As percent: ~(1 - 60/areaHeight)*100
        const hatBottomPct = ((areaHeight - 60) / areaHeight) * 100;
        const meatCenterX = meat.x; // meat x is already %
        const hatCenterX = hatXRef.current + 5; // approx center (hat ~80px wide, ~10% at 800px)

        // Convert 50px overlap to percent
        const overlapPct = (50 / areaWidth) * 100;

        if (newY >= hatBottomPct - 5 && newY < 105) {
          const dist = Math.abs(meatCenterX - hatCenterX);
          if (dist < overlapPct) {
            // CAUGHT
            newCaught += 1;
            catchOccurred = true;
            continue; // remove this meat
          }
        }

        if (newY >= 105) {
          // MISSED — fell past bottom
          newMissed += 1;
          missOccurred = true;
          continue; // remove this meat
        }

        updated.push({ ...meat, y: newY });
      }

      meatsRef.current = updated;
      setMeats([...updated]);

      if (catchOccurred) {
        caughtRef.current = newCaught;
        setCaught(newCaught);
        setFlashCaught(true);
        setTimeout(() => setFlashCaught(false), 300);
      }

      if (missOccurred) {
        missedRef.current = newMissed;
        setMissed(newMissed);
        setShakeMiss(true);
        setTimeout(() => setShakeMiss(false), 400);
      }

      // Win/Lose checks
      if (newCaught >= target) {
        endGame('won', newMissed, null); // timeLeft read from state won't be current; use ref below
        return;
      }
      if (newMissed > maxMisses) {
        endGame('lost', newMissed, 0);
        return;
      }

      rafRef.current = requestAnimationFrame(runFrame);
    },
    [endGame, maxMisses, target]
  );

  // Spawn a meat item
  const spawnMeat = useCallback(() => {
    if (statusRef.current !== 'playing') return;
    const x = 10 + Math.random() * 80; // 10%–90%
    const duration = cfg.fallDurationMin + Math.random() * (cfg.fallDurationMax - cfg.fallDurationMin);
    // Convert duration to speed: travel 100% height in `duration` ms → speed = 100 / (duration/1000) %/s
    const speedPct = 100 / (duration / 1000);
    const id = nextId++;
    const newMeat = { id, x, y: -5, speedPct };
    meatsRef.current = [...meatsRef.current, newMeat];
    // Don't setMeats here — RAF loop will sync
  }, [cfg.fallDurationMax, cfg.fallDurationMin]);

  // Mount effect: start loops
  useEffect(() => {
    statusRef.current = 'playing';
    wrapperRef.current?.focus();

    // Start RAF loop
    lastFrameTime.current = null;
    rafRef.current = requestAnimationFrame(runFrame);

    // Spawn first meat after 500ms, then on interval
    const initialTimer = setTimeout(() => {
      spawnMeat();
      spawnTimerRef.current = setInterval(spawnMeat, cfg.spawnInterval);
    }, 500);

    // Countdown
    countdownRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        const next = prev - 1;
        if (next <= 0) {
          clearInterval(countdownRef.current);
          // Lose by timeout if not already won
          if (statusRef.current === 'playing') {
            endGame('lost', missedRef.current, 0);
          }
        }
        return Math.max(0, next);
      });
    }, 1000);

    return () => {
      clearTimeout(initialTimer);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (spawnTimerRef.current) clearInterval(spawnTimerRef.current);
      if (countdownRef.current) clearInterval(countdownRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Win check also needs timeLeft ref — store it
  const timeLeftRef = useRef(totalTime);
  useEffect(() => {
    timeLeftRef.current = timeLeft;
  }, [timeLeft]);

  // Keyboard handler
  const handleKeyDown = useCallback(
    (e) => {
      if (status !== 'playing') return;
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        updateHatX(hatXRef.current - 8);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        updateHatX(hatXRef.current + 8);
      }
    },
    [status, updateHatX]
  );

  // Touch handlers
  const handleTouchStart = useCallback((e) => {
    if (e.touches.length > 0) {
      touchStartX.current = e.touches[0].clientX;
    }
  }, []);

  const handleTouchMove = useCallback(
    (e) => {
      if (status !== 'playing') return;
      if (e.touches.length > 0 && touchStartX.current !== null) {
        const wrapper = wrapperRef.current;
        if (!wrapper) return;
        const rect = wrapper.getBoundingClientRect();
        const touchX = e.touches[0].clientX;
        // Map raw touch X to percentage within wrapper
        const pct = ((touchX - rect.left) / rect.width) * 100;
        updateHatX(pct - 5); // center hat on finger
      }
    },
    [status, updateHatX]
  );

  const starsDisplay = '★'.repeat(stars) + '☆'.repeat(3 - stars);

  return (
    <div
      className={`${styles.wrapper} ${shakeMiss ? styles.feedbackMiss : ''} ${flashCaught ? styles.feedbackCaught : ''}`}
      ref={wrapperRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      {/* HUD */}
      <div className={styles.hud}>
        <div className={styles.timerBar}>⏱️ {timeLeft}s</div>
        <div className={styles.hudItem}>🍖 {caught}/{target}</div>
        <div className={styles.hudItem}>❌ {missed}/{maxMisses}</div>
      </div>

      {/* Game area */}
      <div className={styles.gameArea} ref={gameAreaRef}>
        {meats.map((m) => (
          <div
            key={m.id}
            className={styles.meat}
            style={{ left: m.x + '%', top: m.y + '%' }}
          >
            🍖
          </div>
        ))}
        <div className={styles.hat} style={{ left: hatX + '%' }}>
          <LuffyHatSvg size={88} />
        </div>
      </div>

      {/* Win/Lose Overlay */}
      {status !== 'playing' && (
        <div className={styles.overlay}>
          <div className={styles.overlayCard}>
            {status === 'won' ? (
              <>
                <div className={styles.overlayTitle}>Gomu Gomu!</div>
                <div className={styles.overlayEmoji}>🏴‍☠️</div>
                <div className={styles.overlayStars}>{starsDisplay}</div>
                <div className={styles.overlayMessage}>
                  Caught {caught} meat! {stars === 3 ? 'Perfect!' : ''}
                </div>
              </>
            ) : (
              <>
                <div className={styles.overlayTitle}>Oh no!</div>
                <div className={styles.overlayEmoji}>💀</div>
                <div className={styles.overlayMessage}>
                  {missed > maxMisses ? 'Too much food dropped!' : "Time's up!"}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
