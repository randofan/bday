import AnimatedBackground from './components/AnimatedBackground';
import Fireflies from './components/Fireflies';
import FloatingHearts from './components/FloatingHearts';
import CommentFeed from './components/CommentFeed';

export default function Home() {
  return (
    <div className="relative min-h-screen p-6 md:p-8">
      <AnimatedBackground />
      <div className="grid-overlay"></div>
      <div className="scanlines"></div>
      <Fireflies />
      <FloatingHearts />
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              emily's bday bash
            </h1>
            <p className="text-white/70 text-lg">October 5th, 2025</p>

            {/* Host Info */}
            <div className="flex items-center gap-3 mt-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold">
                DS
              </div>
              <div>
                <p className="text-white/60 text-sm">Hosted by</p>
                <p className="text-white font-medium">David Song</p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 mt-4 text-white/70">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>My heart</span>
            </div>
          </div>

          {/* Neon Logo */}
          <div className="neon-logo flex-shrink-0">
            <div className="relative w-48 h-48">
              {/* Heart SVG with neon effect */}
              <svg viewBox="0 0 200 200" className="w-full h-full">
                <defs>
                  <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{stopColor: '#ff2d95', stopOpacity: 1}} />
                    <stop offset="50%" style={{stopColor: '#9d4edd', stopOpacity: 1}} />
                    <stop offset="100%" style={{stopColor: '#ff2d95', stopOpacity: 1}} />
                  </linearGradient>
                </defs>

                {/* Heart shape */}
                <path
                  d="M100,170 C100,170 30,120 30,80 C30,60 45,45 65,45 C80,45 90,55 100,70 C110,55 120,45 135,45 C155,45 170,60 170,80 C170,120 100,170 100,170 Z"
                  fill="none"
                  stroke="url(#neonGradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Inner heart glow */}
                <path
                  d="M100,160 C100,160 40,115 40,80 C40,65 50,55 65,55 C80,55 90,65 100,80 C110,65 120,55 135,55 C150,55 160,65 160,80 C160,115 100,160 100,160 Z"
                  fill="url(#neonGradient)"
                  opacity="0.3"
                />

                {/* Text */}
                <text x="100" y="95" textAnchor="middle" fill="url(#neonGradient)" fontSize="20" fontWeight="bold" fontFamily="Arial">
                  emily's
                </text>
                <text x="100" y="115" textAnchor="middle" fill="url(#neonGradient)" fontSize="20" fontWeight="bold" fontFamily="Arial">
                  bday bash
                </text>
              </svg>
            </div>
          </div>
        </div>

        {/* Comment Feed */}
        <CommentFeed />
      </div>
    </div>
  );
}
