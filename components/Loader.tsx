
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center z-50">
      <div className="w-16 h-16 border-4 border-t-red-500 border-gray-200 rounded-full animate-spin"></div>
      <p className="text-white text-lg mt-4 font-semibold">AI is creating magic...</p>
      <p className="text-gray-300 text-sm mt-1">This might take a moment.</p>
    </div>
  );
};

export default Loader;
