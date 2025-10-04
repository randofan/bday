'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface Firefly {
  id: number;
  size: number;
  initialX: number;
  initialY: number;
  duration: number;
  delay: number;
  opacity: number;
  color: string;
  animateX: number[];
  animateY: number[];
}

export default function Fireflies() {
  const [fireflies, setFireflies] = useState<Firefly[]>([]);

  useEffect(() => {
    // Generate random firefly configurations on client-side only
    const generatedFireflies = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      size: Math.random() * 3 + 2, // 2-5px
      initialX: Math.random() * 100, // 0-100%
      initialY: Math.random() * 100, // 0-100%
      duration: Math.random() * 10 + 15, // 15-25 seconds
      delay: Math.random() * 5, // 0-5 seconds delay
      opacity: Math.random() * 0.5 + 0.3, // 0.3-0.8
      color: ['#ff2d95', '#9d4edd', '#00d4ff'][Math.floor(Math.random() * 3)],
      animateX: [
        0,
        Math.random() * 200 - 100,
        Math.random() * 200 - 100,
        Math.random() * 200 - 100,
        0,
      ],
      animateY: [
        0,
        Math.random() * 200 - 100,
        Math.random() * 200 - 100,
        Math.random() * 200 - 100,
        0,
      ],
    }));

    setFireflies(generatedFireflies);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[5]">
      {fireflies.map((firefly) => (
        <motion.div
          key={firefly.id}
          className="absolute rounded-full"
          style={{
            width: firefly.size,
            height: firefly.size,
            left: `${firefly.initialX}%`,
            top: `${firefly.initialY}%`,
            backgroundColor: firefly.color,
            boxShadow: `
              0 0 ${firefly.size * 2}px ${firefly.color},
              0 0 ${firefly.size * 4}px ${firefly.color},
              0 0 ${firefly.size * 6}px ${firefly.color}
            `,
          }}
          animate={{
            x: firefly.animateX,
            y: firefly.animateY,
            opacity: [
              firefly.opacity,
              firefly.opacity * 0.3,
              firefly.opacity,
              firefly.opacity * 0.5,
              firefly.opacity,
            ],
            scale: [1, 1.5, 0.8, 1.3, 1],
          }}
          transition={{
            duration: firefly.duration,
            repeat: Infinity,
            delay: firefly.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
