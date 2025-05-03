import React from 'react';
import { BookOpen, Search } from 'lucide-react';

const EmptyState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-6 max-w-md mx-auto">
      <div className="bg-blue-100 p-4 rounded-full mb-4">
        <BookOpen className="text-blue-600" size={32} />
      </div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Ready to Study?</h2>
      <p className="text-gray-600 mb-4">
        Enter any topic in the search bar above to get started with your learning journey.
      </p>
      <div className="flex items-center text-blue-600 text-sm mt-2">
        <Search size={16} className="mr-1" />
        <span>Search for topics like "quantum physics" or "world war II"</span>
      </div>
    </div>
  );
};

export default EmptyState;