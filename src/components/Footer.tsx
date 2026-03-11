import React from 'react';
import { Link } from './Link';
import { Instagram, Twitter, Youtube, Facebook, ArrowUpRight } from 'lucide-react';
import logoImg from '../logo (2).png';

const TICKER_ITEMS = [
  'FAST DOWNLOADS',
  'FREE TO USE',
  'NO WATERMARK',
  '4K QUALITY',
  'MP4 & MP3',
  'NO SIGN-UP',
  'FAST DOWNLOADS',
  'FREE TO USE',
  'NO WATERMARK',
  '4K QUALITY',
  'MP4 & MP3',
  'NO SIGN-UP',
];

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer style={{ background: '#0a0a10', position: 'relative' }}>
      {/* ── Scrolling Ticker ── */}
      <div
        style={{
          background: '#0CECDD',
          overflow: 'hidden',
          padding: '0.65rem 0',
          borderTop: '1px solid rgba(12,236,221,0.3)',
          borderBottom: '1px solid rgba(12,236,221,0.3)',
        }}
      >
        <div className="footer-ticker">
          {TICKER_ITEMS.map((item, i) => (
            <span
              key={i}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '1.2rem',
                marginRight: '1.2rem',
                fontWeight: 800,
                fontSize: '0.8rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#0a0a10',
              }}
            >
              {item}
              <span style={{ fontSize: '1rem', opacity: 0.5 }}>✦</span>
            </span>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
        {/* ── CTA Row ── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem',
            padding: '3.5rem 0 3rem',
            borderBottom: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          <h2
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.25rem)',
              fontWeight: 800,
              color: 'rgba(255,255,255,0.08)',
              letterSpacing: '-0.02em',
              WebkitTextStroke: '1px rgba(255,255,255,0.25)',
              lineHeight: 1.1,
              margin: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            Start Downloading Now
            <ArrowUpRight size={40} style={{ color: '#0CECDD', strokeWidth: 2.5 }} />
          </h2>

          <Link
            href="/contact"
            style={{
              textDecoration: 'none',
              padding: '0.8rem 2rem',
              borderRadius: '9999px',
              border: '1.5px solid #0CECDD',
              color: '#0CECDD',
              fontWeight: 700,
              fontSize: '0.95rem',
              letterSpacing: '0.04em',
              whiteSpace: 'nowrap',
              transition: 'background 0.2s, color 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#0CECDD';
              e.currentTarget.style.color = '#0a0a10';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#0CECDD';
            }}
          >
            Get Started ↗
          </Link>
        </div>

        {/* ── Links Grid ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.6fr repeat(3, 1fr)',
            gap: '2.5rem',
            padding: '3rem 0 2.5rem',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          {/* Brand column */}
          <div>
            <div
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}
            >
              <img
                src={logoImg}
                alt="Audivio"
                style={{
                  width: '38px',
                  height: '38px',
                  objectFit: 'contain',
                  mixBlendMode: 'screen',
                }}
              />
              <span
                style={{
                  fontWeight: 900,
                  fontSize: '1.15rem',
                  color: '#fff',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                AUDIVIO
              </span>
            </div>
            <p
              style={{
                color: 'rgba(255,255,255,0.3)',
                fontSize: '0.85rem',
                lineHeight: 1.7,
                marginBottom: '1.5rem',
                maxWidth: '260px',
              }}
            >
              Download YouTube videos and audio fast, free, and in stunning 4K quality.
            </p>
            <div style={{ display: 'flex', gap: '0.6rem' }}>
              {[
                { Icon: Twitter, color: '#0CECDD', href: '#' },
                { Icon: Instagram, color: '#FF67E7', href: '#' },
                { Icon: Youtube, color: '#ff3b3b', href: '#' },
                { Icon: Facebook, color: '#C400FF', href: '#' },
              ].map(({ Icon, color, href }, i) => (
                <a
                  key={i}
                  href={href}
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '8px',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'rgba(255,255,255,0.35)',
                    textDecoration: 'none',
                    transition: 'color 0.2s, border-color 0.2s, background 0.2s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = color;
                    e.currentTarget.style.borderColor = `${color}55`;
                    e.currentTarget.style.background = `${color}14`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = 'rgba(255,255,255,0.35)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                  }}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Pages */}
          <div>
            <h4
              style={{
                color: '#0CECDD',
                fontWeight: 700,
                fontSize: '0.78rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '1.1rem',
              }}
            >
              Pages
            </h4>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.65rem',
              }}
            >
              {[
                ['/', 'Home'],
                ['/about', 'About'],
                ['/contact', 'Contact'],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link
                    href={href}
                    style={{
                      color: 'rgba(255,255,255,0.38)',
                      fontSize: '0.875rem',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.38)')}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Formats */}
          <div>
            <h4
              style={{
                color: '#FF67E7',
                fontWeight: 700,
                fontSize: '0.78rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '1.1rem',
              }}
            >
              Formats
            </h4>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.65rem',
              }}
            >
              {['MP4 Video', 'MP3 Audio', '4K Quality', '1080p HD', '720p'].map(f => (
                <li key={f}>
                  <span style={{ color: 'rgba(255,255,255,0.38)', fontSize: '0.875rem' }}>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4
              style={{
                color: '#C400FF',
                fontWeight: 700,
                fontSize: '0.78rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '1.1rem',
              }}
            >
              Legal
            </h4>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.65rem',
              }}
            >
              {[
                ['/privacy', 'Privacy Policy'],
                ['/terms', 'Terms & Conditions'],
                ['/disclaimer', 'Disclaimer'],
                ['/dmca', 'DMCA'],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link
                    href={href}
                    style={{
                      color: 'rgba(255,255,255,0.38)',
                      fontSize: '0.875rem',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.38)')}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.75rem',
            padding: '1.5rem 0',
          }}
        >
          <p style={{ color: 'rgba(255,255,255,0.22)', fontSize: '0.8rem', margin: 0 }}>
            All Rights Reserved © {year} Audivio
          </p>
          <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', flexWrap: 'wrap' }}>
            {(
              [
                ['/privacy', 'Privacy Policy'],
                ['/terms', 'Terms & Conditions'],
                ['/disclaimer', 'Disclaimer'],
                ['/dmca', 'DMCA'],
              ] as [string, string][]
            ).map(([href, label], i, arr) => (
              <React.Fragment key={href}>
                <Link
                  href={href}
                  style={{
                    color: 'rgba(255,255,255,0.22)',
                    fontSize: '0.8rem',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.22)')}
                >
                  {label}
                </Link>
                {i < arr.length - 1 && <span style={{ color: 'rgba(255,255,255,0.1)' }}>|</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
