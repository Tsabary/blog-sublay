import { FeedProvider } from "@replyke/core";
import React from "react";
import ArticlesGrid from "../../components/all-articles/ArticlesGrid";
import Layout from "../../components/Layout";
import NavigateHomeButton from "../../components/article/NavigateHomeButton";

function ArticlesPage() {
  return (
    <Layout>
      <FeedProvider resourceId="blog" limit={9} sortBy="new">
        <div className="pt-24 px-8">
          <NavigateHomeButton />
        </div>
        <ArticlesGrid />
        {/* <Subscribe /> */}
      </FeedProvider>
    </Layout>
  );
}

export default ArticlesPage;
