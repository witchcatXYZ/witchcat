import { createFileRoute } from "@tanstack/react-router";
import { CaStrip } from "@/components/ca-strip";
import {
  ATTRIBUTION,
  CHAIN_NAME,
  DISCLAIMER,
  GITHUB_URL,
  HOOK,
  LINE,
  NAME,
  SITE_URL,
  TICKER,
  tokenLive,
  VAULT_CA,
  explorerAddress,
  shortCa,
} from "@/lib/site";

export const Route = createFileRoute("/token")({ component: Token });

function Token() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <p className="font-display text-sm uppercase tracking-[0.2em] text-band">${TICKER}</p>
      <h1 className="mt-1 text-4xl">{NAME}</h1>
      <p className="mt-3 text-lg text-ink">{LINE}</p>
      <div className="mt-6">
        <CaStrip />
      </div>

      <h2 className="mt-10 text-2xl">What it is</h2>
      <p className="mt-2 text-muted">
        A LetsCash token on {CHAIN_NAME} (4663). Quote is ETH. The game on this site is free to play and
        does not spend ${TICKER}. Trade happens on LetsCash, not here.
      </p>

      <h2 className="mt-10 text-2xl">Fees</h2>
      <ul className="mt-2 space-y-1 text-muted">
        <li>3% on the swap (LetsCash pad).</li>
        <li>0.3% platform, locked.</li>
        <li>2.7% creator stream → hook, then the cauldron via harvest.</li>
      </ul>
      <p className="mt-3 text-sm text-muted">
        Harvest is permissionless. The caller pays gas. ETH stays in the cauldron. Pull is ops only.
        There is no keeper and no merkle drip.
      </p>

      {tokenLive() && VAULT_CA ? (
        <p className="mt-4 font-mono text-sm">
          Cauldron{" "}
          <a href={explorerAddress(VAULT_CA)} className="underline">
            {shortCa(VAULT_CA)}
          </a>
        </p>
      ) : (
        <p className="mt-4 text-sm text-muted">Cauldron address appears after deploy.</p>
      )}

      <h2 className="mt-10 text-2xl">Links</h2>
      <ul className="mt-2 space-y-1 text-muted">
        <li>
          Site · {SITE_URL}
        </li>
        <li>
          GitHub ·{" "}
          <a href={GITHUB_URL} className="underline">
            witchcatXYZ/witchcat
          </a>
        </li>
        <li>Hook · {shortCa(HOOK) || HOOK}</li>
      </ul>

      <p className="mt-10 text-sm text-muted">{DISCLAIMER}</p>
      <p className="mt-2 text-sm text-muted">{ATTRIBUTION}</p>
    </main>
  );
}
