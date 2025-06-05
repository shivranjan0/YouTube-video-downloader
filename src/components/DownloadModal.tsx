import React, { useState, useEffect } from 'react';
import { X, Check, Loader2, Music, Image, Video, Download } from 'lucide-react';
import { downloadMedia } from '../services/api';

interface DownloadModalProps {
  url: string;
  isOpen: boolean;
  onClose: () => void;
}

const formatOptions = [
  { value: 'mp4', label: 'MP4 Video', icon: <Video className="w-5 h-5" /> },
  { value: 'mp3', label: 'MP3 Audio', icon: <Music className="w-5 h-5" /> }
];

const qualityOptions = [
  { 
    value: '1080p', 
    label: '1080p (HD)', 
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
        quality: '720p',
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
                className={`flex items-center justify-center space-x-2 p-4 rounded-lg transition-colors ${
                  selectedFormat === 'mp4'
                    ? 'bg-[#1d4ed8] text-white'
                    : 'bg-[#1e2536] text-gray-300 hover:bg-[#1e2536]/80'
                    }`}
                  >
                <Video className="w-5 h-5" />
                <span className="font-medium">MP4 Video</span>
                  </button>
                    <button
                onClick={() => setSelectedFormat('mp3')}
                className={`flex items-center justify-center space-x-2 p-4 rounded-lg transition-colors ${
                  selectedFormat === 'mp3'
                    ? 'bg-[#1d4ed8] text-white'
                    : 'bg-[#1e2536] text-gray-300 hover:bg-[#1e2536]/80'
                }`}
              >
                <Music className="w-5 h-5" />
                <span className="font-medium">MP3 Audio</span>
                    </button>
                </div>
              </div>

          {/* Download Button */}
            <button
              onClick={handleDownload}
              disabled={isDownloading}
            className={`w-full h-12 rounded-lg text-white font-medium flex items-center justify-center space-x-2 transition-colors disabled:cursor-not-allowed ${
              isCompleted 
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