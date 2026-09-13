import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { GameStage } from "@/components/game-stage";

export const Route = createFileRoute("/play")({ component: Play });

function hasSave() {
  try {
    const raw = localStorage.getItem("witch-cat");
    if (!raw) return false;
    const data = JSON.parse(raw) as { characterMaxLife?: number };
    return Boolean(data.characterMaxLife);
  } catch {
    return false;
  }
}

function Play() {
  const [mode, setMode] = useState<"menu" | "new" | "continue">("menu");
  const [save, setSave] = useState(false);

  useEffect(() => {
    setSave(hasSave());
  }, [mode]);

  if (mode !== "menu") {
    return <GameStage mode={mode} />;
  }

  return (
    <main className="flex min-h-[calc(100dvh-4rem)] flex-col items-center justify-center bg-bg px-4 py-10">
      <img
        src="/cover.png"
        alt=""
        width={192}
        height={192}
        className="pixelated size-48 border-2 border-ink bg-bg-deep"
      />
      <h1 className="mt-6 text-4xl">Witch Cat</h1>
      <p className="mt-2 max-w-md text-center text-muted">
        My cats vanished. I must save them. Find season orbs in temples. Action to interact. Fireballs burn
        bushes and enemies.
      </p>
      <div className="mt-6 flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          onClick={() => setMode("new")}
          className="border-2 border-ink bg-band px-6 py-2 font-display text-lg text-band-ink hover:bg-ink"
        >
          New game
        </button>
        <button
          type="button"
          disabled={!save}
          onClick={() => setMode("continue")}
          className="border-2 border-ink bg-surface px-6 py-2 font-display text-lg text-ink hover:bg-ink hover:text-bg disabled:cursor-not-allowed disabled:opacity-40"
        >
          Continue
        </button>
      </div>
      <p className="mt-6 text-center text-sm text-muted">
        Keyboard: arrows or WASD · Space action (skips intro)
        <br />
        Touch: pad on the left, A to act
      </p>
      <Link to="/how" className="mt-4 text-sm text-ink">
        How seasons work
      </Link>
    </main>
  );
}
