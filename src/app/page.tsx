"use client";

import FeaturedArticle from "../components/home/FeaturedArticle";
import Layout from "../components/Layout";
import LatestArticles from "../components/home/LatestArticles";
import Sidebar from "../components/home/Sidebar";

export default function Home() {
  return (
    <Layout>
      <div className="container mx-auto px-4 md:px-6 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 lg:gap-12">
          {/* Main Content */}
          <main className="min-w-0">
            <FeaturedArticle />
            <LatestArticles />
          </main>

          {/* Sidebar - Hidden on mobile, sticky on desktop */}
          <div className="hidden lg:block">
            <div className="sticky top-6">
              <Sidebar />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
