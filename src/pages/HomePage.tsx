import React, { useState } from 'react';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import DownloadSteps from '../components/DownloadSteps';
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
      <FeaturesSection />
      <DownloadSteps />
      <DownloadModal 
        url={downloadUrl}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default HomePage;