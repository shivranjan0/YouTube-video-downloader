import React from 'react';
import { Youtube, Instagram, Atom as Tiktok, Facebook, Globe } from 'lucide-react';

interface PlatformIconProps {
  platform: string;
  size?: number;
}

const PlatformIcon: React.FC<PlatformIconProps> = ({ platform, size = 20 }) => {
  switch (platform.toLowerCase()) {
    case 'youtube':
      return <Youtube size={size} className="text-red-600" />;
    case 'instagram':
      return <Instagram size={size} className="text-pink-600" />;
    case 'tiktok':
      return <Tiktok size={size} className="text-black dark:text-white" />;
    case 'facebook':
      return <Facebook size={size} className="text-blue-600" />;
    default:
      return <Globe size={size} className="text-gray-600 dark:text-gray-400" />;
  }
};

export default PlatformIcon;