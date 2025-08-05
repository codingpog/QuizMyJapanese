import type { QuizQuestion } from "../types";
import {generateQuiz} from "../ai";

type FormProps = {
  setQuizData: React.Dispatch<React.SetStateAction<QuizQuestion[]>>;
}

function Form({setQuizData}: FormProps): React.JSX.Element {
  async function createQuiz(formData: FormData): Promise<void> {
    const foreignText: FormDataEntryValue | null = formData.get("foreignText")
    if (typeof foreignText === "string") {
    //   console.log(foreignText)
      const returnedQuizData: QuizQuestion[] | undefined = await generateQuiz(foreignText)
      if (!returnedQuizData) {
        console.error("No quiz returned from AI")
        return
      }
      setQuizData(returnedQuizData)
    //   console.log(returnedQuizData)
    //   console.log("Array.isArray(returnedQuizData):", Array.isArray(returnedQuizData));
    }
  }

  return (
    <form className="generate-quiz-form" action={createQuiz}>
        <input 
            type="text" 
            placeholder="your article here" 
            aria-label="generate quiz"
            name="foreignText"
        />
        <button>Quiz Me!</button>
    </form>
  )
}

export default Form;