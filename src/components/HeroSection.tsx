import React, { useState, useEffect } from 'react';
import { Youtube, Loader2 } from 'lucide-react';
import { detectPlatform } from '../utils/detectPlatform';
import PlatformIcon from './PlatformIcon';

interface HeroSectionProps {
  onUrlSubmit: (url: string) => void;
}

const placeholders = [
  "Paste your YouTube URL here...",
];

const HeroSection: React.FC<HeroSectionProps> = ({ onUrlSubmit }) => {
  const [url, setUrl] = useState('');
  const [platform, setPlatform] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isInputFocused, setIsInputFocused] = useState(false);

  // Update platform when URL changes
  useEffect(() => {
    if (url.trim()) {
      const detectedPlatform = detectPlatform(url);
      setPlatform(detectedPlatform);
    } else {
      setPlatform(null);
    }
  }, [url]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      onUrlSubmit(url);
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section className="min-h-[90vh] flex flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-12 bg-[#1a1f2d]">
      <div className="w-full max-w-4xl mx-auto text-center mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text leading-tight">
          Download Any Video
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
          Easily save content from YouTube with just one click.
        </p>
      </div>

      <div className="w-full max-w-2xl mx-auto px-4">
        <form 
          onSubmit={handleSubmit}
          className="relative bg-[#242938] rounded-xl shadow-lg p-2 sm:p-3 transition-all duration-300"
        >
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div className="flex-1 flex items-center bg-[#1e2536] rounded-lg">
            {platform && (
                <div className="pl-3 sm:pl-4">
                  <PlatformIcon platform={platform} size={20} />
              </div>
            )}
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder={placeholders[placeholderIndex]}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
                className="flex-1 py-3 sm:py-4 px-3 sm:px-4 bg-transparent text-gray-200 border-none outline-none text-base sm:text-lg rounded-lg w-full"
            />
            </div>
            <button
              type="submit"
              disabled={isSubmitting || !url.trim()}
              className={`w-full sm:w-auto px-4 sm:px-6 py-3 sm:py-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                isSubmitting || !url.trim()
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white'
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                'Download'
              )}
            </button>
          </div>
        </form>

        <div className="mt-6 sm:mt-8 flex flex-wrap justify-center items-center gap-4 sm:gap-6">
          <p className="w-full text-center text-gray-400 text-base sm:text-lg mb-2">
            Supported platforms:
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <div className="flex items-center space-x-3 text-gray-300">
              <Youtube size={24} className="text-red-600" />
              <span className="text-lg sm:text-xl">YouTube</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;