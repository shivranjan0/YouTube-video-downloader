import React from 'react';
import { Link } from 'lucide-react';
import { Clipboard, MousePointer, Download, FileType } from 'lucide-react';

const steps = [
  {
    title: 'Copy the URL',
    description: 'Find the video or image you want to download and copy its URL from the address bar or share menu.',
    icon: <Clipboard className="w-8 h-8 text-purple-600" />,
    number: 1,
  },
  {
    title: 'Paste the Link',
    description: 'Paste the copied URL into the input box on our homepage.',
    icon: <Link className="w-8 h-8 text-purple-600" />,
    number: 2,
  },
  {
    title: 'Click Download',
    description: 'Press the download button and wait for our system to process the link.',
    icon: <MousePointer className="w-8 h-8 text-purple-600" />,
    number: 3,
  },
  {
    title: 'Save Your File',
    description: 'Choose your preferred format and quality, then download the file to your device.',
    icon: <FileType className="w-8 h-8 text-purple-600" />,
    number: 4,
  },
];

const DownloadSteps: React.FC = () => {
  return (
    <section className="py-20 px-6 bg-gray-50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text">
              How to Download
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Follow these simple steps to download any video or image from supported platforms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 bg-gradient-to-br from-purple-600 to-blue-500 text-white w-10 h-10 flex items-center justify-center rounded-bl-lg font-bold">
                {step.number}
              </div>
              <div className="mb-6">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DownloadSteps;