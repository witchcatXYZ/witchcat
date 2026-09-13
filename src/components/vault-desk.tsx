import { useState } from "react";
import { HOOK, OPS_EOA, POOL_ID, TOKEN_CA, VAULT_CA, shortCa } from "@/lib/site";
import { connectWallet } from "@/lib/wallet";
import { readVaultBalance, sendHarvest, sendPull } from "@/lib/vault";

function fmtEth(wei: bigint) {
  const n = Number(wei) / 1e18;
  return n.toFixed(6) + " ETH";
}

export function VaultDesk() {
  const [account, setAccount] = useState("");
  const [bal, setBal] = useState<bigint | null>(null);
  const [to, setTo] = useState("");
  const [eth, setEth] = useState("");
  const [log, setLog] = useState("");
  const [busy, setBusy] = useState(false);

  async function connect() {
    setBusy(true);
    try {
      const a = await connectWallet();
      setAccount(a);
      setTo(a);
      setLog("connected " + shortCa(a));
    } catch (e) {
      setLog(e instanceof Error ? e.message : "connect failed");
    } finally {
      setBusy(false);
    }
  }

  async function refresh() {
    if (!VAULT_CA) {
      setLog("VAULT_CA empty");
      return;
    }
    setBusy(true);
    try {
      const b = await readVaultBalance();
      setBal(b);
      setLog("balance " + fmtEth(b));
    } catch (e) {
      setLog(e instanceof Error ? e.message : "read failed");
    } finally {
      setBusy(false);
    }
  }

  async function harvest() {
    setBusy(true);
    try {
      const hash = await sendHarvest();
      setLog("harvest " + hash);
    } catch (e) {
      setLog(e instanceof Error ? e.message : "harvest failed");
    } finally {
      setBusy(false);
    }
  }

  async function pull() {
    setBusy(true);
    try {
      const wei = BigInt(Math.round(Number(eth) * 1e18));
      if (wei <= 0n) throw new Error("amount");
      const hash = await sendPull(to, wei);
      setLog("pull " + hash);
    } catch (e) {
      setLog(e instanceof Error ? e.message : "pull failed");
    } finally {
      setBusy(false);
    }
  }

  const ready = Boolean(VAULT_CA);

  return (
    <div className="space-y-4 border-2 border-ink bg-surface p-4">
      <p className="font-mono text-xs text-muted">
        vault {VAULT_CA ? shortCa(VAULT_CA) : "—"} · token {TOKEN_CA ? shortCa(TOKEN_CA) : "—"} · pool{" "}
        {POOL_ID ? POOL_ID.slice(0, 10) + "…" : "—"}
        <br />
        hook {shortCa(HOOK)} · ops {OPS_EOA ? shortCa(OPS_EOA) : "—"}
      </p>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          disabled={busy}
          onClick={connect}
          className="border-2 border-ink px-3 py-1 font-display text-sm hover:bg-ink hover:text-bg"
        >
          Connect
        </button>
        <button
          type="button"
          disabled={busy || !ready}
          onClick={refresh}
          className="border-2 border-ink px-3 py-1 font-display text-sm hover:bg-ink hover:text-bg disabled:opacity-40"
        >
          Read balance
        </button>
        <button
          type="button"
          disabled={busy || !ready || !account}
          onClick={harvest}
          className="border-2 border-ink bg-band px-3 py-1 font-display text-sm text-band-ink disabled:opacity-40"
        >
          Harvest
        </button>
      </div>
      <p className="text-sm">Cauldron: {bal === null ? "—" : fmtEth(bal)}</p>
      <div className="grid gap-2 sm:grid-cols-2">
        <label className="block text-sm">
          Pull to
          <input
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="mt-1 w-full border-2 border-ink bg-bg px-2 py-1 font-mono text-sm"
            placeholder="0x…"
          />
        </label>
        <label className="block text-sm">
          Amount ETH
          <input
            value={eth}
            onChange={(e) => setEth(e.target.value)}
            className="mt-1 w-full border-2 border-ink bg-bg px-2 py-1 font-mono text-sm"
            placeholder="0.01"
          />
        </label>
      </div>
      <button
        type="button"
        disabled={busy || !ready || !account}
        onClick={pull}
        className="border-2 border-ink px-3 py-1 font-display text-sm hover:bg-ink hover:text-bg disabled:opacity-40"
      >
        Pull
      </button>
      <p className="font-mono text-xs break-all text-muted">{log || account || "desk idle"}</p>
      <p className="text-xs text-muted">
        Harvest is public: ETH stays in the cauldron. Pull reverts if you are not ops or if amount exceeds
        balance. Do not paste Max.
      </p>
    </div>
  );
}
