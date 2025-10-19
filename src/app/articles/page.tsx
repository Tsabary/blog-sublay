"use client";

import React from "react";
import ArticlesGrid from "../../components/all-articles/ArticlesGrid";
import Layout from "../../components/Layout";
import NavigateHomeButton from "../../components/article/NavigateHomeButton";
// import Subscribe from "../../components/home/Subscribe";

function ArticlesPage() {
  return (
    <Layout>
      <div className="pt-30 flex flex-col items-center px-8">
        <div className="w-full max-w-6xl mx-auto">
          <NavigateHomeButton />
        </div>
      </div>
      <ArticlesGrid />
      {/* <Subscribe /> */}
    </Layout>
  );
}

export default ArticlesPage;
