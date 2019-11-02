import React from "react";
import "./ArticlePage.css";

interface ArticlePageProps {
  category: string;
  title: string;
  by: string;
  contents: string;
}
function ArticlePage({ category, title, by, contents }: ArticlePageProps) {
  return (
    <div className="ArticlePage__wrap">
      <div className="ArticlePage__Category">{category}</div>
      <h1 className="ArticlePage__title">{title}</h1>
      <div className="ArticlePage__User">
        <div className="ArticlePage__Nickname">{by}</div>
      </div>
      <div className="ArticlePage__Text">{contents}</div>
    </div>
  );
}

export default ArticlePage;
