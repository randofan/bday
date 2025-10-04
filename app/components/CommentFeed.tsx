'use client';

import { useState, useEffect } from 'react';
import HeartExplosion from './HeartExplosion';

interface Message {
  message: string | null;
  timestamp: string;
  locked: boolean;
}

interface MessagesData {
  messages: Message[];
}

export default function CommentFeed() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [reactingMessageIndex, setReactingMessageIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchMessages = () => {
      fetch('/api/messages')
        .then((res) => res.json())
        .then((data: MessagesData) => {
          setMessages(data.messages);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error loading messages:', error);
          setLoading(false);
        });
    };

    // Fetch messages initially
    fetchMessages();

    // Refresh messages every minute to check for new unlocks
    const interval = setInterval(fetchMessages, 60000);

    return () => clearInterval(interval);
  }, []);

  // Get relative time from timestamp
  const getRelativeTime = (timestamp: string): string => {
    if (!timestamp) return 'Just now';

    const messageDate = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - messageDate.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return '<1m';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return messageDate.toLocaleDateString();
  };

  // Format unlock date
  const getUnlockDate = (timestamp: string): string => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Count unlocked messages
  const unlockedCount = messages.filter(msg => !msg.locked).length;

  return (
    <div className="neon-border rounded-lg p-6">
      {/* Header with glowing orb */}
      <div className="flex items-center gap-4 mb-6">
        <div>
          <h2 className="text-white text-3xl font-bold">Activity</h2>
          <p className="text-white/60 text-sm mt-1">
            {unlockedCount} {unlockedCount === 1 ? 'update' : 'updates'}
            {messages.length > unlockedCount && (
              <span className="text-white/40"> • {messages.length - unlockedCount} locked</span>
            )}
          </p>
        </div>
        <div className="glowing-orb"></div>
      </div>

      {/* Comment Input */}
      <div className="flex items-start gap-3 mb-6 pb-6 border-b border-white/10">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold flex-shrink-0">
          DS
        </div>

        <div className="flex-1 flex items-center gap-3">
          <p
            className="flex-1 bg-transparent text-white/50 placeholder-white/40 text-lg focus:outline-none"
          >+ Add a comment</p>

          <div className="flex items-center gap-2">
            {/* GIF button */}
            <button className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded text-white font-semibold text-sm transition-colors">
              GIF
            </button>

            {/* Image upload button */}
            <button className="p-2 bg-white/10 hover:bg-white/20 rounded transition-colors">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Comments Feed */}
      {loading ? (
        <div className="text-white/50 text-center py-8">Loading messages...</div>
      ) : (
        <div className="space-y-6">
          {messages.map((msg, index) => {
            const unlocked = !msg.locked;

            return (
              <div key={index} className="flex items-start gap-3">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold flex-shrink-0">
                  DS
                </div>

                {/* Comment Content */}
                <div className="flex-1 relative">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-white font-semibold text-lg">David Song</span>
                      <span className="text-white/50 text-sm">
                        {unlocked ? getRelativeTime(msg.timestamp) : '🔒'}
                      </span>
                    </div>

                    {/* Menu button */}
                    {unlocked && (
                      <button className="text-white/50 hover:text-white/70 p-1">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <circle cx="12" cy="5" r="2" />
                          <circle cx="12" cy="12" r="2" />
                          <circle cx="12" cy="19" r="2" />
                        </svg>
                      </button>
                    )}
                  </div>

                  {/* Message content wrapper */}
                  <div className={unlocked ? '' : 'message-locked'}>
                    {/* Comment text */}
                    <p className="text-white/90 mb-3 whitespace-pre-wrap leading-relaxed">
                      {unlocked ? msg.message : 'No peeking allowed! No peeking allowed! No peeking allowed! No peeking allowed! No peeking allowed! No peeking allowed! No peeking allowed! No peeking allowed! No peeking allowed! No peeking allowed! No peeking allowed! No peeking allowed! No peeking allowed! No peeking allowed! No peeking allowed! No peeking allowed! No peeking allowed! No peeking allowed! No peeking allowed! No peeking allowed! No peeking allowed! No peeking allowed! No peeking allowed! No peeking allowed! No peeking allowed! No peeking allowed! No peeking allowed! No peeking allowed! No peeking allowed! No peeking allowed! No peeking allowed! No peeking allowed! No peeking allowed! No peeking allowed! No peeking allowed! No peeking allowed!'}
                    </p>

                    {/* React button */}
                    {unlocked && (
                      <button
                        className="relative flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/15 rounded-full transition-colors"
                        onClick={() => setReactingMessageIndex(index)}
                      >
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-white/70 font-medium">React</span>

                        {/* Heart explosion */}
                        {reactingMessageIndex === index && (
                          <HeartExplosion onComplete={() => setReactingMessageIndex(null)} />
                        )}
                      </button>
                    )}
                  </div>

                  {/* Lock overlay for locked messages */}
                  {!unlocked && (
                    <div className="lock-overlay">
                      <svg className="w-16 h-16 text-white/30 mb-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C9.243 2 7 4.243 7 7v3H6c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-8c0-1.103-.897-2-2-2h-1V7c0-2.757-2.243-5-5-5zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v3H9V7zm4 10.723V20h-2v-2.277c-.595-.346-1-.984-1-1.723 0-1.103.897-2 2-2s2 .897 2 2c0 .738-.405 1.376-1 1.723z"/>
                      </svg>
                      <p className="text-white/70 font-medium text-lg mb-1">Message Locked</p>
                      <p className="text-white/50 text-sm">Unlocks on {getUnlockDate(msg.timestamp)}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
