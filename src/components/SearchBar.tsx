import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (topic: string) => void;
  isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [topic, setTopic] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim() && !isLoading) {
      onSearch(topic.trim());
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          placeholder="What would you like to study today?"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full px-4 py-3 pl-12 text-lg rounded-full border-2 border-blue-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !topic.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-full transition-colors disabled:bg-blue-300"
        >
          {isLoading ? 'Loading...' : 'Search'}
        </button>
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" size={20} />
      </form>
    </div>
  );
};

export default SearchBar;