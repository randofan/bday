'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Heart {
  id: number;
  x: number;
  color: string;
  size: number;
  duration: number;
  delay: number;
  sway: number;
}

const pastelColors = [
  '#FFB3D9', // Pastel pink
  '#E0BBE4', // Pastel lavender
  '#FFCCE5', // Soft pink
  '#D4A5A5', // Dusty rose
  '#FFABAB', // Peach pink
  '#C7B8EA', // Light purple
  '#FFC8DD', // Cotton candy pink
  '#E4C1F9', // Lavender
];

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    let heartId = 0;

    const generateHeart = () => {
      const newHeart: Heart = {
        id: heartId++,
        x: Math.random() * 100, // Random x position (0-100%)
        color: pastelColors[Math.floor(Math.random() * pastelColors.length)],
        size: Math.random() * 20 + 15, // 15-35px
        duration: Math.random() * 3 + 4, // 4-7 seconds
        delay: 0,
        sway: Math.random() * 60 - 30, // -30 to 30px horizontal sway
      };

      setHearts((prev) => [...prev, newHeart]);

      // Remove heart after animation completes
      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
      }, (newHeart.duration + 1) * 1000);
    };

    // Generate hearts at intervals
    const interval = setInterval(generateHeart, 800); // New heart every 800ms

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[4]">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute"
          style={{
            left: `${heart.x}%`,
            bottom: '-50px',
            width: heart.size,
            height: heart.size,
          }}
          initial={{
            y: 0,
            x: 0,
            opacity: 0,
            rotate: 0,
          }}
          animate={{
            y: -window.innerHeight - 100,
            x: [0, heart.sway, -heart.sway / 2, heart.sway / 2, 0],
            opacity: [0, 0.8, 0.8, 0.4, 0],
            rotate: [0, 10, -10, 5, 0],
          }}
          transition={{
            duration: heart.duration,
            ease: 'easeInOut',
            times: [0, 0.1, 0.5, 0.8, 1],
          }}
        >
          {/* SVG Heart Shape */}
          <svg viewBox="0 0 24 24" fill={heart.color} style={{
            filter: `drop-shadow(0 0 4px ${heart.color})`,
            width: '100%',
            height: '100%',
          }}>
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
