import React from "react"
import type { QuizQuestion } from "../types"
import Quiz from "./Quiz"
import Form from "./Form"
import Header from "./Header"
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader"

function Body(): React.JSX.Element {
  const [quizData, setQuizData] = React.useState<QuizQuestion[]>([])
  const [loading, setLoading] = React.useState<boolean>(false)

  return (
    <main>
        <Header />
        {quizData.length == 0 && !loading && <Form setQuizData={setQuizData} setLoading={setLoading} />}
        {loading && ( 
          <div className="loader-container">
            <ClimbingBoxLoader color="#009cdf" size={20}/>
          </div>
        )}
        {quizData.length > 0 && !loading && <Quiz quizData={quizData} />}
    </main>
  )
}

export default Body