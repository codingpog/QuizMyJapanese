import React from "react"
import { generateQuiz } from "../ai"
import type { QuizQuestion } from "../types"
import Quiz from "./Quiz"

function Body(): React.JSX.Element {
  const [quizData, setQuizData] = React.useState<QuizQuestion[]>([])

  async function createQuiz(formData: FormData): Promise<void> {
    const foreignText: FormDataEntryValue | null = formData.get("foreignText")
    if (typeof foreignText === "string") {
      console.log(foreignText)
      const returnedQuizData: QuizQuestion[] | undefined = await generateQuiz(foreignText)
      if (!returnedQuizData) {
        console.error("No quiz returned from AI")
        return
      }
      // setQuizData((prevQuizData: QuizQuestion[]) => [...prevQuizData, ...returnedQuizData])
      setQuizData(returnedQuizData)
      console.log(returnedQuizData)
      console.log("Array.isArray(returnedQuizData):", Array.isArray(returnedQuizData));
    }
  }

  return (
    <main>
        {quizData.length === 0 && <form className="generate-quiz-form" action={createQuiz}>
            <input 
                type="text" 
                placeholder="your article here" 
                aria-label="generate quiz"
                name="foreignText"
            />
            <button>Quiz Me!</button>
        </form>}
        {/* {quizData.length > 0 && <p>Hey I'm here</p>} */}
        {quizData.length > 0 && <Quiz quizData={quizData} />}
    </main>
  )
}

export default Body