import React, { useState } from 'react';
import HeroSection from '../components/HeroSection';
import DownloadSteps from '../components/DownloadSteps';
import FaqSection from '../components/FaqSection';
import DownloadModal from '../components/DownloadModal';

const HomePage: React.FC = () => {
  const [downloadUrl, setDownloadUrl] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUrlSubmit = (url: string) => {
    setDownloadUrl(url);
    setIsModalOpen(true);
  };

  return (
    <div>
      <HeroSection onUrlSubmit={handleUrlSubmit} />
      <DownloadSteps />
      <FaqSection />
      <DownloadModal url={downloadUrl} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default HomePage;
