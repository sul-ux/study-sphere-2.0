import React, { useState } from 'react';
import { CheckCircle2, XCircle, RefreshCw, ArrowLeft } from 'lucide-react';
import { QuizQuestion } from '../services/geminiService';

interface QuizProps {
  questions: QuizQuestion[];
  onFinish: () => void;
  topic: string;
}

const Quiz: React.FC<QuizProps> = ({ questions, onFinish, topic }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>(Array(questions.length).fill(''));
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  
  const handleAnswerSelect = (answer: string) => {
    if (isSubmitted) return;
    
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answer;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setIsSubmitted(false);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setIsSubmitted(false);
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers(Array(questions.length).fill(''));
    setIsSubmitted(false);
    setShowResults(false);
  };

  const calculateScore = () => {
    return questions.reduce((score, question, index) => {
      return score + (selectedAnswers[index] === question.correctAnswer ? 1 : 0);
    }, 0);
  };

  if (showResults) {
    const score = calculateScore();
    const percentage = Math.round((score / questions.length) * 100);
    
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl w-full mx-auto">
        <h2 className="text-2xl font-bold text-center mb-6">Quiz Results</h2>
        
        <div className="text-center mb-6">
          <div className="text-5xl font-bold mb-2">
            {percentage}%
          </div>
          <p className="text-lg">
            You got <span className="font-semibold">{score}</span> out of <span className="font-semibold">{questions.length}</span> questions correct
          </p>
        </div>
        
        <div className="space-y-4 mb-8">
          {questions.map((question, index) => (
            <div key={question.id} className="p-4 rounded-lg border">
              <div className="flex items-start">
                <div className="mr-2 mt-1">
                  {selectedAnswers[index] === question.correctAnswer ? (
                    <CheckCircle2 className="text-green-500" size={20} />
                  ) : (
                    <XCircle className="text-red-500" size={20} />
                  )}
                </div>
                <div>
                  <p className="font-medium">{question.question}</p>
                  <p className="text-sm mt-1">
                    <span className="font-medium">Your answer:</span> {selectedAnswers[index] || "No answer"}
                  </p>
                  {selectedAnswers[index] !== question.correctAnswer && (
                    <p className="text-sm mt-1 text-green-600">
                      <span className="font-medium">Correct answer:</span> {question.correctAnswer}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleRetry}
            className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors flex items-center"
          >
            <RefreshCw size={18} className="mr-2" /> Try Again
          </button>
          <button
            onClick={onFinish}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 transition-colors flex items-center"
          >
            <ArrowLeft size={18} className="mr-2" /> Back to Study
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl w-full mx-auto">
      <h2 className="text-xl font-semibold text-center mb-6">Quiz on {topic}</h2>
      
      <div className="mb-8">
        <div className="text-sm text-gray-500 mb-2">
          Question {currentQuestionIndex + 1} of {questions.length}
        </div>
        <div className="h-2 bg-gray-200 rounded-full">
          <div 
            className="h-2 bg-blue-600 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-4">{currentQuestion.question}</h3>
        
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(option)}
              disabled={isSubmitted}
              className={`w-full text-left p-3 rounded-lg border transition-all ${
                selectedAnswers[currentQuestionIndex] === option
                  ? isSubmitted
                    ? option === currentQuestion.correctAnswer
                      ? 'bg-green-100 border-green-500'
                      : 'bg-red-100 border-red-500'
                    : 'bg-blue-100 border-blue-500'
                  : isSubmitted && option === currentQuestion.correctAnswer
                  ? 'bg-green-100 border-green-500'
                  : 'hover:bg-gray-100 border-gray-300'
              }`}
            >
              <span className="font-medium mr-2">{String.fromCharCode(65 + index)}.</span>
              {option}
            </button>
          ))}
        </div>
      </div>
      
      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className="px-4 py-2 text-blue-600 bg-white border border-blue-600 rounded-full hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
          <ArrowLeft size={18} className="mr-1" /> Previous
        </button>
        
        {!isSubmitted ? (
          <button
            onClick={handleSubmit}
            disabled={!selectedAnswers[currentQuestionIndex]}
            className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Check Answer
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
          >
            {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'See Results'}
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;