import { createFileRoute } from "@tanstack/react-router";
import { VaultDesk } from "@/components/vault-desk";

export const Route = createFileRoute("/ops")({ component: Ops });

function Ops() {
  return (
    <main className="mx-auto max-w-xl px-4 py-12">
      <h1 className="text-3xl">Cauldron desk</h1>
      <p className="mt-2 text-sm text-muted">
        Not in the nav. Harvest anyone. Pull ops. If this looks like an airdrop, close the tab.
      </p>
      <div className="mt-6">
        <VaultDesk />
      </div>
    </main>
  );
}
