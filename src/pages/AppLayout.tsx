import Header from "@/components/Header";
import { Outlet } from "react-router";

export default function AppLayout() {
  return (
    <div className="w-screen h-screen">
      <Header />
      <main className="h-auto pt-10  pl-30 pr-30">
        <Outlet />
      </main>
      <footer className="fixed bottom-0 left-0 w-full py-4 bg-white shadow-md border-t border-gray-200 mt-auto items-center justify-between shadow-lg z-50">
        <p>© 2025 Meu App</p>
      </footer>
    </div>
  );
}
