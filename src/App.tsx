import { useEffect, useRef, useState } from "react";
import "./App.css";
import { Button } from "./components/ui/button";

function App() {
  const [counter, setCounter] = useState(0);
  const [direction, setDirection] = useState<"up" | "down" | null>(null);
  const holdTimer = useRef<number | null>(null);

  const change = (delta: number) => {
    setCounter((c) => c + delta);
    setDirection(delta > 0 ? "up" : "down");
  };

  const startHold = (delta: number) => {
    change(delta);
    stopHold();
    holdTimer.current = window.setInterval(() => change(delta), 80);
  };

  const stopHold = () => {
    if (holdTimer.current) {
      clearInterval(holdTimer.current);
      holdTimer.current = null;
    }
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") change(1);
      if (e.key === "ArrowDown") change(-1);
      if (e.key === "0" || e.key.toLowerCase() === "r") {
        setCounter(0);
        setDirection(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div className="aurora pointer-events-none" aria-hidden />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-2xl flex-col items-center justify-start px-6 pt-28 sm:pt-40">
        <div className="glass-card w-full max-w-md rounded-3xl p-6 sm:p-8">
          <div
            className="mb-8 flex items-center justify-center"
            aria-live="polite"
            aria-atomic="true"
          >
            <span
              key={counter}
              className={[
                "select-none font-semibold drop-shadow-sm",
                "text-7xl sm:text-8xl leading-none",
                "animate-pop",
                direction === "up" ? "text-emerald-300" : "",
                direction === "down" ? "text-rose-300" : "",
                direction === null ? "text-white" : "",
              ].join(" ")}
            >
              {counter}
            </span>
          </div>

          <div className="flex items-center justify-center gap-4">
            <Button
              onClick={() => change(-1)}
              onMouseDown={() => startHold(-1)}
              onMouseUp={stopHold}
              onMouseLeave={stopHold}
              onTouchStart={() => startHold(-1)}
              onTouchEnd={stopHold}
              className="btn-blob group"
              aria-label="Decrease"
              title="Decrease"
            >
              <span className="btn-inner">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="transition-transform duration-200 group-active:scale-90"
                >
                  <path
                    d="M5 12h14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </Button>

            <Button
              onClick={() => {
                setCounter(0);
                setDirection(null);
              }}
              className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm text-white/90 backdrop-blur hover:bg-white/10 hover:text-white transition-colors"
              aria-label="Reset"
              title="Reset"
            >
              Reiniciar
            </Button>
            <Button
              onClick={() => change(1)}
              onMouseDown={() => startHold(1)}
              onMouseUp={stopHold}
              onMouseLeave={stopHold}
              onTouchStart={() => startHold(1)}
              onTouchEnd={stopHold}
              className="btn-blob group"
              aria-label="Increase"
              title="Increase"
            >
              <span className="btn-inner">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="transition-transform duration-200 group-active:scale-90"
                >
                  <path
                    d="M12 5v14M5 12h14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
