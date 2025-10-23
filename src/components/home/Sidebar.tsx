"use client";

import React from "react";
import TrendingArticles from "./TrendingArticles";
import CategoryNavigation from "./CategoryNavigation";
import RecentActivity from "./RecentActivity";

function Sidebar() {
  return (
    <aside className="space-y-6">
      {/* Trending Articles */}
      <div className="pb-6 border-b">
        <TrendingArticles />
      </div>

      {/* Category Navigation */}
      <div className="pb-6 border-b">
        <CategoryNavigation />
      </div>

      {/* Recent Activity */}
      <div>
        <RecentActivity />
      </div>
    </aside>
  );
}

export default Sidebar;
