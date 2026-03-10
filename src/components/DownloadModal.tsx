import React, { useState } from 'react';
import { X, Check, Loader2, Music, Video, Download } from 'lucide-react';
import { downloadMedia } from '../services/api';

interface DownloadModalProps {
  url: string;
  isOpen: boolean;
  onClose: () => void;
}



const qualityOptions = [
  {
    value: '2160p',
    label: '4K (Ultra HD)',
    description: 'Premium Quality',
    icon: <Video className="w-3 h-3" />,
    badge: '4K'
  },
  {
    value: '1440p',
    label: '2K (QHD)',
    description: 'Ultra High Quality',
    icon: <Video className="w-3 h-3" />,
    badge: '2K'
  },
  {
    value: '1080p',
    label: '1080p (FHD)',
    description: 'Best Quality',
    icon: <Video className="w-3 h-3" />,
    badge: 'HD'
  },
  {
    value: '720p',
    label: '720p (HD)',
    description: 'High Quality',
    icon: <Video className="w-3 h-3" />,
    badge: 'HD'
  },
  {
    value: '480p',
    label: '480p (SD)',
    description: 'Standard Quality',
    icon: <Video className="w-3 h-3" />,
    badge: 'SD'
  },
  {
    value: '360p',
    label: '360p (Low)',
    description: 'Data Saver',
    icon: <Video className="w-3 h-3" />,
    badge: 'Low'
  },
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
        onProgress: (progress) => {
          setDownloadProgress(progress);
        }
      });

      setIsCompleted(true);
      setIsDownloading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Download failed');
      setIsDownloading(false);
      setIsCompleted(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50">
      <div className="bg-[#1a1f2d] rounded-lg w-[400px]">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h2 className="text-xl">
              <span className="text-white font-semibold">Download</span>{' '}
              <span className="text-[#3b82f6]">Options</span>
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Format Selection */}
          <div>
            <label className="block text-gray-200 text-sm mb-3">
              Select Format
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setSelectedFormat('mp4')}
                className={`flex items-center justify-center space-x-2 p-4 rounded-lg transition-colors ${selectedFormat === 'mp4'
                  ? 'bg-[#1d4ed8] text-white'
                  : 'bg-[#1e2536] text-gray-300 hover:bg-[#1e2536]/80'
                  }`}
              >
                <Video className="w-5 h-5" />
                <span className="font-medium">MP4 Video</span>
              </button>
              <button
                onClick={() => setSelectedFormat('mp3')}
                className={`flex items-center justify-center space-x-2 p-4 rounded-lg transition-colors ${selectedFormat === 'mp3'
                  ? 'bg-[#1d4ed8] text-white'
                  : 'bg-[#1e2536] text-gray-300 hover:bg-[#1e2536]/80'
                  }`}
              >
                <Music className="w-5 h-5" />
                <span className="font-medium">MP3 Audio</span>
              </button>
            </div>
          </div>

          {selectedFormat === 'mp4' && (
            <div className="space-y-3">
              <label className="block text-gray-200 text-sm">
                Select Quality
              </label>
              <div className="grid grid-cols-2 gap-2 max-h-[200px] overflow-y-auto pr-1">
                {qualityOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSelectedQuality(option.value)}
                    className={`flex flex-col items-start p-3 rounded-lg border-2 transition-all ${selectedQuality === option.value
                      ? 'border-[#1d4ed8] bg-[#1d4ed8]/10 text-white'
                      : 'border-transparent bg-[#1e2536] text-gray-400 hover:bg-[#1e2536]/80'
                      }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="text-sm font-semibold">{option.label}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#1d4ed8]/20 text-[#3b82f6] font-bold">
                        {option.badge}
                      </span>
                    </div>
                    <span className="text-[10px] opacity-60 font-medium">
                      {option.description}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {error && (
            <div className="text-red-500 text-xs bg-red-500/10 p-3 rounded-lg border border-red-500/20">
              {error}
            </div>
          )}

          {/* Download Button */}
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className={`w-full h-12 rounded-lg text-white font-medium flex items-center justify-center space-x-2 transition-colors disabled:cursor-not-allowed ${isCompleted
              ? 'bg-green-600 hover:bg-green-700'
              : 'bg-[#1d4ed8] hover:bg-[#1e40af] disabled:opacity-50'
              }`}
          >
            {isDownloading ? (
              <div className="flex items-center justify-center space-x-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Downloading... {downloadProgress}%</span>
              </div>
            ) : isCompleted ? (
              <div className="flex items-center justify-center space-x-2">
                <Check className="w-5 h-5" />
                <span>Download Complete!</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <Download className="w-5 h-5" />
                <span>Start Download</span>
              </div>
            )}
          </button>

          {/* Terms */}
          <p className="text-xs text-center text-gray-400">
            By downloading, you agree to our terms and confirm you have rights to use this content
          </p>
        </div>
      </div>
    </div>
  );
};

export default DownloadModal;