'use client';

import { useState } from 'react';
import { Quiz, QuizQuestion } from '@/types/quiz';

interface QuizDisplayProps {
  quiz: Quiz;
  onQuizComplete: (answers: Record<string, 'A' | 'B' | 'C' | 'D'>, score: number) => void;
}

export default function QuizDisplay({ quiz, onQuizComplete }: QuizDisplayProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const totalQuestions = quiz.questions.length;

  const handleAnswerSelect = (answer: 'A' | 'B' | 'C' | 'D') => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answer
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    const score = quiz.questions.reduce((total, question) => {
      return total + (answers[question.id] === question.correctAnswer ? 1 : 0);
    }, 0);
    
    onQuizComplete(answers, score);
    setIsSubmitted(true);
  };

  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
  const hasAnsweredCurrent = answers[currentQuestion.id];
  const hasAnsweredAll = quiz.questions.every(q => answers[q.id]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Quiz: {quiz.topic}
        </h1>
        <div className="flex justify-between items-center text-sm text-gray-700">
          <span>Question {currentQuestionIndex + 1} of {totalQuestions}</span>
          <span>{Object.keys(answers).length} of {totalQuestions} answered</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300 text-gray-900"
            style={{ width: `${(Object.keys(answers).length / totalQuestions) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {currentQuestion.question}
        </h2>
        
        <div className="space-y-3">
          {(['A', 'B', 'C', 'D'] as const).map((option) => (
            <button
              key={option}
              onClick={() => handleAnswerSelect(option)}
              className={`w-full p-4 text-left border-2 rounded-lg transition-all duration-200 ${
                answers[currentQuestion.id] === option
                  ? 'border-blue-500 bg-blue-50 text-blue-800'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-900'
              }`}
            >
              <span className="font-medium mr-3">{option}.</span>
              {currentQuestion.options[option]}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>

        <div className="flex space-x-2">
          {quiz.questions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentQuestionIndex(index)}
              className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                index === currentQuestionIndex
                  ? 'bg-blue-600 text-white'
                  : answers[quiz.questions[index].id]
                  ? 'bg-green-100 text-green-700 border border-green-300'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        {isLastQuestion ? (
          <div className="flex flex-col items-end">
            <button
              onClick={handleSubmit}
              disabled={!hasAnsweredAll}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                hasAnsweredAll
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-400 text-gray-200 cursor-not-allowed'
              }`}
            >
              Submit Quiz
            </button>
            {!hasAnsweredAll && (
              <p className="text-xs text-gray-500 mt-1">
                Answer all questions to submit
              </p>
            )}
          </div>
        ) : (
          <button
            onClick={handleNext}
            disabled={!hasAnsweredCurrent}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
