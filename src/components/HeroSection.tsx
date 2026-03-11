import React, { useState, useEffect } from 'react';
import { Youtube, Loader2, Download } from 'lucide-react';
import { detectPlatform } from '../utils/detectPlatform';
import PlatformIcon from './PlatformIcon';
import PixelCard from './PixelCard';

interface HeroSectionProps {
  onUrlSubmit: (url: string) => void;
}

const stats = [
  { value: '10M+', label: 'Downloads', color: '#0CECDD' },
  { value: '4K', label: 'Max Quality', color: '#FFF338' },
  { value: '100%', label: 'Free', color: '#FF67E7' },
];

const cyclingWords = [
  { text: 'YouTube Videos', color: '#0CECDD' },
  { text: 'MP4 Files', color: '#FFF338' },
  { text: 'Audio Tracks', color: '#FF67E7' },
  { text: '4K Videos', color: '#C400FF' },
  { text: 'Any Platform', color: '#0CECDD' },
];

const HeroSection: React.FC<HeroSectionProps> = ({ onUrlSubmit }) => {
  const [url, setUrl] = useState('');
  const [platform, setPlatform] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focused, setFocused] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [animClass, setAnimClass] = useState('word-in');

  useEffect(() => {
    setPlatform(url.trim() ? detectPlatform(url) : null);
  }, [url]);

  // Cycle words every 2.5 s
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimClass('word-out');
      setTimeout(() => {
        setWordIndex(i => (i + 1) % cyclingWords.length);
        setAnimClass('word-in');
      }, 380); // wait for word-out to finish
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      onUrlSubmit(url);
      setIsSubmitting(false);
    }, 1200);
  };

  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '6rem 1.5rem 4rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Glow orbs */}
      <div
        style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(196,0,255,0.13) 0%, transparent 70%)',
          top: '-100px',
          left: '-100px',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(12,236,221,0.10) 0%, transparent 70%)',
          bottom: '-80px',
          right: '-80px',
          pointerEvents: 'none',
        }}
      />

      {/* Headline */}
      <h1
        style={{
          fontSize: 'clamp(2.5rem, 6vw, 4.25rem)',
          fontWeight: 900,
          lineHeight: 1.1,
          textAlign: 'center',
          marginBottom: '1.25rem',
          maxWidth: '780px',
          letterSpacing: '-0.02em',
        }}
      >
        Download Any{' '}
        <span
          key={wordIndex}
          className={animClass}
          style={{
            color: cyclingWords[wordIndex].color,
            display: 'inline-block',
          }}
        >
          {cyclingWords[wordIndex].text}
        </span>
        <br />
        in Seconds
      </h1>

      {/* Sub */}
      <p
        style={{
          fontSize: '1.15rem',
          color: 'rgba(255,255,255,0.5)',
          textAlign: 'center',
          marginBottom: '2.5rem',
          maxWidth: '520px',
          lineHeight: 1.6,
        }}
      >
        Paste any YouTube link and download in MP4 or MP3 — up to 4K quality, completely free.
      </p>

      {/* Search form */}
      <div style={{ width: '100%', maxWidth: '780px', marginBottom: '2rem' }}>
        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: 'flex',
              gap: '0.5rem',
              background: 'rgba(255,255,255,0.05)',
              border: `1.5px solid ${focused ? '#0CECDD' : 'rgba(255,255,255,0.1)'}`,
              borderRadius: '18px',
              padding: '0.6rem',
              boxShadow: focused ? '0 0 0 4px rgba(12,236,221,0.1)' : 'none',
              transition: 'border-color 0.2s, box-shadow 0.2s',
            }}
          >
            <div
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                gap: '0.875rem',
                padding: '0 0.75rem',
              }}
            >
              {platform ? (
                <PlatformIcon platform={platform} size={24} />
              ) : (
                <Youtube size={24} color="#FF67E7" />
              )}
              <input
                type="url"
                value={url}
                onChange={e => setUrl(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="Paste YouTube URL here..."
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#fff',
                  fontSize: '1.15rem',
                  padding: '1rem 0',
                }}
              />
            </div>
            <PixelCard
              variant="purple"
              disabled={isSubmitting || !url.trim()}
              onClick={
                isSubmitting || !url.trim()
                  ? undefined
                  : () => {
                      if (url.trim()) {
                        setIsSubmitting(true);
                        setTimeout(() => {
                          onUrlSubmit(url);
                          setIsSubmitting(false);
                        }, 1200);
                      }
                    }
              }
              style={{
                flexShrink: 0,
                borderRadius: '13px',
                border: `1px solid ${isSubmitting || !url.trim() ? 'rgba(255,255,255,0.06)' : 'rgba(196,0,255,0.4)'}`,
                background: isSubmitting || !url.trim() ? 'rgba(255,255,255,0.04)' : '#C400FF',
                boxShadow: isSubmitting || !url.trim() ? 'none' : '0 0 24px rgba(196,0,255,0.45)',
                cursor: isSubmitting || !url.trim() ? 'not-allowed' : 'pointer',
              }}
            >
              {/* Normal flow content — canvas is already position:absolute as overlay */}
              <span
                style={{
                  position: 'relative',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '1rem 2rem',
                  color: isSubmitting || !url.trim() ? 'rgba(255,255,255,0.25)' : '#fff',
                  fontWeight: 700,
                  fontSize: '1.05rem',
                  whiteSpace: 'nowrap',
                  pointerEvents: 'none',
                }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" /> Processing...
                  </>
                ) : (
                  <>
                    <Download size={18} /> Download
                  </>
                )}
              </span>
            </PixelCard>
          </div>
        </form>
      </div>

      {/* Supported platforms */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          color: 'rgba(255,255,255,0.35)',
          fontSize: '0.85rem',
          marginBottom: '3rem',
        }}
      >
        <Youtube size={18} color="#ff0000" />
        <span>YouTube supported</span>
      </div>

      {/* Stats */}
      <div
        style={{
          display: 'flex',
          gap: '1px',
          background: 'rgba(255,255,255,0.06)',
          borderRadius: '16px',
          overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        {stats.map((s, i) => (
          <div
            key={i}
            style={{
              padding: '1.25rem 2.5rem',
              textAlign: 'center',
              background: 'rgba(255,255,255,0.02)',
              borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
            }}
          >
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: s.color }}>{s.value}</div>
            <div
              style={{
                fontSize: '0.75rem',
                color: 'rgba(255,255,255,0.4)',
                marginTop: '0.2rem',
                fontWeight: 500,
              }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
