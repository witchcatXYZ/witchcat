import { TOKEN_CA, explorerAddress, letscashTokenUrl, shortCa, tokenLive, TICKER } from "@/lib/site";
import { useState } from "react";

export function CaStrip() {
  const [copied, setCopied] = useState(false);
  if (!tokenLive()) {
    return (
      <div className="border-2 border-ink bg-surface px-4 py-3 text-sm text-muted">
        ${TICKER} is not live yet. Contract address appears here the moment it exists. No fake CA.
      </div>
    );
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(TOKEN_CA);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2 border-2 border-ink bg-surface px-3 py-2 font-mono text-sm">
      <span className="font-display text-ink">${TICKER}</span>
      <code className="break-all text-ink">{shortCa(TOKEN_CA)}</code>
      <button
        type="button"
        onClick={copy}
        className="border-2 border-ink bg-bg px-2 py-1 font-display text-xs text-ink hover:bg-ink hover:text-bg"
      >
        {copied ? "Copied" : "Copy"}
      </button>
      <a
        href={explorerAddress(TOKEN_CA)}
        target="_blank"
        rel="noreferrer"
        className="border-2 border-ink px-2 py-1 font-display text-xs no-underline hover:bg-ink hover:text-bg"
      >
        Explorer
      </a>
      <a
        href={letscashTokenUrl()}
        target="_blank"
        rel="noreferrer"
        className="border-2 border-ink bg-band px-2 py-1 font-display text-xs text-band-ink no-underline"
      >
        Trade
      </a>
    </div>
  );
}
