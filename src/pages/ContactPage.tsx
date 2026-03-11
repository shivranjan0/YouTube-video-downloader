import React, { useState, useRef } from 'react';
import { Mail, MapPin, Phone, Send, Loader2, CheckCircle, ArrowUpRight } from 'lucide-react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000'; // Make sure this matches your backend PORT

const ContactPage: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formError, setFormError] = useState('');
  const [focused, setFocused] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    if (!formData.from_name.trim() || !formData.from_email.trim() || !formData.message.trim()) {
      setFormError('Please fill in all required fields.');
      return;
    }
    setIsSubmitting(true);
    try {
      await axios.post(`${API_BASE_URL}/api/contact`, formData);
      setIsSuccess(true);
      setFormData({ from_name: '', from_email: '', subject: '', message: '' });
      setTimeout(() => setIsSuccess(false), 6000);
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.error ||
        'Failed to send message. Please try again or email us directly.';
      setFormError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldStyle = (name: string): React.CSSProperties => ({
    width: '100%',
    padding: '0.9rem 1.1rem',
    borderRadius: '12px',
    background: focused === name ? 'rgba(12,236,221,0.04)' : 'rgba(255,255,255,0.03)',
    border: `1.5px solid ${focused === name ? '#0CECDD' : 'rgba(255,255,255,0.08)'}`,
    color: '#fff',
    fontSize: '0.9rem',
    outline: 'none',
    boxShadow: focused === name ? '0 0 0 4px rgba(12,236,221,0.08)' : 'none',
    transition: 'all 0.2s',
    boxSizing: 'border-box' as const,
    fontFamily: 'inherit',
  });

  const contacts = [
    {
      Icon: Mail,
      color: '#0CECDD',
      label: 'Email Us',
      value: 'shivranjankumar917@gmail.com',
      sub: 'Reply within 24–48 hrs',
    },
    {
      Icon: Phone,
      color: '#FFF338',
      label: 'Call Us',
      value: '+91 7667751280',
      sub: 'Mon–Fri, 9AM–6PM IST',
    },
    {
      Icon: MapPin,
      color: '#FF67E7',
      label: 'Find Us',
      value: '201 Saffron Tower, Fatehgunj',
      sub: 'Vadodara, Gujarat 390002',
    },
  ];

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* ── Hero ── */}
      <div
        style={{
          padding: '10rem 1.5rem 5rem',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        {/* Glow orbs */}
        <div
          style={{
            position: 'absolute',
            top: '20%',
            left: '20%',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(12,236,221,0.07) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '10%',
            right: '15%',
            width: '320px',
            height: '320px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(196,0,255,0.07) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '640px', margin: '0 auto' }}>
          <span
            style={{
              display: 'inline-block',
              padding: '0.3rem 0.9rem',
              borderRadius: '9999px',
              background: 'rgba(12,236,221,0.08)',
              border: '1px solid rgba(12,236,221,0.2)',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#0CECDD',
              marginBottom: '1.25rem',
            }}
          >
            Get In Touch
          </span>
          <h1
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              fontWeight: 900,
              letterSpacing: '-0.03em',
              color: '#fff',
              marginBottom: '1rem',
              lineHeight: 1.1,
            }}
          >
            We'd love to
            <br />
            <span style={{ color: '#0CECDD' }}>hear from you</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: '1.05rem', lineHeight: 1.7 }}>
            Have a question, feedback, or a business inquiry?
            <br />
            Drop us a message and we'll get back to you.
          </p>
        </div>
      </div>

      {/* ── Content ── */}
      <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '5rem 1.5rem 6rem' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.5fr',
            gap: '4rem',
            alignItems: 'start',
          }}
        >
          {/* Left: info */}
          <div>
            <h2
              style={{
                fontSize: '1.35rem',
                fontWeight: 800,
                color: '#fff',
                marginBottom: '0.4rem',
                letterSpacing: '-0.01em',
              }}
            >
              Contact Information
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.9rem', marginBottom: '2rem' }}>
              Reach us through any of these channels.
            </p>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                marginBottom: '2.5rem',
              }}
            >
              {contacts.map(({ Icon, color, label, value, sub }) => (
                <div
                  key={label}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '1rem',
                    padding: '1.25rem 1.25rem',
                    background: 'rgba(255,255,255,0.025)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: '14px',
                    transition: 'border-color 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = `${color}30`)}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)')}
                >
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
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
                    <p
                      style={{
                        fontWeight: 600,
                        fontSize: '0.82rem',
                        color,
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        marginBottom: '0.25rem',
                      }}
                    >
                      {label}
                    </p>
                    <p
                      style={{
                        fontWeight: 500,
                        fontSize: '0.9rem',
                        color: '#fff',
                        marginBottom: '0.15rem',
                      }}
                    >
                      {value}
                    </p>
                    <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.28)' }}>{sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Map */}
            <div
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.07)',
                height: '200px',
              }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.6728428391604!2d73.18843427595661!3d22.294669979666414!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc5f925e02ab7%3A0x6c8c39b39232bacd!2sFatehgunj%2C%20Vadodara%2C%20Gujarat%20390002!5e0!3m2!1sen!2sin!4v1709799671144!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(0.88) hue-rotate(180deg) saturate(0.4)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Right: form */}
          <div
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '22px',
              padding: '2.5rem',
            }}
          >
            {isSuccess ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: 'rgba(12,236,221,0.1)',
                    border: '1px solid rgba(12,236,221,0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.25rem',
                    color: '#0CECDD',
                  }}
                >
                  <CheckCircle size={28} />
                </div>
                <h3
                  style={{
                    fontWeight: 800,
                    fontSize: '1.4rem',
                    color: '#fff',
                    marginBottom: '0.5rem',
                  }}
                >
                  Message Sent!
                </h3>
                <p
                  style={{ color: 'rgba(255,255,255,0.38)', fontSize: '0.95rem', lineHeight: 1.6 }}
                >
                  Thank you for reaching out. We'll get back to you within 24–48 hours.
                </p>
              </div>
            ) : (
              <>
                <div style={{ marginBottom: '2rem' }}>
                  <h2
                    style={{
                      fontSize: '1.35rem',
                      fontWeight: 800,
                      color: '#fff',
                      marginBottom: '0.3rem',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    Send a Message{' '}
                    <ArrowUpRight
                      size={20}
                      style={{ color: '#C400FF', display: 'inline', verticalAlign: 'middle' }}
                    />
                  </h2>
                  <p style={{ color: 'rgba(255,255,255,0.28)', fontSize: '0.875rem' }}>
                    All fields marked <span style={{ color: '#FF67E7' }}>*</span> are required.
                  </p>
                </div>

                {formError && (
                  <div
                    style={{
                      padding: '0.75rem 1rem',
                      borderRadius: '10px',
                      marginBottom: '1.25rem',
                      background: 'rgba(255,70,70,0.07)',
                      border: '1px solid rgba(255,70,70,0.2)',
                      color: '#ff7777',
                      fontSize: '0.85rem',
                    }}
                  >
                    {formError}
                  </div>
                )}

                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}
                >
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label
                        style={{
                          display: 'block',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          color: 'rgba(255,255,255,0.3)',
                          marginBottom: '0.45rem',
                        }}
                      >
                        Name <span style={{ color: '#FF67E7' }}>*</span>
                      </label>
                      <input
                        type="text"
                        name="from_name"
                        value={formData.from_name}
                        onChange={handleChange}
                        onFocus={() => setFocused('from_name')}
                        onBlur={() => setFocused(null)}
                        placeholder="Your name"
                        style={fieldStyle('from_name')}
                        required
                      />
                    </div>
                    <div>
                      <label
                        style={{
                          display: 'block',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          color: 'rgba(255,255,255,0.3)',
                          marginBottom: '0.45rem',
                        }}
                      >
                        Email <span style={{ color: '#FF67E7' }}>*</span>
                      </label>
                      <input
                        type="email"
                        name="from_email"
                        value={formData.from_email}
                        onChange={handleChange}
                        onFocus={() => setFocused('from_email')}
                        onBlur={() => setFocused(null)}
                        placeholder="your@email.com"
                        style={fieldStyle('from_email')}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: 'rgba(255,255,255,0.3)',
                        marginBottom: '0.45rem',
                      }}
                    >
                      Subject
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      onFocus={() => setFocused('subject')}
                      onBlur={() => setFocused(null)}
                      style={{ ...fieldStyle('subject'), appearance: 'none', cursor: 'pointer' }}
                    >
                      <option value="" style={{ background: '#111118' }}>
                        Select a topic…
                      </option>
                      <option value="general" style={{ background: '#111118' }}>
                        General Inquiry
                      </option>
                      <option value="support" style={{ background: '#111118' }}>
                        Technical Support
                      </option>
                      <option value="feedback" style={{ background: '#111118' }}>
                        Feedback
                      </option>
                      <option value="business" style={{ background: '#111118' }}>
                        Business Proposal
                      </option>
                      <option value="dmca" style={{ background: '#111118' }}>
                        DMCA / Copyright
                      </option>
                      <option value="other" style={{ background: '#111118' }}>
                        Other
                      </option>
                    </select>
                  </div>

                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: 'rgba(255,255,255,0.3)',
                        marginBottom: '0.45rem',
                      }}
                    >
                      Message <span style={{ color: '#FF67E7' }}>*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocused('message')}
                      onBlur={() => setFocused(null)}
                      rows={6}
                      placeholder="Tell us what's on your mind…"
                      style={{ ...fieldStyle('message'), resize: 'vertical' }}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      padding: '1rem 1.5rem',
                      borderRadius: '14px',
                      border: 'none',
                      background: isSubmitting ? 'rgba(255,255,255,0.05)' : '#C400FF',
                      color: isSubmitting ? 'rgba(255,255,255,0.25)' : '#fff',
                      fontWeight: 700,
                      fontSize: '1rem',
                      letterSpacing: '0.01em',
                      cursor: isSubmitting ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      boxShadow: isSubmitting ? 'none' : '0 0 28px rgba(196,0,255,0.45)',
                      transition: 'all 0.25s',
                      marginTop: '0.25rem',
                    }}
                    onMouseEnter={e => {
                      if (!isSubmitting) e.currentTarget.style.opacity = '0.88';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.opacity = '1';
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="animate-spin" /> Sending…
                      </>
                    ) : (
                      <>
                        <Send size={18} /> Send Message
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
