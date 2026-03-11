import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'How do I download a YouTube video for free?',
    a: 'Simply copy the YouTube video URL from your browser, paste it into the Audivio input box at the top of the page, choose your desired format (MP4 video or MP3 audio) and quality (up to 4K Ultra HD), then click the Download button. Your file will be ready within seconds — no software installation needed.',
  },
  {
    q: 'Can I download YouTube videos in 4K quality?',
    a: 'Yes! Audivio fully supports 4K Ultra HD (2160p), 2K QHD (1440p), Full HD 1080p, 720p HD, 480p SD, and 360p downloads. Simply paste your YouTube URL, select the 4K quality option, and download your high-resolution video for free.',
  },
  {
    q: 'Can I convert YouTube videos to MP3 audio?',
    a: 'Absolutely. Audivio lets you extract and save the audio track from any YouTube video as a high-quality MP3 file. Select "MP3 Audio" in the format picker, then click Download — no quality loss, completely free.',
  },
  {
    q: 'Is Audivio free to use?',
    a: 'Yes, Audivio is 100% free. There are no hidden charges, no subscription plans, and no limits on the number of downloads. You can download as many YouTube videos as you like without paying anything.',
  },
  {
    q: 'Do I need to create an account to download videos?',
    a: 'No registration or account is needed. Audivio works instantly — just paste the link and download. We do not store your data or require any personal information.',
  },
  {
    q: 'Does Audivio add watermarks to downloaded videos?',
    a: 'No. Every video you download through Audivio is completely watermark-free and clean, exactly as uploaded to YouTube. You get the original quality video file with no branding added.',
  },
  {
    q: 'Is it safe to use Audivio?',
    a: 'Yes. Audivio is completely safe — no software download required, no browser extensions needed, and your download links are processed on our secure servers. We never store the downloaded files or your personal data.',
  },
  {
    q: 'Which devices and browsers are supported?',
    a: 'Audivio works on all major devices including Windows PC, Mac, iPhone, iPad, and Android smartphones. It supports all modern browsers like Chrome, Firefox, Safari, and Edge.',
  },
];

const FaqSection: React.FC = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      aria-label="Frequently Asked Questions"
      style={{ padding: '5rem 1.5rem 6rem', maxWidth: '860px', margin: '0 auto' }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
        <p
          style={{
            fontSize: '0.72rem',
            fontWeight: 700,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: '#FF67E7',
            marginBottom: '0.65rem',
          }}
        >
          FAQ
        </p>
        <h2
          style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            color: '#fff',
            marginBottom: '0.75rem',
          }}
        >
          Frequently Asked Questions
        </h2>
        <p
          style={{
            color: 'rgba(255,255,255,0.35)',
            fontSize: '1rem',
            maxWidth: '480px',
            margin: '0 auto',
          }}
        >
          Everything you need to know about downloading YouTube videos with Audivio.
        </p>
      </div>

      {/* Accordion */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
        {faqs.map((faq, i) => {
          const isOpen = open === i;
          return (
            <div
              key={i}
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
              style={{
                background: isOpen ? '#111120' : 'rgba(255,255,255,0.02)',
                border: `1px solid ${isOpen ? 'rgba(196,0,255,0.25)' : 'rgba(255,255,255,0.07)'}`,
                borderRadius: '14px',
                overflow: 'hidden',
                transition: 'border-color 0.25s, background 0.25s',
              }}
            >
              {/* Question row */}
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                style={{
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  padding: '1.1rem 1.4rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <span
                  itemProp="name"
                  style={{
                    fontWeight: 600,
                    fontSize: '0.975rem',
                    color: isOpen ? '#fff' : 'rgba(255,255,255,0.75)',
                    lineHeight: 1.4,
                  }}
                >
                  {faq.q}
                </span>
                <ChevronDown
                  size={18}
                  style={{
                    flexShrink: 0,
                    color: isOpen ? '#C400FF' : 'rgba(255,255,255,0.3)',
                    transform: isOpen ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.25s, color 0.25s',
                  }}
                />
              </button>

              {/* Answer */}
              {isOpen && (
                <div
                  itemScope
                  itemProp="acceptedAnswer"
                  itemType="https://schema.org/Answer"
                  style={{ padding: '0 1.4rem 1.25rem' }}
                >
                  <p
                    itemProp="text"
                    style={{
                      color: 'rgba(255,255,255,0.45)',
                      fontSize: '0.9rem',
                      lineHeight: 1.75,
                      margin: 0,
                    }}
                  >
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FaqSection;
