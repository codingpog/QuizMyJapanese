import React, { useState } from "react";
import Header from "./Header";
import type { QuizQuestion } from "../types";

function ArticleCard({ article }: any): React.JSX.Element {
  const [title, setTitle] = useState<string>(article.title);
  const [content, setContent] = useState<string>(article.content);
  const [quiz, setQuiz] = useState<QuizQuestion[]>(article.quiz);
  return (
    <div className="article-card">
      <h2>{title}</h2>
      <p>{content}</p>
      <button>Delete Article</button>
      <button>Quiz Me!</button>
    </div>
  );
}

export default ArticleCard;
