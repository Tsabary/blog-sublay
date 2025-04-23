import { FeedProvider } from "@replyke/core";
import { Layout } from "lucide-react";
import React from "react";
import ArticlesGrid from "../../components/all-articles/ArticlesGrid";

function ArticlesPage() {
  return (
    <Layout>
      <FeedProvider resourceId="blog" limit={9} sortBy="new">
        <div className="flex-1">
          <ArticlesGrid />
          {/* <Subscribe /> */}
        </div>
      </FeedProvider>
    </Layout>
  );
}

export default ArticlesPage;
