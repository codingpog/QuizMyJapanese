import type { QuizQuestion } from "../types";
// import {generateQuiz} from "../ai";
import React from "react"
import axios, { AxiosError } from "axios";

type FormProps = {
  setQuizData: React.Dispatch<React.SetStateAction<QuizQuestion[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

function Form({setQuizData, setLoading}: FormProps): React.JSX.Element {
  const [inputType, setInputType] = React.useState<string>("url");

  async function generateQuizAI(text: string): Promise<QuizQuestion[] | undefined> { 
    try {
      let response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/generate-quiz`, {text: text})
      if (response.status === 200) {
        return response.data as QuizQuestion[];
      }
    } catch (error: AxiosError | any) {
          if (error.response) {
              console.log(`Error ${error.status}: ${error.response.data}`)
          }      
    }
  }
  async function handleInput(input: string){
    if (inputType === "url" && input) {
      try {
        let response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/get-article`, {
            url: input,
        })
        if (response.status === 200) {
          return response.data.text
        } 
      } catch (error: AxiosError | any) {
          if (error.response) {
              console.log(`Error ${error.status}: ${error.response.data}`)
          }
      }
    } else if (inputType === "text" && input) {
      return input
    } else {
      alert("Please provide valid input.")
      throw new Error("Invalid input")
    }
  }

  async function createQuiz(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault()
    setLoading(true); // Start loading
    
    const formData: FormData = new FormData(e.currentTarget);
    const input: FormDataEntryValue | null = formData.get("input")
    try {
      const foreignText: string | undefined = await handleInput(input as string)
      if (typeof foreignText === "string") {
      //   console.log(foreignText)
        const returnedQuizData: QuizQuestion[] | undefined = await generateQuizAI(foreignText)
        if (!returnedQuizData) {
          console.log("No quiz returned from AI")
          return
        }
        setQuizData(returnedQuizData)
      //   console.log(returnedQuizData)
      //   console.log("Array.isArray(returnedQuizData):", Array.isArray(returnedQuizData));
      }
    } catch (error) {
      console.log("Error generating quiz:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  }

  return (
    <form className="generate-quiz-form" onSubmit={createQuiz}>
        <select id="inputType" 
                aria-label="input type selection" 
                onChange={(e) => {setInputType(e.target.value)
        }}>
            <option value="url">Provide article URL</option>
            <option value="text">Enter text manually</option>
        </select>
        <input 
            type="text" 
            placeholder={inputType === "text" ? "article text here" : "URL link here"} 
            aria-label="input text or URL"
            name="input"
        />
        <button type="submit">Quiz Me!</button>
    </form>
  )
}

export default Form;