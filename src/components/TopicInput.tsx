'use client';

import { useState } from 'react';

interface TopicInputProps {
  onGenerateQuiz: (topic: string) => void;
  isLoading: boolean;
}

export default function TopicInput({ onGenerateQuiz, isLoading }: TopicInputProps) {
  const [topic, setTopic] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim() && !isLoading) {
      onGenerateQuiz(topic.trim());
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        AI-Powered Quiz Builder
      </h1>
      <p className="text-gray-700 text-center mb-8">
        Enter any topic and let AI generate a personalized quiz for you!
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="topic" className="block text-sm font-medium text-gray-800 mb-2">
            What would you like to learn about?
          </label>
          <input
            type="text"
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., Photosynthesis, Neural Networks, Ancient Rome..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-gray-900"
            disabled={isLoading}
          />
        </div>
        
        <button
          type="submit"
          disabled={!topic.trim() || isLoading}
                      className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Generating Quiz...
            </div>
          ) : (
            'Generate Quiz'
          )}
        </button>
      </form>
      
      <div className="mt-6 text-sm text-gray-600 text-center">
        <p>Examples: Machine Learning, World War II, Quantum Physics, Shakespeare</p>
      </div>
    </div>
  );
}
