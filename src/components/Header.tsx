import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from './Link';
import logoImg from '../logo (2).png';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  /* ── Desktop: floating pill ───────────────────────── */
  if (!isMobile) {
    return (
      <div
        style={{
          position: 'fixed',
          top: '18px',
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          zIndex: 100,
          pointerEvents: 'none', // let clicks pass through the wrapper
        }}
      >
        <nav
          style={{
            pointerEvents: 'all',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            width: '80%',
            background: '#111118',
            borderRadius: '9999px',
            padding: '10px',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: scrolled
              ? '0 8px 40px rgba(0,0,0,0.7), 0 0 0 1px rgba(196,0,255,0.18)'
              : '0 4px 28px rgba(0,0,0,0.55)',
            transition: 'box-shadow 0.3s',
          }}
        >
          {/* Logo + brand name */}
          <Link
            href="/"
            style={{
              textDecoration: 'none',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            <img
              src={logoImg}
              alt="Audivio logo"
              style={{
                width: '52px',
                height: '52px',
                objectFit: 'contain',
                mixBlendMode: 'screen',
              }}
            />
            <span
              style={{
                fontWeight: 800,
                fontSize: '1.25rem',
                letterSpacing: '0.12em',
                color: '#e2e8f0',
                fontFamily: 'Inter, system-ui, sans-serif',
                textTransform: 'uppercase',
              }}
            >
              AUDIVIO
            </span>
          </Link>

          {/* Nav links */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 6px',
              gap: '2px',
            }}
          >
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                style={{
                  color: 'rgba(255,255,255,0.75)',
                  textDecoration: 'none',
                  fontWeight: 500,
                  fontSize: '0.975rem',
                  padding: '0.65rem 1.2rem',
                  borderRadius: '9999px',
                  transition: 'color 0.2s, background 0.2s',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = '#fff';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.07)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = 'rgba(255,255,255,0.75)';
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* CTA — white pill */}
          <Link
            href="/contact"
            style={{
              textDecoration: 'none',
              padding: '0.7rem 1.5rem',
              borderRadius: '9999px',
              background: '#fff',
              color: '#0a0a0f',
              fontWeight: 700,
              fontSize: '0.9rem',
              whiteSpace: 'nowrap',
              transition: 'opacity 0.2s',
              flexShrink: 0,
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            Get Started
          </Link>
        </nav>
      </div>
    );
  }

  /* ── Mobile: top bar ──────────────────────────────── */
  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 1.25rem',
        background: 'rgba(17,17,24,0.96)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <Link
          href="/"
          style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
        >
          <img
            src={logoImg}
            alt="Audivio logo"
            style={{ width: '36px', height: '36px', objectFit: 'contain', mixBlendMode: 'screen' }}
          />
          <span
            style={{
              fontWeight: 800,
              fontSize: '1.05rem',
              letterSpacing: '0.1em',
              color: '#e2e8f0',
              fontFamily: 'Inter, system-ui, sans-serif',
              textTransform: 'uppercase',
            }}
          >
            AUDIVIO
          </span>
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            background: 'none',
            border: 'none',
            color: '#fff',
            cursor: 'pointer',
            padding: '0.4rem',
          }}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: '60px',
            left: 0,
            right: 0,
            background: 'rgba(17,17,24,0.98)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(255,255,255,0.07)',
            padding: '0.75rem 1.25rem 1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.25rem',
          }}
        >
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setIsOpen(false)}
              style={{
                color: 'rgba(255,255,255,0.75)',
                textDecoration: 'none',
                fontWeight: 500,
                padding: '0.6rem 0.5rem',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            style={{
              textDecoration: 'none',
              padding: '0.6rem 1rem',
              marginTop: '0.5rem',
              borderRadius: '9999px',
              background: '#fff',
              color: '#0a0a0f',
              fontWeight: 700,
              fontSize: '0.875rem',
              textAlign: 'center' as const,
            }}
          >
            Get Started
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
