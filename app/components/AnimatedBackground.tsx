'use client';

import { motion } from 'framer-motion';

export default function AnimatedBackground() {
  // Define blob configurations with random positions and colors
  const blobs = [
    {
      id: 1,
      size: 400,
      color: 'rgba(255, 45, 149, 0.3)', // Neon pink
      initialX: '10%',
      initialY: '20%',
      duration: 20,
    },
    {
      id: 2,
      size: 500,
      color: 'rgba(157, 78, 221, 0.25)', // Purple
      initialX: '70%',
      initialY: '10%',
      duration: 25,
    },
    {
      id: 3,
      size: 350,
      color: 'rgba(0, 212, 255, 0.2)', // Neon blue
      initialX: '50%',
      initialY: '60%',
      duration: 22,
    },
    {
      id: 4,
      size: 450,
      color: 'rgba(255, 45, 149, 0.2)', // Neon pink
      initialX: '20%',
      initialY: '70%',
      duration: 28,
    },
    {
      id: 5,
      size: 300,
      color: 'rgba(157, 78, 221, 0.3)', // Purple
      initialX: '80%',
      initialY: '50%',
      duration: 18,
    },
    {
      id: 6,
      size: 380,
      color: 'rgba(0, 212, 255, 0.15)', // Neon blue
      initialX: '40%',
      initialY: '30%',
      duration: 24,
    },
  ];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {blobs.map((blob) => (
        <motion.div
          key={blob.id}
          className="absolute rounded-full"
          style={{
            width: blob.size,
            height: blob.size,
            left: blob.initialX,
            top: blob.initialY,
            background: `radial-gradient(circle, ${blob.color} 0%, transparent 70%)`,
            filter: 'blur(60px)',
          }}
          animate={{
            x: [0, 100, -50, 50, 0],
            y: [0, -80, 100, -60, 0],
            scale: [1, 1.2, 0.9, 1.1, 1],
          }}
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
