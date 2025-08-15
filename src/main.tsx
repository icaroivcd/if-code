import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppRouter from "./routes/AppRouter.tsx";
import DataProvider from "./context/DataContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DataProvider>
      <AppRouter />
    </DataProvider>
  </StrictMode>
);
