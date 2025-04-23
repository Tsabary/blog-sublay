import FeaturedArticle from "../components/home/FeaturedArticle";
import Layout from "../components/Layout";
import { FeedProvider } from "@replyke/core";
import LatestArticles from "../components/home/LatestArticles";

export default function Home() {
  return (
    <Layout>
      <FeedProvider resourceId="blog" limit={4} sortBy="new">
        <div className="flex-1">
          <FeaturedArticle />
          <LatestArticles />
          {/* <Subscribe /> */}
        </div>
      </FeedProvider>
    </Layout>
  );
}
