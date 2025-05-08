import FeaturedArticle from "../components/home/FeaturedArticle";
import Layout from "../components/Layout";
import { EntityListProvider } from "@replyke/core";
import LatestArticles from "../components/home/LatestArticles";

export default function Home() {
  return (
    <Layout>
      <EntityListProvider sourceId="blog" limit={4} sortBy="new">
        <div className="flex-1">
          <FeaturedArticle />
          <LatestArticles />
          {/* <Subscribe /> */}
        </div>
      </EntityListProvider>
    </Layout>
  );
}
