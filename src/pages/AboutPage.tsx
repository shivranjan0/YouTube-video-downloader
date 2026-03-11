import React from 'react';
import {
  Shield,
  Lock,
  Zap,
  Globe,
  Heart,
  Star,
  Download,
  Music,
  Video,
  Smartphone,
  CheckCircle,
  ArrowUpRight,
} from 'lucide-react';
import logoImg from '../logo (2).png';

const stats = [
  { value: '10M+', label: 'Downloads Served', color: '#0CECDD' },
  { value: '4K', label: 'Max Quality', color: '#FFF338' },
  { value: '99.9%', label: 'Uptime', color: '#FF67E7' },
  { value: '100%', label: 'Free Forever', color: '#C400FF' },
];

const values = [
  {
    Icon: Lock,
    color: '#0CECDD',
    title: 'Privacy First',
    desc: 'We never store or log the URLs you submit or the files you download. Zero data retention — ever.',
  },
  {
    Icon: Shield,
    color: '#C400FF',
    title: 'No Content Hosting',
    desc: 'Audivio does not host copyrighted content. We simply bridge you to publicly available media.',
  },
  {
    Icon: Zap,
    color: '#FFF338',
    title: 'Lightning Fast',
    desc: 'Our servers process your download request in seconds — no queuing, no waiting.',
  },
  {
    Icon: Globe,
    color: '#FF67E7',
    title: 'Works Everywhere',
    desc: 'PC, Mac, Android, iPhone — Audivio runs in any modern browser. No installation required.',
  },
  {
    Icon: Heart,
    color: '#0CECDD',
    title: 'Always Free',
    desc: 'No subscriptions, no hidden fees, no paywalls. Audivio is free for everyone, forever.',
  },
  {
    Icon: Star,
    color: '#C400FF',
    title: 'Ethical Use',
    desc: "We actively encourage users to respect creators' rights and applicable copyright laws.",
  },
];

const features = [
  {
    Icon: Video,
    color: '#C400FF',
    title: '4K Ultra HD Video',
    desc: 'Download in 4K, 2K, 1080p, 720p, 480p, or 360p — you choose the quality.',
  },
  {
    Icon: Music,
    color: '#0CECDD',
    title: 'MP3 Audio Extraction',
    desc: 'Strip the audio from any video and save it as a high-quality MP3 file.',
  },
  {
    Icon: Download,
    color: '#FF67E7',
    title: 'No Watermark',
    desc: 'Every file you download is 100% clean — no overlays, no branding added.',
  },
  {
    Icon: Smartphone,
    color: '#FFF338',
    title: 'All Devices',
    desc: 'Works seamlessly on desktop, tablet, and mobile — iOS and Android.',
  },
];

const timeline = [
  {
    year: '2022',
    title: 'Audivio Founded',
    desc: 'Started as a personal project to solve a simple problem: a clean, fast YouTube downloader without the bloat.',
  },
  {
    year: '2023',
    title: '1 Million Downloads',
    desc: 'Reached our first major milestone as word spread organically among creators, students, and everyday users.',
  },
  {
    year: '2024',
    title: '4K & MP3 Support Launched',
    desc: 'Expanded format support to include 4K Ultra HD video downloads and high-quality MP3 audio extraction.',
  },
  {
    year: '2025',
    title: '10 Million Downloads',
    desc: "Audivio now serves millions of users globally across 50+ countries — and we're just getting started.",
  },
];

