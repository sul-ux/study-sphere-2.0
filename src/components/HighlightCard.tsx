import React from 'react';
import { ChevronRight, ChevronLeft, Lightbulb } from 'lucide-react';
import { HighlightCard as HighlightCardType } from '../services/geminiService';

interface HighlightCardProps {
  card: HighlightCardType;
  currentIndex: number;
  totalCards: number;
  onNext: () => void;
  onPrevious: () => void;
  onStartQuiz: () => void;
}

const HighlightCard: React.FC<HighlightCardProps> = ({
  card,
  currentIndex,
  totalCards,
  onNext,
  onPrevious,
  onStartQuiz,
}) => {
  const isLastCard = currentIndex === totalCards - 1;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl w-full mx-auto transform transition-all duration-300 ease-in-out hover:shadow-xl">
      <div className="flex items-center mb-4">
        <Lightbulb className="text-yellow-500 mr-2" size={24} />
        <h2 className="text-xl font-semibold text-gray-800">{card.title}</h2>
      </div>
      
      <div className="my-6">
        <p className="text-gray-700 leading-relaxed">{card.content}</p>
      </div>
      
      <div className="mt-8 flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Card {currentIndex + 1} of {totalCards}
        </div>
        
        <div className="flex space-x-3">
          <button
            onClick={onPrevious}
            disabled={currentIndex === 0}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous card"
          >
            <ChevronLeft size={20} />
          </button>
          
          {isLastCard ? (
            <button
              onClick={onStartQuiz}
              className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors flex items-center justify-center"
            >
              Start Quiz
            </button>
          ) : (
            <button
              onClick={onNext}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              aria-label="Next card"
            >
              <ChevronRight size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HighlightCard;