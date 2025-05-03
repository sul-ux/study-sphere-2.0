import React from 'react';

const LoadingState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mb-4"></div>
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Generating Content</h2>
      <p className="text-gray-600 text-center max-w-md">
        Our AI is preparing your personalized study materials. This might take a few moments...
      </p>
    </div>
  );
};

export default LoadingState;