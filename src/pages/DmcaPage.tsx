import React, { useState } from 'react';

const DmcaPage: React.FC = () => {
  const year = new Date().getFullYear();
  const [form, setForm] = useState({
    name: '',
    email: '',
    url: '',
    description: '',
    signature: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '8rem 1.5rem 5rem' }}>
      <h1
        style={{
          fontSize: 'clamp(2rem, 4vw, 2.75rem)',
          fontWeight: 900,
          marginBottom: '0.5rem',
          letterSpacing: '-0.02em',
        }}
      >
        DMCA Policy
      </h1>
      <p
        style={{
          color: 'rgba(255,255,255,0.3)',
          fontSize: '0.875rem',
          marginBottom: '3rem',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          paddingBottom: '1.5rem',
        }}
      >
        Last updated: March 11, {year}
      </p>

      {[
        {
          title: 'Our DMCA Policy',
          color: '#C400FF',
          body: `Audivio respects the intellectual property rights of others and expects our users to do the same. In accordance with the Digital Millennium Copyright Act (DMCA) and other applicable laws, we will respond to notices of alleged copyright infringement that comply with applicable law and are properly submitted to us.`,
        },
        {
          title: 'What Audivio Does',
          color: '#C400FF',
          body: `Audivio provides a tool that allows users to download publicly accessible videos from YouTube for personal use. We do not host, store, or distribute any copyrighted video content ourselves. We do not encourage or facilitate copyright infringement in any way.`,
        },
        {
          title: 'DMCA Takedown Notice Requirements',
          color: '#C400FF',
          body: `If you believe that your copyrighted work has been accessed through our service in a way that violates your rights, please provide us with a written notice containing:\n\n1. Your full legal name, address, telephone number, and email address\n2. A description of the copyrighted work you claim has been infringed\n3. The specific URL(s) on our site that allegedly infringe your copyright\n4. A statement that you have a good faith belief that the use is not authorized by the copyright owner, its agent, or the law\n5. A statement, under penalty of perjury, that the information in your notice is accurate and that you are the copyright owner or authorized to act on the copyright owner's behalf\n6. Your physical or electronic signature`,
        },
        {
          title: 'Counter-Notice',
          color: '#C400FF',
          body: `If you believe your content was removed by mistake, you may submit a counter-notice with the following information:\n\n1. Your full legal name, address, phone number, and email\n2. Identification of the content that was removed\n3. A statement under penalty of perjury that you have a good faith belief the content was removed in error\n4. A statement consenting to jurisdiction of the appropriate court\n5. Your physical or electronic signature`,
        },
        {
          title: 'Repeat Infringers',
          color: '#C400FF',
          body: `Audivio has a policy of terminating, in appropriate circumstances, users who are repeat infringers of intellectual property rights.`,
        },
      ].map(({ title, color, body }) => (
        <div key={title} style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color, marginBottom: '0.75rem' }}>
            {title}
          </h2>
          <p
            style={{
              color: 'rgba(255,255,255,0.55)',
              lineHeight: 1.8,
              fontSize: '0.95rem',
              whiteSpace: 'pre-line',
            }}
          >
            {body}
          </p>
        </div>
      ))}

      {/* DMCA Claim Form */}
      <div
        style={{
          marginTop: '3rem',
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '18px',
          padding: '2rem',
        }}
      >
        <h2
          style={{ fontSize: '1.25rem', fontWeight: 800, color: '#C400FF', marginBottom: '0.5rem' }}
        >
          Submit a DMCA Takedown Request
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.875rem', marginBottom: '2rem' }}>
          Fill out the form below. We will review and respond within 3–5 business days.
        </p>

        {submitted ? (
          <div
            style={{
              padding: '1.5rem',
              borderRadius: '12px',
              background: 'rgba(12,236,221,0.08)',
              border: '1px solid rgba(12,236,221,0.2)',
              color: '#0CECDD',
              textAlign: 'center',
              fontWeight: 600,
            }}
          >
            ✅ Your DMCA notice has been submitted. We will review it within 3–5 business days.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            {[
              {
                key: 'name',
                label: 'Full Legal Name',
                type: 'text',
                placeholder: 'Your full name',
              },
              {
                key: 'email',
                label: 'Email Address',
                type: 'email',
                placeholder: 'your@email.com',
              },
              {
                key: 'url',
                label: 'Infringing URL',
                type: 'url',
                placeholder: 'URL of the infringing content',
              },
            ].map(({ key, label, type, placeholder }) => (
              <div key={key}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    color: 'rgba(255,255,255,0.4)',
                    marginBottom: '0.4rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}
                >
                  {label}
                </label>
                <input
                  type={type}
                  required
                  placeholder={placeholder}
                  value={form[key as keyof typeof form]}
                  onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                  style={{
                    width: '100%',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '10px',
                    padding: '0.75rem 1rem',
                    color: '#fff',
                    fontSize: '0.9rem',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
            ))}

            {[
              {
                key: 'description',
                label: 'Description of Infringing Content',
                placeholder: 'Describe the copyrighted work and how it infringes your rights...',
              },
              {
                key: 'signature',
                label: 'Electronic Signature (Type your full name)',
                placeholder: 'Type your full legal name as your signature',
              },
            ].map(({ key, label, placeholder }) => (
              <div key={key}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    color: 'rgba(255,255,255,0.4)',
                    marginBottom: '0.4rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}
                >
                  {label}
                </label>
                <textarea
                  required
                  placeholder={placeholder}
                  rows={key === 'description' ? 4 : 2}
                  value={form[key as keyof typeof form]}
                  onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                  style={{
                    width: '100%',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '10px',
                    padding: '0.75rem 1rem',
                    color: '#fff',
                    fontSize: '0.9rem',
                    outline: 'none',
                    resize: 'vertical',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
            ))}

            <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.78rem', lineHeight: 1.6 }}>
              By submitting this form, I declare under penalty of perjury that the information
              provided is accurate and that I am the copyright owner or authorised to act on the
              copyright owner's behalf.
            </p>

            <button
              type="submit"
              style={{
                padding: '0.9rem 2rem',
                borderRadius: '12px',
                border: 'none',
                background: '#C400FF',
                color: '#fff',
                fontWeight: 700,
                fontSize: '1rem',
                cursor: 'pointer',
                boxShadow: '0 0 24px rgba(196,0,255,0.4)',
                transition: 'opacity 0.2s',
              }}
            >
              Submit DMCA Notice
            </button>
          </form>
        )}
      </div>

      <div style={{ marginTop: '2rem' }}>
        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.875rem' }}>
          Prefer to email directly? Contact us at:{' '}
          <a href="mailto:dmca@audivio.com" style={{ color: '#C400FF' }}>
            dmca@audivio.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default DmcaPage;
