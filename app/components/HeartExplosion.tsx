'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Heart {
  id: number;
  emoji: string;
  x: number;
  y: number;
  rotation: number;
  scale: number;
}

interface HeartExplosionProps {
  onComplete?: () => void;
}

export default function HeartExplosion({ onComplete }: HeartExplosionProps) {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    // Generate random hearts
    const heartEmojis = ['❤️', '💕', '💖', '💗', '💓'];
    const generatedHearts = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      emoji: heartEmojis[Math.floor(Math.random() * heartEmojis.length)],
      x: (Math.random() - 0.5) * 200, // -100 to 100
      y: (Math.random() - 0.5) * 200, // -100 to 100
      rotation: Math.random() * 720 - 360, // -360 to 360 degrees
      scale: Math.random() * 0.5 + 0.8, // 0.8 to 1.3
    }));

    setHearts(generatedHearts);

    // Call onComplete after animation duration
    const timer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 1500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible" style={{ zIndex: 100 }}>
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-2xl"
          style={{
            left: '50%',
            top: '50%',
            x: '-50%',
            y: '-50%',
          }}
          initial={{
            x: 0,
            y: 0,
            scale: 0.5,
            opacity: 1,
            rotate: 0,
          }}
          animate={{
            x: heart.x,
            y: heart.y,
            scale: [0.5, heart.scale * 1.2, heart.scale * 0.8],
            opacity: [1, 1, 0.8, 0],
            rotate: heart.rotation,
          }}
          transition={{
            duration: 1.2,
            ease: 'easeOut',
            times: [0, 0.3, 0.7, 1],
          }}
        >
          {heart.emoji}
        </motion.div>
      ))}
    </div>
  );
}
