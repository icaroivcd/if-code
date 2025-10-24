import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppRouter from "./routes/AppRouter.tsx";
import DataProvider from "./context/DataContext.tsx";
import { UserProvider } from "./context/UserContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserProvider>
      <DataProvider>
        <AppRouter />
      </DataProvider>
    </UserProvider>
  </StrictMode>
);
