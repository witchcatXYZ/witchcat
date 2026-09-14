import { LINE, SITE_URL, SLOGAN, TICKER, TOKEN_CA, X_HANDLE } from "@/lib/site";

export { X_HANDLE };
export const X_DISPLAY_NAME = "Witchcat";
export const X_LOCATION = "Robinhood Chain";
export const X_WEBSITE = SITE_URL.replace(/^https:\/\//, "");

/** 106 / 160 */
export const X_BIO =
  "Find the cats. Change the seasons. Every swap feeds the cauldron. $WITCH on Robinhood Chain · witchcat.lol";

export const X_PIN = `The cats vanished.

A witch, four seasons, twelve familiars.
Play it. No stamp. No keeper.

${SITE_URL}

Unofficial token. Game by Satanimax, pixel art by Lylouf. MIT.`;

export const X_LIVE = `$WITCH is live.

${SLOGAN}
${LINE}

${SITE_URL}
CA ${TOKEN_CA}`;

export const X_SEASONS = `Winter freezes the water.
Autumn fills the pits.
Summer grows the vines.
Spring burns the stone.

Twelve cats. Four temples.

${SITE_URL}/play`;

export const X_REPLY = `Unofficial. Not JS13K. Game: Witch Cat by Satanimax. Pixel art: Lylouf. MIT. $${TICKER} is original.`;
