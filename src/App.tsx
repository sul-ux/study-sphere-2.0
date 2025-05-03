import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import HighlightCard from './components/HighlightCard';
import Quiz from './components/Quiz';
import EmptyState from './components/EmptyState';
import LoadingState from './components/LoadingState';
import { BookOpen } from 'lucide-react';
import { fetchHighlights, fetchQuizQuestions, HighlightCard as HighlightCardType, QuizQuestion } from './services/geminiService';

function App() {
  const [searchTopic, setSearchTopic] = useState('');
  const [highlights, setHighlights] = useState<HighlightCardType[]>([]);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'search' | 'highlights' | 'quiz'>('search');

  const handleSearch = async (topic: string) => {
    setSearchTopic(topic);
    setIsLoading(true);
    try {
      const highlightData = await fetchHighlights(topic);
      setHighlights(highlightData);
      setCurrentCardIndex(0);
      setViewMode('highlights');
    } catch (error) {
      console.error('Error fetching highlights:', error);
      // Handle error
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextCard = () => {
    if (currentCardIndex < highlights.length - 1) {
      setCurrentCardIndex(prev => prev + 1);
    }
  };

  const handlePreviousCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(prev => prev - 1);
    }
  };

  const handleStartQuiz = async () => {
    setIsLoading(true);
    try {
      const quizData = await fetchQuizQuestions(searchTopic);
      setQuizQuestions(quizData);
      setViewMode('quiz');
    } catch (error) {
      console.error('Error fetching quiz questions:', error);
      // Handle error
    } finally {
      setIsLoading(false);
    }
  };

  const handleFinishQuiz = () => {
    setViewMode('search');
    setSearchTopic('');
    setHighlights([]);
    setQuizQuestions([]);
  };

  const renderContent = () => {
    if (isLoading) {
      return <LoadingState />;
    }

    switch (viewMode) {
      case 'highlights':
        return highlights.length > 0 ? (
          <HighlightCard
            card={highlights[currentCardIndex]}
            currentIndex={currentCardIndex}
            totalCards={highlights.length}
            onNext={handleNextCard}
            onPrevious={handlePreviousCard}
            onStartQuiz={handleStartQuiz}
          />
        ) : null;
      case 'quiz':
        return quizQuestions.length > 0 ? (
          <Quiz 
            questions={quizQuestions} 
            onFinish={handleFinishQuiz}
            topic={searchTopic}
          />
        ) : null;
      case 'search':
      default:
        return <EmptyState />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="pt-8 pb-6">
        <div className="container mx-auto px-4">
          <div className="flex justify-center mb-4">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <BookOpen className="text-white" size={24} />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">Study Sphere</h1>
            </div>
          </div>
          
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {searchTopic && !isLoading && viewMode === 'highlights' && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-center text-gray-800">
                Study Topic: <span className="text-blue-600">{searchTopic}</span>
              </h2>
            </div>
          )}
          
          {renderContent()}
        </div>
      </main>

      <footer className="py-6 mt-auto">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Study Sphere - Powered by Gemini AI
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;