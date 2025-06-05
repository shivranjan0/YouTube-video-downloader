import React from 'react';
import DownloadSteps from '../components/DownloadSteps';

const HowToPage: React.FC = () => {
  return (
    <div className="pt-20">
      <div className="bg-gradient-to-br from-purple-600 to-blue-500 text-white py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">How to Download</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Follow our simple guide to download your favorite videos and images from social media platforms.
          </p>
        </div>
      </div>
      
      <DownloadSteps />
      
      <section className="py-20 px-6 bg-white dark:bg-slate-900">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text">
            Detailed Instructions
          </h2>
          
          <div className="space-y-12">
            <div>
              <h3 className="text-xl font-semibold mb-4">1. Finding and Copying the URL</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                The first step is to locate the video or image you want to download on the respective platform.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                <li>
                  <strong>YouTube:</strong> Open the video and copy the URL from your browser's address bar or click the "Share" button beneath the video and copy the link.
                </li>
                <li>
                  <strong>Instagram:</strong> Navigate to the post you want to download. Click on the three dots (⋯) and select "Copy Link" from the menu.
                </li>
                <li>
                  <strong>TikTok:</strong> Open the video, tap the share icon (arrow), and select "Copy link".
                </li>
                <li>
                  <strong>Facebook:</strong> Click on the video to open it in theater mode, then click the three dots and select "Copy link".
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">2. Pasting the URL</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Once you've copied the URL, return to VideoGrab:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                <li>Paste the URL into the search bar on our homepage.</li>
                <li>Our system will automatically detect which platform the URL is from.</li>
                <li>You'll see the platform icon appear to confirm successful detection.</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">3. Processing and Downloading</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                After clicking the "Download" button:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                <li>Our system will process the URL and extract the media.</li>
                <li>You'll be presented with format options (MP4, MP3, JPG, etc.) depending on the content type.</li>
                <li>For videos, you can select your preferred quality (1080p, 720p, etc.).</li>
                <li>Click "Download Now" to save the file to your device.</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Troubleshooting</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                If you encounter any issues:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                <li>Ensure the URL is correct and from a supported platform.</li>
                <li>Check that the content is publicly accessible (not private or restricted).</li>
                <li>Try refreshing the page and attempting the download again.</li>
                <li>If problems persist, contact our support team for assistance.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowToPage;