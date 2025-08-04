import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div
      style={{
        width: "100vw",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        marginTop: 200,
      }}
    >
      <h1>Inicialização Projeto Integrador</h1>
      <p>O projeto será inicializado a partir daqui</p>
    </div>
  );
}

export default App;
