import type { QuizQuestion } from "../types";
import {generateQuiz} from "../ai";

type FormProps = {
  setQuizData: React.Dispatch<React.SetStateAction<QuizQuestion[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

function Form({setQuizData, setLoading}: FormProps): React.JSX.Element {
  async function createQuiz(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault
    setLoading(true); // Start loading
    
    const formData: FormData = new FormData(e.currentTarget);
    const foreignText: FormDataEntryValue | null = formData.get("foreignText")
    try {
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
    } catch (error) {
      console.error("Error generating quiz:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  }

  return (
    <form className="generate-quiz-form" onSubmit={createQuiz}>
        <input 
            type="text" 
            placeholder="your article here" 
            aria-label="generate quiz"
            name="foreignText"
        />
        <button type="submit">Quiz Me!</button>
    </form>
  )
}

export default Form;