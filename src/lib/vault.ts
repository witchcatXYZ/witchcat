import { RPC_URL, VAULT_CA } from "@/lib/site";
import { padAddr, padUint, sendTx } from "@/lib/wallet";

const HARVEST = "4641257d";
const PULL = "f2d5d56b";
const SET_TOKEN = "6fcd3921";
const SET_POOL = "d51a786b";
const SET_CLAIMER = "cdfb5832";

async function rpc<T>(method: string, params: unknown[]): Promise<T> {
  const res = await fetch(RPC_URL, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }),
  });
  const json = (await res.json()) as { result?: T; error?: { message: string } };
  if (json.error) throw new Error(json.error.message);
  return json.result as T;
}

export async function readVaultBalance(): Promise<bigint> {
  if (!VAULT_CA) return 0n;
  const hex = await rpc<string>("eth_getBalance", [VAULT_CA, "latest"]);
  return BigInt(hex);
}

export function encodeHarvest() {
  return "0x" + HARVEST;
}

export function encodePull(to: string, wei: bigint) {
  return "0x" + PULL + padAddr(to) + padUint(wei);
}

export function encodeSetToken(addr: string) {
  return "0x" + SET_TOKEN + padAddr(addr);
}

export function encodeSetPoolId(poolId: string) {
  const id = poolId.replace(/^0x/, "").padStart(64, "0");
  return "0x" + SET_POOL + id;
}

export function encodeSetClaimer(addr: string) {
  return "0x" + SET_CLAIMER + padAddr(addr);
}

export async function sendHarvest() {
  if (!VAULT_CA) throw new Error("Vault not set");
  return sendTx(VAULT_CA, encodeHarvest());
}

export async function sendPull(to: string, wei: bigint) {
  if (!VAULT_CA) throw new Error("Vault not set");
  return sendTx(VAULT_CA, encodePull(to, wei));
}
