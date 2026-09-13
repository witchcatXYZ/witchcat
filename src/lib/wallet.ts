import { CHAIN_ID, RPC_URL } from "@/lib/site";

type Eth = {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
  on?: (ev: string, fn: (...a: unknown[]) => void) => void;
};

function getEth(): Eth | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as { ethereum?: Eth };
  return w.ethereum ?? null;
}

const CHAIN_HEX = "0x" + CHAIN_ID.toString(16);

export async function connectWallet(): Promise<string> {
  const eth = getEth();
  if (!eth) throw new Error("No injected wallet. Use MetaMask or OKX.");
  const accounts = (await eth.request({ method: "eth_requestAccounts" })) as string[];
  const addr = accounts?.[0];
  if (!addr) throw new Error("No account");
  try {
    await eth.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: CHAIN_HEX }],
    });
  } catch (err) {
    const code = (err as { code?: number }).code;
    if (code === 4902) {
      await eth.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: CHAIN_HEX,
            chainName: "Robinhood Chain",
            nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
            rpcUrls: [RPC_URL],
            blockExplorerUrls: ["https://robinhoodchain.blockscout.com"],
          },
        ],
      });
    } else {
      throw err;
    }
  }
  return addr;
}

export async function sendTx(to: string, data: string): Promise<string> {
  const eth = getEth();
  if (!eth) throw new Error("No wallet");
  const accounts = (await eth.request({ method: "eth_accounts" })) as string[];
  const from = accounts?.[0];
  if (!from) throw new Error("Connect first");
  const hash = (await eth.request({
    method: "eth_sendTransaction",
    params: [{ from, to, data, value: "0x0" }],
  })) as string;
  return hash;
}

export function padAddr(addr: string) {
  return addr.replace(/^0x/, "").toLowerCase().padStart(64, "0");
}

export function padUint(n: bigint) {
  return n.toString(16).padStart(64, "0");
}
