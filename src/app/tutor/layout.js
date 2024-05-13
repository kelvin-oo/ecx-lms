import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

export default function AdminLayout({ children }) {
  return (
    <main className="relative">
      <Header />
      <span className="hidden lg:block">
        <Sidebar />
      </span>

      <main className="lg:ms-48 pt-6 lg:pt-12 px-4 lg:px-20">
        {children}
      </main>
    </main>
  );
}
