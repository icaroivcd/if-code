import Header from "@/components/Header";
import { Outlet } from "react-router";

export default function AppLayout() {
  return (
    <div className="w-screen h-screen">
      <Header />
      <main className="h-auto pt-10  pl-30 pr-30">
        <Outlet />
      </main>
    </div>
  );
}
