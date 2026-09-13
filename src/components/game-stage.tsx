import { useEffect, useRef, useState } from "react";
import { TouchPad } from "@/components/touch-pad";

type WitchApi = {
  stop: () => void;
  input: (d: string) => void;
  release: (d: string) => void;
  getState: () => {
    x: number;
    y: number;
    season: string;
    cats: number;
    life: number;
    maxLife: number;
  };
};

declare global {
  interface Window {
    WitchCat?: { boot: (opts: { canvas: HTMLCanvasElement; backgroundCanvas: HTMLCanvasElement }) => WitchApi };
  }
}

function loadEngine(): Promise<NonNullable<Window["WitchCat"]>> {
  if (window.WitchCat) return Promise.resolve(window.WitchCat);
  return new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>("script[data-witch-engine]");
    if (existing) {
      existing.addEventListener("load", () => {
        if (window.WitchCat) resolve(window.WitchCat);
        else reject(new Error("engine missing"));
      });
      return;
    }
    const s = document.createElement("script");
    s.src = "/game/engine.js";
    s.async = false;
    s.dataset.witchEngine = "1";
    s.onload = () => {
      if (window.WitchCat) resolve(window.WitchCat);
      else reject(new Error("engine missing"));
    };
    s.onerror = () => reject(new Error("engine failed to load"));
    document.body.appendChild(s);
  });
}

export function GameStage({ mode }: { mode: "new" | "continue" }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bgRef = useRef<HTMLCanvasElement>(null);
  const apiRef = useRef<WitchApi | null>(null);
  const [hud, setHud] = useState({ season: "summer", cats: 0, life: 3, maxLife: 3 });
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const bg = bgRef.current;
    if (!canvas || !bg) return;
    let stopped = false;

    if (mode === "new") {
      try {
        localStorage.removeItem("witch-cat");
      } catch {
        /* ignore */
      }
    }

    loadEngine()
      .then((engine) => {
        if (stopped) return;
        apiRef.current = engine.boot({ canvas, backgroundCanvas: bg });
      })
      .catch((e: unknown) => {
        setErr(e instanceof Error ? e.message : "Could not start the game");
      });

    const tick = window.setInterval(() => {
      const s = apiRef.current?.getState();
      if (s) setHud({ season: s.season, cats: s.cats, life: s.life, maxLife: s.maxLife });
    }, 400);

    return () => {
      stopped = true;
      window.clearInterval(tick);
      apiRef.current?.stop();
      apiRef.current = null;
    };
  }, [mode]);

  return (
    <div className="relative flex min-h-dvh flex-col bg-ink">
      <canvas
        id="gameBackgroundCanvas"
        ref={bgRef}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-40 blur-md"
      />
      <div
        id="game"
        className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden touch-none"
      >
        <div className="pointer-events-none absolute left-3 top-14 z-10 border-2 border-ink bg-bg px-2 py-1 font-display text-xs text-ink">
          <div className="tabular-nums uppercase">{hud.season}</div>
          <div className="tabular-nums">
            Cats {hud.cats}/12 · HP {hud.life}/{hud.maxLife}
          </div>
        </div>
        {err ? (
          <p className="relative z-10 bg-bg px-4 py-2 font-display text-band">{err}</p>
        ) : (
          <canvas
            id="gameCanvas"
            ref={canvasRef}
            className="pixelated relative z-10 max-h-[78dvh] max-w-full touch-none"
          />
        )}
        <p className="relative z-10 mt-2 hidden px-4 text-center text-xs text-bg/80 md:block">
          Arrows / WASD move · Space or Enter action (fireball, season stone, signs)
        </p>
        <TouchPad
          onDown={(d) => apiRef.current?.input(d)}
          onUp={(d) => apiRef.current?.release(d)}
        />
      </div>
    </div>
  );
}
