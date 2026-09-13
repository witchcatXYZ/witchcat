import { Link, useRouterState } from "@tanstack/react-router";
import { NAME, ATTRIBUTION, TICKER } from "@/lib/site";
import type { ReactNode } from "react";

const NAV = [
  { to: "/play", label: "Play" },
  { to: "/how", label: "How" },
  { to: "/token", label: `$${TICKER}` },
] as const;

export function Shell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const play = pathname === "/play";

  return (
    <div className={play ? "min-h-dvh bg-ink text-bg" : "min-h-dvh bg-bg text-ink"}>
      <header
        className={
          play
            ? "pointer-events-none absolute inset-x-0 top-0 z-30 flex items-center justify-between px-3 py-2"
            : "sticky top-0 z-30 border-b-2 border-ink bg-bg/95 backdrop-blur-sm"
        }
      >
        <div className={play ? "pointer-events-auto flex w-full items-center justify-between" : "mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-3"}>
          <Link to="/" className="flex items-center gap-2 no-underline">
            <img
              src="/cover.png"
              alt=""
              width={36}
              height={36}
              className="pixelated size-9 border-2 border-ink bg-bg object-cover"
            />
            <span className="hidden font-display text-lg tracking-wide text-ink sm:inline">{NAME}</span>
          </Link>
          <nav className="flex items-center gap-1 sm:gap-2">
            {NAV.map((item) => {
              const active = pathname === item.to || pathname.startsWith(item.to + "/");
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={
                    "px-2 py-1 font-display text-sm no-underline sm:px-3 " +
                    (play
                      ? "border-2 border-ink bg-bg text-ink"
                      : active
                        ? "bg-ink text-bg"
                        : "text-ink hover:bg-ink hover:text-bg")
                  }
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
      {children}
      {play ? null : (
        <footer className="border-t-2 border-ink bg-bg-deep px-4 py-6 text-center text-sm text-muted">
          <p className="mx-auto max-w-2xl">{ATTRIBUTION}</p>
        </footer>
      )}
    </div>
  );
}
