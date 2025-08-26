'use client';

import { useState } from 'react';
import TopicInput from '@/components/TopicInput';
import QuizDisplay from '@/components/QuizDisplay';
import QuizResults from '@/components/QuizResults';
import { Quiz } from '@/types/quiz';

type AppState = 'input' | 'loading' | 'quiz' | 'results';

export default function Home() {
  const [appState, setAppState] = useState<AppState>('input');
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [answers, setAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  const [score, setScore] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const generateQuiz = async (topic: string) => {
    setAppState('loading');
    setError(null);

    try {
      const response = await fetch('/api/generate-quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate quiz');
      }

      const data = await response.json();
      setQuiz(data.quiz);
      setAppState('quiz');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setAppState('input');
    }
  };

  const handleQuizComplete = (userAnswers: Record<string, 'A' | 'B' | 'C' | 'D'>, userScore: number) => {
    setAnswers(userAnswers);
    setScore(userScore);
    setAppState('results');
  };

  const handleRetake = () => {
    setAnswers({});
    setScore(0);
    setAppState('quiz');
  };

  const handleNewQuiz = () => {
    setQuiz(null);
    setAnswers({});
    setScore(0);
    setError(null);
    setAppState('input');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="container mx-auto">
        {error && (
          <div className="max-w-2xl mx-auto mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Error generating quiz
                </h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {appState === 'input' && (
          <TopicInput 
            onGenerateQuiz={generateQuiz} 
            isLoading={false} 
          />
        )}

        {appState === 'loading' && (
          <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Generating Your Quiz
            </h2>
            <p className="text-gray-600">
              Our AI is creating personalized questions for you...
            </p>
          </div>
        )}

        {appState === 'quiz' && quiz && (
          <QuizDisplay 
            quiz={quiz} 
            onQuizComplete={handleQuizComplete} 
          />
        )}

        {appState === 'results' && quiz && (
          <QuizResults 
            quiz={quiz}
            answers={answers}
            score={score}
            onRetake={handleRetake}
            onNewQuiz={handleNewQuiz}
          />
        )}
      </div>
    </main>
  );
}
