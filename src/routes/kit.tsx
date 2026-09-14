import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  X_BIO,
  X_DISPLAY_NAME,
  X_HANDLE,
  X_LIVE,
  X_LOCATION,
  X_PIN,
  X_REPLY,
  X_SEASONS,
  X_WEBSITE,
} from "@/lib/x-copy";

export const Route = createFileRoute("/kit")({ component: Kit });

function CopyBtn({ text, label }: { text: string; label: string }) {
  const [ok, setOk] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setOk(true);
      window.setTimeout(() => setOk(false), 1600);
    } catch {
      setOk(false);
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="min-h-11 border-2 border-ink bg-bg px-3 font-display text-sm text-ink hover:bg-ink hover:text-bg"
    >
      {ok ? "Copied" : label}
    </button>
  );
}

function Block({ title, text, hint }: { title: string; text: string; hint?: string }) {
  return (
    <section className="border-2 border-ink bg-surface">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-ink px-3 py-2">
        <h2 className="text-lg">{title}</h2>
        <CopyBtn text={text} label="Copy" />
      </div>
      <pre className="whitespace-pre-wrap px-3 py-3 font-sans text-sm leading-relaxed text-ink">{text}</pre>
      {hint ? <p className="border-t-2 border-ink px-3 py-2 text-xs text-muted">{hint}</p> : null}
    </section>
  );
}

function Kit() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <p className="font-display text-sm uppercase tracking-[0.2em] text-band">Not in the nav</p>
      <h1 className="mt-1 text-4xl">X kit</h1>
      <p className="mt-3 text-muted">
        Cauldron is ready. Handle is live. Paste https://x.com/WitchcatLOL on the LetsCash form.
      </p>

      <section className="mt-8 border-2 border-ink bg-surface p-4">
        <h2 className="text-2xl">Contract</h2>
        <p className="mt-2 text-sm text-muted">
          <code className="font-mono text-ink">Cauldron.sol</code> is launch-ready. Remix: Solidity 0.8.24,
          optimizer 200, EVM Cancun. Constructor: your EOA. Fee recipient on the LetsCash form is that EOA,
          not the vault. After the token exists, point the hook at the vault.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl">Profile mock</h2>
        <div className="mt-3 overflow-hidden border-2 border-ink bg-bg">
          <img src="/x/banner.png" alt="X banner" className="w-full object-cover" />
          <div className="relative px-4 pb-4 pt-8">
            <img
              src="/x/logo.png"
              alt="X profile"
              width={96}
              height={96}
              className="pixelated absolute -top-12 left-4 size-20 rounded-full border-2 border-ink bg-bg object-cover sm:size-24"
            />
            <p className="mt-2 font-display text-xl leading-none sm:mt-4">{X_DISPLAY_NAME}</p>
            <p className="mt-1 text-sm text-muted">@{X_HANDLE}</p>
            <p className="mt-3 max-w-xl text-sm">{X_BIO}</p>
            <p className="mt-2 text-xs text-muted">
              {X_LOCATION} · {X_WEBSITE}
            </p>
          </div>
        </div>
      </section>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        <Block title="Display name" text={X_DISPLAY_NAME} />
        <Block title="Handle" text={X_HANDLE} />
        <Block title="Location" text={X_LOCATION} />
        <Block title="Website" text={`https://${X_WEBSITE}`} />
      </div>

      <div className="mt-3">
        <Block title="Bio" text={X_BIO} hint="106 / 160. Paste as-is." />
      </div>

      <section className="mt-8">
        <h2 className="text-2xl">Images</h2>
        <p className="mt-2 text-sm text-muted">
          Profile photo is the witch (circle). Cover square is the alt if you want the wordmark in the avatar.
          Pin and live posts use the wide still.
        </p>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2">
          <li className="border-2 border-ink bg-surface p-3">
            <p className="font-display text-sm">Profile photo · 400×400</p>
            <div className="mt-3 flex items-center gap-4">
              <img
                src="/x/logo.png"
                alt="Witch profile"
                width={96}
                height={96}
                className="pixelated size-24 rounded-full border-2 border-ink object-cover"
              />
              <img
                src="/x/logo.png"
                alt=""
                width={96}
                height={96}
                className="pixelated size-24 border-2 border-ink object-cover"
              />
            </div>
            <a href="/x/logo.png" download="witchcat-x-logo.png" className="mt-3 inline-block font-display text-sm underline">
              Download logo
            </a>
          </li>
          <li className="border-2 border-ink bg-surface p-3">
            <p className="font-display text-sm">Alt photo · cover square</p>
            <img
              src="/x/logo-cover.png"
              alt="Cover as profile"
              width={96}
              height={96}
              className="pixelated mt-3 size-24 rounded-full border-2 border-ink object-cover"
            />
            <a
              href="/x/logo-cover.png"
              download="witchcat-x-logo-cover.png"
              className="mt-3 inline-block font-display text-sm underline"
            >
              Download alt
            </a>
          </li>
        </ul>
        <div className="mt-4 border-2 border-ink bg-surface p-3">
          <p className="font-display text-sm">Banner · 1500×500</p>
          <img src="/x/banner.png" alt="X banner" className="mt-3 w-full border-2 border-ink" />
          <a href="/x/banner.png" download="witchcat-x-banner.png" className="mt-3 inline-block font-display text-sm underline">
            Download banner
          </a>
        </div>
        <div className="mt-4 border-2 border-ink bg-surface p-3">
          <p className="font-display text-sm">Post still · 1500×1000</p>
          <img src="/x/post.png" alt="Post image" className="pixelated mt-3 w-full border-2 border-ink" />
          <div className="mt-3 flex flex-wrap gap-4">
            <a href="/x/post.png" download="witchcat-x-post.png" className="font-display text-sm underline">
              Download post
            </a>
            <a href="/x/article.png" download="witchcat-x-article.png" className="font-display text-sm underline">
              Article 1500×600
            </a>
            <a href="/x/witchcat-x-kit.zip" download="witchcat-x-kit.zip" className="font-display text-sm underline">
              All images (zip)
            </a>
          </div>
        </div>
      </section>

      <div className="mt-8 space-y-3">
        <h2 className="text-2xl">Posts</h2>
        <Block title="Pin" text={X_PIN} hint="Attach post.png. No CA until it exists." />
        <Block title="Live" text={X_LIVE} hint="Paste the token CA on the last line. Attach post.png." />
        <Block title="Seasons" text={X_SEASONS} hint="Attach banner.png or article.png." />
        <Block title="Reply" text={X_REPLY} hint="Under the pin if someone asks whose game." />
      </div>
    </main>
  );
}
