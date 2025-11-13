import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import ArticlesTable from "./ArticlesTable";
import Header from "./Header";

function MyArticles(): React.JSX.Element {
  const [articles, setArticles] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/all-articles`)
      .then((response) => {
        setArticles(response.data.articles);
      })
      .catch((error) => {
        console.log("Error fetching articles:", error);
      });
  }, []);

  return (
    <>
      <Header />
      {
        articles.length > 0 && (
          <ArticlesTable articles={articles} />
        ) /* ensure articles is populated before rendering ArticlesTable */
      }
    </>
  );
}

export default MyArticles;
