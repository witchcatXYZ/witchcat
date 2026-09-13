export const NAME = "Witchcat";
export const TICKER = "WITCH";
export const SLOGAN = "Find the cats. Change the seasons.";
export const LINE = "Every swap feeds the cauldron.";
export const DISCLAIMER =
  "Unofficial token. Not affiliated with JS13K or any artist. Game: Witch Cat by Satanimax, pixel art by Lylouf. MIT.";

export const SITE_URL = "https://www.witchcat.lol";
export const GITHUB_URL = "https://github.com/witchcatXYZ/witchcat";
export const X_URL = "";
export const X_HANDLE = "";

export const CHAIN_ID = 4663;
export const CHAIN_NAME = "Robinhood Chain";
export const RPC_URL = "https://rpc.mainnet.chain.robinhood.com";
export const EXPLORER_URL = "https://robinhoodchain.blockscout.com";
export const LETSCASH_LAUNCH = "https://letscash.fun/launch";

export const HOOK = "0x75A54357D9C78a2Db19004a5FDc76c50F9242AEC";
export const POOL_MANAGER = "0x8366a39CC670B4001A1121B8F6A443A643e40951";
export const FACTORY = "0x5bd1Fbe78a78fe8236fa00CF48fbEBA74ae34661";

/** Empty until launch. Never show a fake CA. */
export const TOKEN_CA: string = "";
export const VAULT_CA: string = "";
export const POOL_ID: string = "";
export const OPS_EOA: string = "";
export const LAUNCH_BLOCK = 0;

export function tokenLive() {
  return TOKEN_CA.length === 42;
}

export function letscashTokenUrl() {
  if (!tokenLive()) return LETSCASH_LAUNCH;
  return `https://letscash.fun/token/${TOKEN_CA}`;
}

export function explorerAddress(addr: string) {
  return `${EXPLORER_URL}/address/${addr}`;
}

export function shortCa(addr: string) {
  if (!addr || addr.length < 10) return "";
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}

export const ATTRIBUTION =
  "Witch Cat © Satanimax (JS13K). Pixel art © Lylouf. MIT. Token and this site are original.";

export const SEASONS = [
  {
    id: "winter",
    title: "Winter",
    body: "Snow blocks the path. Water freezes and becomes walkable.",
  },
  {
    id: "autumn",
    title: "Autumn",
    body: "Mushrooms grow. Pits fill with leaves.",
  },
  {
    id: "summer",
    title: "Summer",
    body: "Roots block the way. Vines let you climb.",
  },
  {
    id: "spring",
    title: "Spring",
    body: "Stone flowers bloom and can be burned.",
  },
] as const;
