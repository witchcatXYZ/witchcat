# Witchcat launch — Robinhood Chain 4663

Pad: https://letscash.fun/launch
Hook: `0x75A54357D9C78a2Db19004a5FDc76c50F9242AEC`

Do not put this file’s steps on a public page.

## Remix

Solidity 0.8.24 · optimizer 200 · EVM Cancun

1. Deploy `contracts/Cauldron.sol` with `ops_` = your EOA.
2. Note `VAULT_CA`. Paste into `src/lib/site.ts` as `VAULT_CA` + `OPS_EOA`.

Done:
- VAULT `0x9C2cC0Dc682eCac3953caC9F61b3411F2c307E0A`
- OPS `0x0851C7428B51875A72CCF03C19a6C65c0fDe2404`
- TOKEN `0x51F7f4B4b1f9B4B28539eb10aF3FDE96dAe6B9cc`
- POOL `0x06fa11d038b900096e95ab401e5864238e93a52b0e67931f3ad5713698adade3`
- LAUNCH_TX `0x3687bd953d3755853eaaf86605427ef583fadd0f510a7a59b7f4534f9f045dbd`

## LetsCash form

```
Name:        Witchcat
Ticker:      WITCH
Description: Find the cats. Change the seasons. Every swap feeds the cauldron.
Website:     https://www.witchcat.lol
X:           https://x.com/WitchcatLOL
GitHub:      https://github.com/witchcatXYZ/witchcat
Pair:        ETH
Supply:      1B
Tax:         3%
Fee recipient: 0x0851C7428B51875A72CCF03C19a6C65c0fDe2404 (ops EOA, not the vault)
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
