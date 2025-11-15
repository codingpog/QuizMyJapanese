import React from "react";
import type { QuizQuestion } from "../types";
import Quiz from "../components/Quiz";
import Header from "./Header";
import { useLocation } from "react-router-dom";

function QuizPage(): React.JSX.Element {
  // location is used to get state passed via navigation
  const location = useLocation();
  const quizData = location.state?.quizData as QuizQuestion[];

  return (
    <>
      <Header />
      {<Quiz quizData={quizData} />}
    </>
  );
}

export default QuizPage;
