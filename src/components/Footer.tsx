import React from 'react';
import { Link } from './Link';
import { Instagram, Linkedin, Twitter, Youtube, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-100 dark:bg-slate-900 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text">
              VideoGrab
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-md">
              VideoGrab allows you to download videos and images from popular social media platforms for personal use.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                <Youtube size={20} />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                <Facebook size={20} />
              </a>
            </div>
          </div>
          
          <div className="col-span-1">
            <h4 className="font-medium text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-600 dark:text-gray-400">Home</Link></li>
              <li><Link href="/about" className="text-gray-600 dark:text-gray-400">About</Link></li>
              <li><Link href="/contact" className="text-gray-600 dark:text-gray-400">Contact</Link></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h4 className="font-medium text-lg mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="text-gray-600 dark:text-gray-400">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-gray-600 dark:text-gray-400">Terms & Conditions</Link></li>
              <li><Link href="/disclaimer" className="text-gray-600 dark:text-gray-400">Disclaimer</Link></li>
              <li><Link href="/dmca" className="text-gray-600 dark:text-gray-400">DMCA</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
            &copy; {currentYear} VideoGrab. All rights reserved. VideoGrab does not host any copyrighted content.
          </p>
          <p className="text-center text-gray-500 dark:text-gray-500 text-xs mt-2">
            This tool is intended for personal use only and for content you own the rights to.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;