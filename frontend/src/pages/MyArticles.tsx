import React, { useEffect, useState } from "react";
import axios from "axios";
import ArticlesTable from "../components/ArticlesTable";
import Header from "./Header";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

function MyArticles(): React.JSX.Element {
  const [articles, setArticles] = useState<any[]>([]);
  // const [loading, setLoading] = React.useState<boolean>(false);

  // Fetch all articles from backend
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
        articles.length == 0 && (
          <div className="loader-container">
            <ClimbingBoxLoader color="#009cdf" size={20} />
          </div>
        ) /* show loader while articles are being fetched */
      }
      {
        articles.length > 0 && (
          <ArticlesTable articles={articles} />
        ) /* ensure articles is populated before rendering ArticlesTable */
      }
    </>
  );
}

export default MyArticles;
