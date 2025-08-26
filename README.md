# AI-Powered Quiz Builder

A modern web application that generates personalized multiple-choice quizzes using AI. Built with Next.js, TypeScript, and OpenAI's GPT-3.5-turbo.

## Features

- 🤖 **AI-Powered Quiz Generation**: Uses OpenAI's GPT-3.5-turbo to create educational quizzes on any topic
- 📝 **Interactive Quiz Interface**: Clean, modern UI for taking quizzes with real-time progress tracking
- 📊 **Detailed Results**: Comprehensive feedback with correct answers and explanations
- 🎨 **Modern Design**: Beautiful, responsive interface built with Tailwind CSS
- ⚡ **TypeScript**: Full type safety and better development experience
- 🔄 **Retake & New Quiz**: Easy navigation between different quiz modes

## Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS
- **AI Integration**: OpenAI GPT-3.5-turbo
- **Architecture**: App Router, API Routes
- **Development**: ESLint, PostCSS

## Getting Started

### Prerequisites

- Node.js 18+ (recommended)
- npm or yarn
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd quiz-builder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   ```
   
   Get your OpenAI API key from: https://platform.openai.com/api-keys

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

1. **Enter a Topic**: Type any educational topic (e.g., "Photosynthesis", "Neural Networks", "Ancient Rome")
2. **Generate Quiz**: Click "Generate Quiz" and wait for AI to create 5 multiple-choice questions
3. **Take the Quiz**: Answer each question by selecting from options A, B, C, or D
4. **Review Results**: See your score, correct answers, and explanations
5. **Retake or New Quiz**: Choose to retake the same quiz or generate a new one

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── generate-quiz/
│   │       └── route.ts          # API endpoint for quiz generation
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main application page
├── components/
│   ├── TopicInput.tsx            # Topic input form
│   ├── QuizDisplay.tsx           # Quiz interface
│   └── QuizResults.tsx           # Results display
└── types/
    └── quiz.ts                   # TypeScript type definitions
```

## API Endpoints

### POST /api/generate-quiz

Generates a quiz based on the provided topic.

**Request Body:**
```json
{
  "topic": "string"
}
```

**Response:**
```json
{
  "quiz": {
    "id": "string",
    "topic": "string",
    "questions": [
      {
        "id": "string",
        "question": "string",
        "options": {
          "A": "string",
          "B": "string",
          "C": "string",
          "D": "string"
        },
        "correctAnswer": "A|B|C|D",
        "explanation": "string"
      }
    ],
    "createdAt": "Date"
  }
}
```

## Architecture Decisions

### Frontend Framework
- **Next.js 15**: Chosen for its excellent TypeScript support, built-in API routes, and modern React features
- **App Router**: Provides better performance and simpler routing compared to Pages Router

### AI Integration
- **OpenAI GPT-3.5-turbo**: Selected for its reliability, cost-effectiveness, and strong performance on educational content generation
- **Structured Prompts**: Carefully crafted system prompts ensure consistent, high-quality quiz generation

### State Management
- **React useState**: Simple state management sufficient for this MVP
- **Component Composition**: Clean separation of concerns with reusable components

### Styling
- **Tailwind CSS**: Rapid development with utility-first approach
- **Responsive Design**: Mobile-first approach ensures great experience on all devices

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Quality

- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting (recommended)

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your `OPENAI_API_KEY` to Vercel environment variables
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Future Enhancements

- [ ] **Retrieval-Augmented Generation**: Use Wikipedia or other knowledge bases for improved accuracy
- [ ] **Quiz History**: Save and review past quiz results
- [ ] **Difficulty Levels**: Allow users to select quiz difficulty
- [ ] **Question Types**: Support for different question formats
- [ ] **User Authentication**: Personal quiz history and preferences
- [ ] **Social Features**: Share quizzes with friends

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For questions or issues, please open a GitHub issue or contact the development team.
