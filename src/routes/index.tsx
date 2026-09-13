import { createFileRoute, Link } from "@tanstack/react-router";
import { CaStrip } from "@/components/ca-strip";
import { LINE, NAME, SEASONS, SLOGAN, TICKER, tokenLive, letscashTokenUrl } from "@/lib/site";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <main>
      <section className="mx-auto grid max-w-5xl items-center gap-8 px-4 py-10 sm:grid-cols-2 sm:py-16">
        <div>
          <p className="font-display text-sm uppercase tracking-[0.2em] text-band">Robinhood Chain · ${TICKER}</p>
          <h1 className="mt-2 text-5xl leading-none sm:text-6xl">{NAME}</h1>
          <p className="mt-4 text-xl font-semibold text-ink">{SLOGAN}</p>
          <p className="mt-2 text-muted">{LINE}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/play"
              className="border-2 border-ink bg-band px-5 py-2 font-display text-lg text-band-ink no-underline hover:bg-ink"
            >
              Play
            </Link>
            <Link
              to="/how"
              className="border-2 border-ink bg-surface px-5 py-2 font-display text-lg text-ink no-underline hover:bg-ink hover:text-bg"
            >
              How
            </Link>
            {tokenLive() ? (
              <a
                href={letscashTokenUrl()}
                target="_blank"
                rel="noreferrer"
                className="border-2 border-ink px-5 py-2 font-display text-lg text-ink no-underline hover:bg-ink hover:text-bg"
              >
                Trade
              </a>
            ) : (
              <span className="border-2 border-dashed border-ink/40 px-5 py-2 font-display text-lg text-muted">
                Trade soon
              </span>
            )}
          </div>
        </div>
        <img
          src="/cover-big.png"
          alt="A witch and her black cats"
          className="pixelated w-full border-2 border-ink bg-bg-deep"
        />
      </section>

      <section className="border-y-2 border-ink bg-surface">
        <div className="mx-auto max-w-5xl px-4 py-4">
          <CaStrip />
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <h2 className="text-3xl">Four seasons. Twelve cats.</h2>
        <p className="mt-2 max-w-2xl text-muted">
          Temples unlock winter, summer, autumn, and spring. Each season opens a different path. Signs become
          cats as you find them. No minimap. No keeper. Play it here.
        </p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {SEASONS.map((s) => (
            <li key={s.id} className="border-2 border-ink bg-surface p-4">
              <h3 className="text-xl">{s.title}</h3>
              <p className="mt-1 text-sm text-muted">{s.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t-2 border-ink bg-bg-deep">
        <div className="mx-auto max-w-5xl px-4 py-12">
          <h2 className="text-3xl">The cauldron</h2>
          <p className="mt-2 max-w-2xl text-muted">
            Swap ${TICKER} on LetsCash. Creator fees accrue on the hook, then anyone may harvest into the
            cauldron contract. ETH stays in the cauldron. Ops may pull. The game does not need a wallet.
          </p>
          <p className="mt-4 font-display text-sm uppercase tracking-widest text-muted">
            {tokenLive() ? "Live on Robinhood Chain 4663" : "Token not launched — play the game today"}
          </p>
        </div>
      </section>
    </main>
  );
}
