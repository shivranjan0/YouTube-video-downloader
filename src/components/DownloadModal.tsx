import React, { useState } from 'react';
import { X, Check, Loader2, Music, Video, Download } from 'lucide-react';
import { downloadMedia } from '../services/api';

interface DownloadModalProps {
  url: string;
  isOpen: boolean;
  onClose: () => void;
}

const qualityOptions = [
  { value: '2160p', label: '4K Ultra HD', badge: '4K', desc: 'Premium' },
  { value: '1440p', label: '2K QHD', badge: '2K', desc: 'Ultra High' },
  { value: '1080p', label: '1080p FHD', badge: 'HD', desc: 'Best' },
  { value: '720p', label: '720p HD', badge: 'HD', desc: 'High' },
  { value: '480p', label: '480p SD', badge: 'SD', desc: 'Standard' },
  { value: '360p', label: '360p Low', badge: '↓', desc: 'Data Saver' },
];

const DownloadModal: React.FC<DownloadModalProps> = ({ url, isOpen, onClose }) => {
  const [selectedFormat, setSelectedFormat] = useState('mp4');
  const [selectedQuality, setSelectedQuality] = useState('1080p');
  const [isDownloading, setIsDownloading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      setIsCompleted(false);
      setError(null);
      setDownloadProgress(0);
      await downloadMedia({
        url,
        format: selectedFormat,
        quality: selectedQuality,
        onProgress: setDownloadProgress,
      });
      setIsCompleted(true);
      setIsDownloading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Download failed');
      setIsDownloading(false);
    }
  };

  if (!isOpen) return null;

  const accent = selectedFormat === 'mp4' ? '#C400FF' : '#0CECDD';

  return (
    /* ── Backdrop ── */
    <div
      onClick={e => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999 /* above everything incl. footer ticker */,
        background: 'rgba(0,0,0,0.75)',
        backdropFilter: 'blur(14px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start' /* anchor to top, not center */,
        paddingTop: '90px' /* clears the floating navbar */,
        padding: '120px 1rem 1rem',
        boxSizing: 'border-box',
        overflowY: 'auto',
      }}
    >
      {/* ── Modal card ── */}
      <div
        style={{
          width: '100%',
          maxWidth: '640px',
          maxHeight: 'calc(100vh - 120px)',
          overflowY: 'auto',
          background: '#0e0e1a',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: '22px',
          boxShadow: `0 0 80px ${accent}20, 0 40px 80px rgba(0,0,0,0.7)`,
          transition: 'box-shadow 0.35s',
        }}
      >
        {/* ── Header ── */}
        <div
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 1,
            background: '#0e0e1a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1rem 1.5rem 0.85rem',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <div>
            <h2
              style={{ fontWeight: 800, fontSize: '1.15rem', margin: 0, letterSpacing: '-0.01em' }}
            >
              Download <span style={{ color: accent, transition: 'color 0.3s' }}>Options</span>
            </h2>
            <p
              style={{ color: 'rgba(255,255,255,0.28)', fontSize: '0.78rem', margin: '0.2rem 0 0' }}
            >
              Choose your format and quality
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              width: '32px',
              height: '32px',
              flexShrink: 0,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: 'rgba(255,255,255,0.4)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.2s, color 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.12)';
              e.currentTarget.style.color = '#fff';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
              e.currentTarget.style.color = 'rgba(255,255,255,0.4)';
            }}
          >
            <X size={15} />
          </button>
        </div>

        <div style={{ padding: '1rem 1.5rem 1.25rem' }}>
          {/* ── Format selector ── */}
          <label
            style={{
              display: 'block',
              fontSize: '0.68rem',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.25)',
              marginBottom: '0.6rem',
            }}
          >
            Format
          </label>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '0.5rem',
              marginBottom: '1rem',
            }}
          >
            {[
              { id: 'mp4', label: 'MP4 Video', Icon: Video, color: '#C400FF' },
              { id: 'mp3', label: 'MP3 Audio', Icon: Music, color: '#0CECDD' },
            ].map(f => {
              const on = selectedFormat === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setSelectedFormat(f.id)}
                  style={{
                    padding: '0.7rem 1rem',
                    borderRadius: '12px',
                    border: `1.5px solid ${on ? f.color : 'rgba(255,255,255,0.07)'}`,
                    background: on ? `${f.color}14` : 'rgba(255,255,255,0.02)',
                    color: on ? f.color : 'rgba(255,255,255,0.38)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.45rem',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    boxShadow: on ? `0 0 20px ${f.color}28` : 'none',
                    transition: 'all 0.2s',
                  }}
                >
                  <f.Icon size={16} /> {f.label}
                </button>
              );
            })}
          </div>

          {/* ── Quality (MP4 only) ── */}
          {selectedFormat === 'mp4' && (
            <>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.25)',
                  marginBottom: '0.6rem',
                }}
              >
                Quality
              </label>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  gap: '0.45rem',
                  marginBottom: '1rem',
                }}
              >
                {qualityOptions.map(opt => {
                  const on = selectedQuality === opt.value;
                  return (
                    <button
                      key={opt.value}
                      onClick={() => setSelectedQuality(opt.value)}
                      style={{
                        padding: '0.55rem 0.7rem',
                        borderRadius: '10px',
                        textAlign: 'left',
                        border: `1.5px solid ${on ? '#FFF338' : 'rgba(255,255,255,0.06)'}`,
                        background: on ? 'rgba(255,243,56,0.07)' : 'rgba(255,255,255,0.02)',
                        color: on ? '#FFF338' : 'rgba(255,255,255,0.38)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        boxShadow: on ? '0 0 14px rgba(255,243,56,0.16)' : 'none',
                        transition: 'all 0.2s',
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.8rem' }}>{opt.label}</div>
                        <div style={{ fontSize: '0.68rem', opacity: 0.45, marginTop: '2px' }}>
                          {opt.desc}
                        </div>
                      </div>
                      <span
                        style={{
                          fontSize: '0.6rem',
                          fontWeight: 800,
                          padding: '2px 6px',
                          borderRadius: '4px',
                          background: on ? 'rgba(255,243,56,0.15)' : 'rgba(255,255,255,0.05)',
                          color: on ? '#FFF338' : 'rgba(255,255,255,0.22)',
                          letterSpacing: '0.04em',
                        }}
                      >
                        {opt.badge}
                      </span>
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {/* ── Error ── */}
          {error && (
            <div
              style={{
                padding: '0.75rem 1rem',
                borderRadius: '10px',
                marginBottom: '1rem',
                background: 'rgba(255,70,70,0.07)',
                border: '1px solid rgba(255,70,70,0.18)',
                color: '#ff7777',
                fontSize: '0.82rem',
              }}
            >
              {error}
            </div>
          )}

          {/* ── Progress bar ── */}
          {isDownloading && (
            <div
              style={{
                height: '2px',
                borderRadius: '9999px',
                background: 'rgba(255,255,255,0.06)',
                marginBottom: '1rem',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${downloadProgress}%`,
                  background: accent,
                  borderRadius: '9999px',
                  transition: 'width 0.3s',
                }}
              />
            </div>
          )}

          {/* ── Download button ── */}
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            style={{
              width: '100%',
              padding: '1rem',
              borderRadius: '14px',
              border: 'none',
              fontWeight: 700,
              fontSize: '1rem',
              letterSpacing: '0.01em',
              cursor: isDownloading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              background: isCompleted
                ? '#0CECDD'
                : isDownloading
                  ? 'rgba(255,255,255,0.05)'
                  : accent,
              color: isCompleted ? '#07080f' : isDownloading ? 'rgba(255,255,255,0.22)' : '#fff',
              boxShadow: isDownloading
                ? 'none'
                : isCompleted
                  ? '0 0 28px rgba(12,236,221,0.45)'
                  : `0 0 32px ${accent}55`,
              transition: 'all 0.3s',
            }}
          >
            {isDownloading ? (
              <>
                <Loader2 size={18} className="animate-spin" /> Downloading… {downloadProgress}%
              </>
            ) : isCompleted ? (
              <>
                <Check size={18} /> Download Complete!
              </>
            ) : (
              <>
                <Download size={18} /> Start Download
              </>
            )}
          </button>

          <p
            style={{
              textAlign: 'center',
              color: 'rgba(255,255,255,0.13)',
              fontSize: '0.7rem',
              marginTop: '0.85rem',
            }}
          >
            By downloading you agree to our terms of service
          </p>
        </div>
      </div>
    </div>
  );
};

export default DownloadModal;
