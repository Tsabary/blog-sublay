"use client";

import FeaturedArticle from "../components/home/FeaturedArticle";
import Layout from "../components/Layout";
import LatestArticles from "../components/home/LatestArticles";
import Subscribe from "../components/home/Subscribe";

export default function Home() {
  return (
    <Layout>
      <FeaturedArticle />
      <LatestArticles />
      <Subscribe />
    </Layout>
  );
}
