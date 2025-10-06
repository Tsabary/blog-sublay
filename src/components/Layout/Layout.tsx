import { Header } from "./Header";
import Footer from "./Footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex flex-col min-h-screen font-body bg-background overflow-x-hidden">
      <Header />

      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
