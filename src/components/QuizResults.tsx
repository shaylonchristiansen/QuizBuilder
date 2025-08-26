'use client';

import { Quiz } from '@/types/quiz';

interface QuizResultsProps {
  quiz: Quiz;
  answers: Record<string, 'A' | 'B' | 'C' | 'D'>;
  score: number;
  onRetake: () => void;
  onNewQuiz: () => void;
}

export default function QuizResults({ quiz, answers, score, onRetake, onNewQuiz }: QuizResultsProps) {
  const totalQuestions = quiz.questions.length;
  const percentage = Math.round((score / totalQuestions) * 100);

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreMessage = (percentage: number) => {
    if (percentage >= 80) return 'Excellent! Great job!';
    if (percentage >= 60) return 'Good work! Keep learning!';
    return 'Keep practicing! You\'ll get better!';
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Score Summary */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Quiz Results
        </h1>
        <div className="mb-4">
          <div className={`text-6xl font-bold ${getScoreColor(percentage)}`}>
            {score}/{totalQuestions}
          </div>
          <div className={`text-2xl font-semibold ${getScoreColor(percentage)}`}>
            {percentage}%
          </div>
        </div>
        <p className="text-lg text-gray-700 mb-6">
          {getScoreMessage(percentage)}
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={onRetake}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retake Quiz
          </button>
          <button
            onClick={onNewQuiz}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            New Quiz
          </button>
        </div>
      </div>

      {/* Detailed Results */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2">
          Question Review
        </h2>
        
        {quiz.questions.map((question, index) => {
          const userAnswer = answers[question.id];
          const isCorrect = userAnswer === question.correctAnswer;
          
          return (
            <div
              key={question.id}
              className={`p-4 border-2 rounded-lg ${
                isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-medium text-gray-800">
                  Question {index + 1}
                </h3>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    isCorrect
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {isCorrect ? 'Correct' : 'Incorrect'}
                </span>
              </div>
              
              <p className="text-gray-700 mb-4">{question.question}</p>
              
              <div className="space-y-2 mb-4">
                {(['A', 'B', 'C', 'D'] as const).map((option) => {
                  const isUserAnswer = userAnswer === option;
                  const isCorrectAnswer = question.correctAnswer === option;
                  
                  let className = 'p-3 rounded-lg border-2';
                  if (isCorrectAnswer) {
                    className += ' border-green-500 bg-green-100 text-green-800';
                  } else if (isUserAnswer && !isCorrect) {
                    className += ' border-red-500 bg-red-100 text-red-800';
                  } else {
                    className += ' border-gray-200 bg-gray-50 text-gray-700';
                  }
                  
                  return (
                    <div key={option} className={className}>
                      <span className="font-medium mr-2">{option}.</span>
                      {question.options[option]}
                      {isCorrectAnswer && (
                        <span className="ml-2 text-sm font-medium">✓ Correct Answer</span>
                      )}
                      {isUserAnswer && !isCorrect && (
                        <span className="ml-2 text-sm font-medium">✗ Your Answer</span>
                      )}
                    </div>
                  );
                })}
              </div>
              
              {question.explanation && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-sm text-blue-800">
                    <span className="font-medium">Explanation:</span> {question.explanation}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
