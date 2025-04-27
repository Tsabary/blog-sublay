import { FeedProvider } from "@replyke/core";
import React from "react";
import ArticlesGrid from "../../components/all-articles/ArticlesGrid";
import Layout from "../../components/Layout";
import NavigateHomeButton from "../../components/article/NavigateHomeButton";

function ArticlesPage() {
  return (
    <Layout>
      <FeedProvider resourceId="blog" limit={9} sortBy="new">
        <div className="pt-24 flex flex-col items-center px-8">
          <div className="w-full max-w-6xl mx-auto">
            <NavigateHomeButton />
          </div>
        </div>
        <ArticlesGrid />
        {/* <Subscribe /> */}
      </FeedProvider>
    </Layout>
  );
}

export default ArticlesPage;
