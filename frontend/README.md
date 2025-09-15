# Quiz My Japanese

Quiz My Japanese is a React + TypeScript web app that generates multiple-choice reading comprehension quizzes from Japanese text passages using the DeepSeek (OpenAI-compatible) API.

![QuizMyJapanese Screenshot](./src/assets/appLogo.png)

## Features

- Enter a Japanese passage and generate 3 English reading comprehension questions.
- Each question has 1 correct answer and 3 distractors.
- Interactive quiz interface with instant feedback and scoring.
- Built with React, TypeScript, and Vite.

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- An API key for [DeepSeek](https://deepseek.com/) or another OpenAI-compatible provider

### Installation

1. Clone this repository:

   ```sh
   git clone https://github.com/yourusername/quizmyjapanese.git
   cd quizmyjapanese
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Add your API key  
   Edit [`src/ai.ts`](src/ai.ts) and insert your API key in the `apiKey` field.

### Running the App

Start the development server:

```sh
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

```sh
npm run build
```

### Linting

```sh
npm run lint
```

## Project Structure

- [`src/App.tsx`](src/App.tsx): Main app component
- [`src/components/Header.tsx`](src/components/Header.tsx): App header
- [`src/components/Body.tsx`](src/components/Body.tsx): Handles quiz generation and display
- [`src/components/Quiz.tsx`](src/components/Quiz.tsx): Quiz UI and logic
- [`src/ai.ts`](src/ai.ts): Handles API calls to generate quiz questions
- [`src/types.ts`](src/types.ts): Type definitions
