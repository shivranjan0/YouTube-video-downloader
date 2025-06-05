import React from 'react';
import { Shield, Lock, FileQuestion } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="pt-20">
      <div className="bg-gradient-to-br from-purple-600 to-blue-500 text-white py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About VideoGrab</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Learn more about our service and our commitment to providing a safe, easy-to-use tool for downloading content.
          </p>
        </div>
      </div>
      
      <section className="py-20 px-6 bg-white dark:bg-slate-900">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-12">
            <div>
              <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text">
                Our Mission
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                VideoGrab was created with a simple mission: to provide users with an easy, reliable way to save and enjoy content from their favorite social media platforms. We believe in making technology accessible to everyone, regardless of technical expertise.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text">
                How It Works
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                VideoGrab uses advanced algorithms to extract media content from supported platforms. When you paste a URL, our system:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-300">
                <li>Analyzes the link to determine its source platform</li>
                <li>Securely connects to retrieve the media content</li>
                <li>Processes the content to make it downloadable</li>
                <li>Provides various format and quality options when available</li>
                <li>Delivers the file directly to your device without storing it on our servers</li>
              </ol>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="flex flex-col items-center text-center">
                <div className="bg-purple-100 dark:bg-purple-900/30 p-4 rounded-full mb-4">
                  <Shield className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No Content Hosting</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We don't host or store any copyrighted content on our servers. Our service only facilitates downloading.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="bg-purple-100 dark:bg-purple-900/30 p-4 rounded-full mb-4">
                  <Lock className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Privacy First</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We respect your privacy and don't track or store the content you download or personal information.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="bg-purple-100 dark:bg-purple-900/30 p-4 rounded-full mb-4">
                  <FileQuestion className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Ethical Usage</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We advocate for the ethical use of our tool, encouraging users to respect copyright laws and creators' rights.
                </p>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text">
                Legal Disclaimer
              </h2>
              <div className="bg-gray-50 dark:bg-slate-800 p-6 rounded-xl">
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  VideoGrab is designed for personal use only. Users should comply with the following guidelines:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                  <li>Only download content you have the right to access</li>
                  <li>Respect copyright laws and intellectual property rights</li>
                  <li>Do not use downloaded content for commercial purposes without proper authorization</li>
                  <li>Be aware that downloading certain content may violate terms of service of the original platforms</li>
                </ul>
                <p className="text-gray-600 dark:text-gray-300 mt-4">
                  VideoGrab does not encourage or condone copyright infringement or any illegal activities. We are not responsible for how users utilize our service.
                </p>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text">
                Our Team
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                VideoGrab was developed by a team of passionate developers and designers committed to creating useful, user-friendly tools. We continually work to improve our service and add support for more platforms based on user feedback.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;