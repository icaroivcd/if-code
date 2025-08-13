import Header from "@/components/Header";
import { Outlet } from "react-router";

export default function AppLayout() {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <footer>
        <p>© 2025 Meu App</p>
      </footer>
    </div>
  );
}
