export interface QuizQuestion {
  id: string;
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation?: string;
}

export interface Quiz {
  id: string;
  topic: string;
  questions: QuizQuestion[];
  createdAt: Date;
}

export interface QuizSubmission {
  quizId: string;
  answers: Record<string, 'A' | 'B' | 'C' | 'D'>;
  score: number;
  totalQuestions: number;
  submittedAt: Date;
}

export interface GenerateQuizRequest {
  topic: string;
}

export interface GenerateQuizResponse {
  quiz: Quiz;
}
