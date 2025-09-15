import type { QuizQuestion } from "../types";
import React from "react";

type QuizProps = {
    quizData: QuizQuestion[];
};

function Quiz({quizData}: QuizProps): React.JSX.Element {
    const [currentIndex, setCurrentIndex] = React.useState<number>(0);
    const [score, setScore] = React.useState<number>(0);
    const [showResult, setShowResult] = React.useState<boolean>(false);
    const [selectedOption, setSelectedOption] = React.useState<string|null>(null);
  
    const currentQuestion: QuizQuestion = quizData[currentIndex];
  
    function handleAnswer(option: string): void {
      if (selectedOption) return;
  
      setSelectedOption(option);
  
      if (option === currentQuestion.answer) {
        setScore((prev) => prev + 1);
      }
  
      setTimeout(() => {
        const next = currentIndex + 1;
        if (next < quizData.length) {
          setCurrentIndex(next);
          setSelectedOption(null);
        } else {
          setShowResult(true);
        }
      }, 1200);
    }
  
    function resetQuiz(): void {
      setScore(0);
      setCurrentIndex(0);
      setSelectedOption(null);
      setShowResult(false);
    }
  
    function getButtonClass(option: string): string {
      if (!selectedOption) return "";
      if (option === currentQuestion.answer) return "correct";
      if (option === selectedOption) return "incorrect";
      return "dimmed";
    }
  
    return (
      <main className="quiz-app">
        {showResult ? (
          <div>
            <h2>Your Score: {score} / {quizData.length}</h2>
            <button onClick={resetQuiz}>Play Again</button>
          </div>
        ) : (
          <div>
            <h2>Question {currentIndex + 1} of {quizData.length}</h2>
            <p>{currentQuestion.question}</p>
            <div>
              {currentQuestion.options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleAnswer(option)}
                  disabled={!!selectedOption}
                  className={getButtonClass(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}
      </main>
    );
}

export default Quiz;