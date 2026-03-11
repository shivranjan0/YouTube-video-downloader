import React, { useState, useEffect } from 'react';

const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem('cookieConsent');
    if (!hasConsented) {
      // Wait a moment before showing the banner
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-white/10 shadow-2xl z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="text-sm text-gray-300">
            This website uses cookies to ensure you get the best experience on our website.
          </p>
          <a href="/privacy" className="text-sm text-brand-cyan hover:underline">
            Learn more
          </a>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleAccept}
            className="px-6 py-2 bg-brand-purple hover:bg-brand-purple/90 text-white rounded-lg text-sm font-bold transition-all"
          >
            Accept
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg text-sm font-medium transition-colors"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
