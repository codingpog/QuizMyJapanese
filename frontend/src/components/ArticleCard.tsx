import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import type { QuizQuestion } from "../types";

function ArticleCard({ article }: any): React.JSX.Element {
  const [title, _setTitle] = useState<string>(article.title);
  const [content, _setContent] = useState<string>(article.content);
  const [quiz, _setQuiz] = useState<QuizQuestion[]>(article.quiz);
  const navigate = useNavigate();

  // Function to handle article deletion
  async function handleDelete() {
    try {
      let response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/delete-article/${article._id}`
      );
      if (response.status === 200) {
        console.log("Article deleted successfully");
        alert("Article deleted successfully");
        window.location.reload(); // Reload the page to reflect changes
      }
    } catch (error) {
      console.log("Error deleting article:", error);
    }
  }

  // Navigate to QuizPage with quiz data
  function handleSubmit() {
    navigate("/quiz", { state: { quizData: quiz } });
  }

  return (
    <div className="article-card">
      <h2>{title}</h2>
      <p>{content}</p>
      <button className="delete-button" onClick={handleDelete}>
        Delete Article
      </button>
      <button className="submit-button" onClick={handleSubmit}>
        Quiz Me!
      </button>
    </div>
  );
}

export default ArticleCard;