const AboutPage: React.FC = () => {
  return (
    <div style={{ minHeight: '100vh' }}>
      {/* ── Hero ── */}
      <div
        style={{
          padding: '10rem 1.5rem 6rem',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '15%',
            left: '10%',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(196,0,255,0.07) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '5%',
            right: '10%',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(12,236,221,0.06) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '720px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <img
              src={logoImg}
              alt="Audivio"
              style={{
                width: '72px',
                height: '72px',
                objectFit: 'contain',
                mixBlendMode: 'screen',
              }}
            />
          </div>
          <span
            style={{
              display: 'inline-block',
              padding: '0.3rem 0.9rem',
              borderRadius: '9999px',
              background: 'rgba(196,0,255,0.08)',
              border: '1px solid rgba(196,0,255,0.2)',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#C400FF',
              marginBottom: '1.25rem',
            }}
          >
            Our Story
          </span>
          <h1
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              fontWeight: 900,
              letterSpacing: '-0.03em',
              color: '#fff',
              lineHeight: 1.1,
              marginBottom: '1.25rem',
            }}
          >
            Download smarter.
            <br />
            <span style={{ color: '#C400FF' }}>Stream freedom.</span>
          </h1>
          <p
            style={{
              color: 'rgba(255,255,255,0.4)',
              fontSize: '1.05rem',
              lineHeight: 1.75,
              maxWidth: '540px',
              margin: '0 auto 2rem',
            }}
          >
            Audivio is a free, fast, and private YouTube video downloader built for everyone — no
            sign-up, no watermarks, no limits.
          </p>
          <a
            href="#mission"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              textDecoration: 'none',
              color: '#C400FF',
              fontWeight: 600,
              fontSize: '0.9rem',
            }}
          >
            Learn more <ArrowUpRight size={16} />
          </a>
        </div>
      </div>

      {/* ── Stats ── */}
      <div
        style={{
          background: 'rgba(255,255,255,0.015)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div
          style={{
            maxWidth: '1000px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
          }}
        >
          {stats.map((s, i) => (
            <div
              key={i}
              style={{
                padding: '2.25rem 1rem',
                textAlign: 'center',
                borderRight: i < 3 ? '1px solid rgba(255,255,255,0.06)' : 'none',
              }}
            >
              <div
                style={{
                  fontSize: '2.25rem',
                  fontWeight: 900,
                  color: s.color,
                  letterSpacing: '-0.02em',
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontSize: '0.78rem',
                  color: 'rgba(255,255,255,0.3)',
                  marginTop: '0.3rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  fontWeight: 600,
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Mission ── */}
      <section
        id="mission"
        style={{ maxWidth: '1100px', margin: '0 auto', padding: '6rem 1.5rem' }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '5rem',
            alignItems: 'center',
          }}
        >
          <div>
            <span
              style={{
                display: 'block',
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: '#0CECDD',
                marginBottom: '0.75rem',
              }}
            >
              Mission
            </span>
            <h2
              style={{
                fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                fontWeight: 900,
                letterSpacing: '-0.02em',
                color: '#fff',
                marginBottom: '1.25rem',
                lineHeight: 1.2,
              }}
            >
              We believe great tools should be free
            </h2>
            <p
              style={{
                color: 'rgba(255,255,255,0.45)',
                lineHeight: 1.85,
                fontSize: '0.95rem',
                marginBottom: '1rem',
              }}
            >
              Audivio was built out of frustration with cluttered, ad-heavy, or paywalled YouTube
              downloaders. We wanted something clean, instant, and completely free — so we built it
              ourselves.
            </p>
            <p style={{ color: 'rgba(255,255,255,0.45)', lineHeight: 1.85, fontSize: '0.95rem' }}>
              Our mission is simple: give everyone — students, creators, researchers, and everyday
              users — the ability to save and access the content they love, in the quality they
              deserve, without compromise.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            {[
              'Free to use, no credit card required',
              'No software installation needed',
              'No watermarks on downloaded files',
              'Your downloads are never stored on our servers',
              'Works on all devices and browsers',
              'Supports 4K, 1080p, 720p, MP3 and more',
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <CheckCircle size={16} style={{ color: '#0CECDD', flexShrink: 0 }} />
                <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section
        style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          background: 'rgba(255,255,255,0.015)',
        }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '6rem 1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span
              style={{
                display: 'block',
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: '#FF67E7',
                marginBottom: '0.65rem',
              }}
            >
              What We Offer
            </span>
            <h2
              style={{
                fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                fontWeight: 900,
                letterSpacing: '-0.02em',
                color: '#fff',
              }}
            >
              Everything you need in one tool
            </h2>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1px',
              background: 'rgba(255,255,255,0.07)',
              borderRadius: '18px',
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            {features.map(({ Icon, color, title, desc }, i) => (
              <div
                key={i}
                style={{
                  padding: '2.25rem 1.75rem',
                  background: '#0d0d14',
                  position: 'relative',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = '#131320')}
                onMouseLeave={e => (e.currentTarget.style.background = '#0d0d14')}
              >
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: `${color}12`,
                    border: `1px solid ${color}28`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color,
                    marginBottom: '1.25rem',
                  }}
                >
                  <Icon size={20} />
                </div>
                <h3
                  style={{
                    fontWeight: 700,
                    fontSize: '1rem',
                    color: '#fff',
                    marginBottom: '0.5rem',
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    color: 'rgba(255,255,255,0.38)',
                    fontSize: '0.875rem',
                    lineHeight: 1.65,
                  }}
                >
                  {desc}
                </p>
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: color,
                    opacity: 0.3,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '6rem 1.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span
            style={{
              display: 'block',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: '#C400FF',
              marginBottom: '0.65rem',
            }}
          >
            Our Values
          </span>
          <h2
            style={{
              fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
              fontWeight: 900,
              letterSpacing: '-0.02em',
              color: '#fff',
            }}
          >
            Built on principles that matter
          </h2>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1rem',
          }}
        >
          {values.map(({ Icon, color, title, desc }, i) => (
            <div
              key={i}
              style={{
                padding: '1.75rem',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '16px',
                display: 'flex',
                gap: '1.1rem',
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = `${color}30`)}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)')}
            >
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  flexShrink: 0,
                  background: `${color}12`,
                  border: `1px solid ${color}28`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color,
                }}
              >
                <Icon size={18} />
              </div>
              <div>
                <h3
                  style={{
                    fontWeight: 700,
                    fontSize: '0.975rem',
                    color: '#fff',
                    marginBottom: '0.4rem',
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    color: 'rgba(255,255,255,0.38)',
                    fontSize: '0.875rem',
                    lineHeight: 1.65,
                  }}
                >
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Timeline ── */}
      <section
        style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          background: 'rgba(255,255,255,0.015)',
        }}
      >
        <div style={{ maxWidth: '820px', margin: '0 auto', padding: '6rem 1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span
              style={{
                display: 'block',
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: '#FFF338',
                marginBottom: '0.65rem',
              }}
            >
              Journey
            </span>
            <h2
              style={{
                fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                fontWeight: 900,
                letterSpacing: '-0.02em',
                color: '#fff',
              }}
            >
              How we got here
            </h2>
          </div>
          <div style={{ position: 'relative' }}>
            <div
              style={{
                position: 'absolute',
                left: '80px',
                top: 0,
                bottom: 0,
                width: '1px',
                background: 'rgba(255,255,255,0.08)',
              }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              {timeline.map(({ year, title, desc }, i) => {
                const colors = ['#0CECDD', '#C400FF', '#FF67E7', '#FFF338'];
                const col = colors[i % colors.length];
                return (
                  <div key={i} style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
                    <div
                      style={{
                        minWidth: '60px',
                        textAlign: 'right',
                        fontWeight: 800,
                        fontSize: '0.85rem',
                        color: col,
                        paddingTop: '0.3rem',
                      }}
                    >
                      {year}
                    </div>
                    <div style={{ position: 'relative', paddingLeft: '2rem' }}>
                      <div
                        style={{
                          position: 'absolute',
                          left: '-1px',
                          top: '6px',
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          background: col,
                          boxShadow: `0 0 12px ${col}60`,
                          transform: 'translateX(-50%)',
                        }}
                      />
                      <h3
                        style={{
                          fontWeight: 700,
                          fontSize: '1rem',
                          color: '#fff',
                          marginBottom: '0.35rem',
                        }}
                      >
                        {title}
                      </h3>
                      <p
                        style={{
                          color: 'rgba(255,255,255,0.38)',
                          fontSize: '0.875rem',
                          lineHeight: 1.7,
                        }}
                      >
                        {desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        style={{
          textAlign: 'center',
          padding: '6rem 1.5rem',
          borderTop: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <h2
          style={{
            fontSize: 'clamp(1.75rem, 4vw, 3rem)',
            fontWeight: 900,
            letterSpacing: '-0.02em',
            color: '#fff',
            marginBottom: '1rem',
          }}
        >
          Ready to start downloading?
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '1rem', marginBottom: '2rem' }}>
          Free, fast, and no sign-up required.
        </p>
        <a
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            textDecoration: 'none',
            padding: '0.95rem 2.5rem',
            borderRadius: '9999px',
            background: '#C400FF',
            color: '#fff',
            fontWeight: 700,
            fontSize: '1rem',
            boxShadow: '0 0 32px rgba(196,0,255,0.45)',
            transition: 'opacity 0.2s',
          }}
        >
          <Download size={18} /> Download Now — It's Free
        </a>
      </section>
    </div>
  );
};

export default AboutPage;
