
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
            <i className="fa-solid fa-bolt text-3xl text-red-600"></i>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                ThumbnailAI Pro
            </h1>
        </div>
        <a 
            href="https://github.com/google/genai-js" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500 transition"
            aria-label="View on GitHub"
        >
            <i className="fab fa-github fa-2x"></i>
        </a>
      </div>
    </header>
  );
};

export default Header;
