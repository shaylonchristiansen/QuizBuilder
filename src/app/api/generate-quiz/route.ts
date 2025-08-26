import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { Quiz, QuizQuestion, GenerateQuizRequest } from '@/types/quiz';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const body: GenerateQuizRequest = await request.json();
    const { topic } = body;

    if (!topic || topic.trim().length === 0) {
      return NextResponse.json(
        { error: 'Topic is required' },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    // Generate quiz using OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are an expert quiz creator. Create exactly 5 multiple-choice questions about the given topic. 
          
          Requirements:
          - Each question should have exactly 4 options (A, B, C, D)
          - Only one option should be correct
          - Questions should be educational and factual
          - Vary the difficulty level
          - Provide a brief explanation for the correct answer
          
          Return the response as a JSON object with this exact structure:
          {
            "questions": [
              {
                "id": "1",
                "question": "Question text here?",
                "options": {
                  "A": "Option A",
                  "B": "Option B", 
                  "C": "Option C",
                  "D": "Option D"
                },
                "correctAnswer": "A",
                "explanation": "Brief explanation of why this is correct"
              }
            ]
          }`
        },
        {
          role: "user",
          content: `Create a quiz about: ${topic}`
        }
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const responseContent = completion.choices[0]?.message?.content;
    
    if (!responseContent) {
      throw new Error('No response from OpenAI');
    }

    // Parse the JSON response
    let quizData;
    try {
      quizData = JSON.parse(responseContent);
    } catch (parseError) {
      console.error('Failed to parse OpenAI response:', responseContent);
      throw new Error('Invalid response format from AI');
    }

    // Validate and structure the quiz
    const questions: QuizQuestion[] = quizData.questions.map((q: any, index: number) => ({
      id: q.id || (index + 1).toString(),
      question: q.question,
      options: {
        A: q.options.A,
        B: q.options.B,
        C: q.options.C,
        D: q.options.D,
      },
      correctAnswer: q.correctAnswer,
      explanation: q.explanation,
    }));

    const quiz: Quiz = {
      id: `quiz_${Date.now()}`,
      topic: topic.trim(),
      questions,
      createdAt: new Date(),
    };

    return NextResponse.json({ quiz });

  } catch (error) {
    console.error('Error generating quiz:', error);
    return NextResponse.json(
      { error: 'Failed to generate quiz' },
      { status: 500 }
    );
  }
}
