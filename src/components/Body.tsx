import React from "react"
import type { QuizQuestion } from "../types"
import Quiz from "./Quiz"
import Form from "./Form"

function Body(): React.JSX.Element {
  const [quizData, setQuizData] = React.useState<QuizQuestion[]>([])

  return (
    <main>
        {quizData.length == 0 && <Form setQuizData={setQuizData} />}
        {quizData.length > 0 && <Quiz quizData={quizData} />}
    </main>
  )
}

export default Body