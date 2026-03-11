import React from 'react';
import { Clipboard, Link, MousePointer, Save } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Copy the URL',
    description: 'Find the YouTube video and copy its URL from the address bar.',
    icon: <Clipboard size={22} />,
    color: '#0CECDD',
  },
  {
    number: '02',
    title: 'Paste the Link',
    description: 'Paste the URL into the input box on the homepage.',
    icon: <Link size={22} />,
    color: '#FFF338',
  },
  {
    number: '03',
    title: 'Click Download',
    description: 'Hit the download button and let us process the link instantly.',
    icon: <MousePointer size={22} />,
    color: '#FF67E7',
  },
  {
    number: '04',
    title: 'Save Your File',
    description: 'Pick your format and quality, then save directly to your device.',
    icon: <Save size={22} />,
    color: '#C400FF',
  },
];

const DownloadSteps: React.FC = () => {
  return (
    <section style={{ padding: '5rem 1.5rem 6rem', position: 'relative', zIndex: 10 }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p
            style={{
              fontSize: '0.78rem',
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#FF67E7',
              marginBottom: '0.75rem',
            }}
          >
            How it works
          </p>
          <h2
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
              fontWeight: 800,
              color: '#fff',
              letterSpacing: '-0.02em',
              marginBottom: '0.75rem',
            }}
          >
            Three steps to your file
          </h2>
          <p
            style={{
              color: 'rgba(255,255,255,0.35)',
              fontSize: '1rem',
              maxWidth: '420px',
              margin: '0 auto',
            }}
          >
            Simple, fast, and completely free — no sign-up required.
          </p>
        </div>

        {/* Steps row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1px',
            background: 'rgba(255,255,255,0.07)',
            borderRadius: '20px',
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          {steps.map((step, idx) => (
            <div
              key={step.number}
              style={{
                padding: '2.5rem 2rem',
                background: '#0d0d14',
                position: 'relative',
                transition: 'background 0.25s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = '#131320';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = '#0d0d14';
              }}
            >
              {/* Step number — large faint */}
              <span
                style={{
                  position: 'absolute',
                  top: '1.25rem',
                  right: '1.5rem',
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  letterSpacing: '0.12em',
                  color: step.color,
                  opacity: 0.5,
                }}
              >
                {step.number}
              </span>

              {/* Icon circle */}
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: `${step.color}12`,
                  border: `1px solid ${step.color}28`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: step.color,
                  marginBottom: '1.25rem',
                }}
              >
                {step.icon}
              </div>

              <h3
                style={{
                  fontWeight: 700,
                  fontSize: '1rem',
                  color: '#fff',
                  marginBottom: '0.5rem',
                  letterSpacing: '-0.01em',
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  color: 'rgba(255,255,255,0.38)',
                  fontSize: '0.875rem',
                  lineHeight: 1.65,
                }}
              >
                {step.description}
              </p>

              {/* Bottom color line */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: step.color,
                  opacity: 0.35,
                }}
              />

              {/* Connector arrow between cards */}
              {idx < steps.length - 1 && (
                <div
                  style={{
                    display: 'none', // hidden on mobile, shown via media query workaround
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DownloadSteps;
