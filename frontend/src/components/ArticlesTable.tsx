import React, { useState } from "react";
import ArticleCard from "./ArticleCard";

function ArticlesTable({ articles }: any): React.JSX.Element {
  const [articlesList, setArticlesList] = useState<any[]>(articles);
  return (
    <div className="articles-table">
      {articlesList.map((article) => {
        return <ArticleCard key={article._id} article={article} />;
      })}
    </div>
  );
}

export default ArticlesTable;
