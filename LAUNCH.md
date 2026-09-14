# Witchcat launch — Robinhood Chain 4663

Pad: https://letscash.fun/launch
Hook: `0x75A54357D9C78a2Db19004a5FDc76c50F9242AEC`

Do not put this file’s steps on a public page.

## Remix

Solidity 0.8.24 · optimizer 200 · EVM Cancun

1. Deploy `contracts/Cauldron.sol` with `ops_` = your EOA.
2. Note `VAULT_CA`. Paste into `src/lib/site.ts` as `VAULT_CA` + `OPS_EOA`.

## LetsCash form

```
Name:        Witchcat
Ticker:      WITCH
Description: Find the cats. Change the seasons. Every swap feeds the cauldron.
Website:     https://www.witchcat.lol
X:           https://x.com/WitchcatXYZ
GitHub:      https://github.com/witchcatXYZ/witchcat
Pair:        ETH
Supply:      1B
Tax:         3%
Fee recipient: OPS EOA (not the vault yet)
Image:       public/letscash.png
```

Do not put the vault as fee recipient on the form.

X kit: `public/x/` (logo 400, banner 1500×500, post, bio). Preview at `/kit`.

## After launch

1. Copy token CA and pool id (bytes32 from TokenLaunched, not an address).
2. Ops on hook: `updateCreator(poolId, VAULT_CA)`.
3. Vault: `setTokenCA`, `setPoolId`, `setClaimer(0x75A54357D9C78a2Db19004a5FDc76c50F9242AEC)`.
4. Put CAs in `src/lib/site.ts` + `public/token.json`. Push `main`.
5. Anyone: `harvest()` — ETH stays in the cauldron. Ops: `pull(to, wei)`.

Test: small harvest, vault ETH went up. A plain transfer is only `receive()`, not the hook.

Desk: https://www.witchcat.lol/ops (not in nav)
