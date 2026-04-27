"use client";

import { useState } from "react";
import { Header } from "./Header";
import Footer from "./Footer";
import { AnnouncementBanner } from "../AnnouncementBanner/AnnouncementBanner";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [bannerDismissed, setBannerDismissed] = useState(false);

  return (
    <div className="relative flex flex-col min-h-screen font-body bg-background overflow-x-hidden">
      <div className="fixed top-0 z-50 w-full flex flex-col">
        <AnnouncementBanner onDismiss={() => setBannerDismissed(true)} />
        <Header />
      </div>

      <main className={`flex-1 ${bannerDismissed ? "pt-24" : "pt-32"}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
