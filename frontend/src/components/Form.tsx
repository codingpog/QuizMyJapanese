import type { QuizQuestion } from "../types";
// import {generateQuiz} from "../ai";
import React from "react";
import axios, { AxiosError } from "axios";

type FormProps = {
  setQuizData: React.Dispatch<React.SetStateAction<QuizQuestion[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

function Form({ setQuizData, setLoading }: FormProps): React.JSX.Element {
  const [inputType, setInputType] = React.useState<string>("url");

  // Send a request through backend to OpenAI to generate quiz
  async function generateQuizAI(
    text: string
  ): Promise<QuizQuestion[] | undefined> {
    try {
      let response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/generate-quiz`,
        { text: text }
      );
      if (response.status === 200) {
        return response.data as QuizQuestion[];
      }
    } catch (error: AxiosError | any) {
      if (error.response) {
        console.log(`Error ${error.status}: ${error.response.data}`);
      }
    }
  }

  // Extract article from URL or get user input text
  async function handleInput(textOrUrl: string, title: string) {
    if (inputType === "url" && textOrUrl) {
      try {
        let response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/extract-article`,
          {
            url: textOrUrl,
          }
        );
        if (response.status === 200) {
          return { title: response.data.title, content: response.data.text };
        }
      } catch (error: AxiosError | any) {
        if (error.response) {
          console.log(`Error ${error.status}: ${error.response.data}`);
        }
      }
    } else if (inputType === "text" && textOrUrl && title) {
      return { title: title, content: textOrUrl };
    } else {
      alert("Please provide valid input.");
      throw new Error("Invalid input");
    }
  }

  // Save article and generated quiz to MongoDB database
  async function saveQuizToDB(
    title: string,
    content: string,
    quiz: QuizQuestion[]
  ) {
    try {
      let response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/save-article`,
        {
          title: title,
          content: content,
          quiz: quiz,
        }
      );
      if (response.status === 200) {
        console.log("Article and quiz saved successfully");
        alert("Article and quiz saved successfully");
      }
    } catch (error: AxiosError | any) {
      console.log("Error saving article and quiz:", error);
    }
  }

  // Primary function. Handle form submission and call other functions to create quiz
  async function createQuiz(
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    e.preventDefault();
    setLoading(true); // Start loading

    const formData: FormData = new FormData(e.currentTarget);
    const textOrUrl: string = formData.get("textOrUrl") as string;
    const inputTitle: string = formData.get("title") as string;
    try {
      const articleInfo = await handleInput(textOrUrl, inputTitle);
      if (typeof articleInfo?.content === "string") {
        //   console.log(foreignText)
        const returnedQuizData: QuizQuestion[] | undefined =
          await generateQuizAI(articleInfo.content);
        if (!returnedQuizData) {
          console.log("No quiz returned from AI");
          return;
        }
        await saveQuizToDB(
          articleInfo.title,
          articleInfo.content,
          returnedQuizData
        );
        setQuizData(returnedQuizData);
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
      <select
        id="inputType"
        aria-label="input type selection"
        onChange={(e) => {
          setInputType(e.target.value);
        }}
      >
        <option value="url">Provide article URL</option>
        <option value="text">Enter text manually</option>
      </select>
      {inputType === "text" && (
        <input
          type="title"
          placeholder="article title here"
          aria-label="input article title"
          name="title"
        ></input>
      )}
      <input
        type="text"
        placeholder={
          inputType === "text" ? "article text here" : "URL link here"
        }
        aria-label="input text or URL"
        name="textOrUrl"
      />
      <button className="submit-button" type="submit">
        &#x270D; Quiz Me!
      </button>
    </form>
  );
}

export default Form;
