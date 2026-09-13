import { createFileRoute, Link } from "@tanstack/react-router";
import { SEASONS, TICKER } from "@/lib/site";

export const Route = createFileRoute("/how")({ component: How });

function How() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-4xl">How it works</h1>
      <p className="mt-3 text-muted">
        A small open world. Four temples. Twelve cats. The witch stays centered; the grove scrolls. Original
        JS13K game by Satanimax, pixel art by Lylouf, MIT. This site hosts a faithful port with a title
        screen, continue, and touch controls.
      </p>

      <h2 className="mt-10 text-2xl">Controls</h2>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-muted">
        <li>Move with arrow keys or WASD (ZQSD on AZERTY).</li>
        <li>Space or Enter: read a sign, step a season stone, or throw a fireball.</li>
        <li>Gamepad D-pad and A work. On a phone, use the pad and the A button.</li>
      </ul>

      <h2 className="mt-10 text-2xl">Seasons</h2>
      <p className="mt-2 text-muted">
        Each temple holds an orb. Touching an orb unlocks that season and heals you. Stand on a season stone
        and press action to cycle seasons you have unlocked.
      </p>
      <ul className="mt-4 space-y-3">
        {SEASONS.map((s) => (
          <li key={s.id} className="border-2 border-ink bg-surface p-4">
            <h3 className="text-xl">{s.title}</h3>
            <p className="text-sm text-muted">{s.body}</p>
          </li>
        ))}
      </ul>

      <h2 className="mt-10 text-2xl">Cats</h2>
      <p className="mt-2 text-muted">
        Walk into a cat to collect it. The sign that marked its region is replaced by the cat. Twelve in
        all. The last one starts the ending.
      </p>

      <h2 className="mt-10 text-2xl">The token</h2>
      <p className="mt-2 text-muted">
        Playing does not require a wallet and does not mint anything. ${TICKER} is a separate LetsCash token
        on Robinhood Chain. Swaps feed a cauldron contract. Details on the token page.
      </p>

      <Link
        to="/play"
        className="mt-10 inline-block border-2 border-ink bg-band px-5 py-2 font-display text-band-ink no-underline"
      >
        Play
      </Link>
    </main>
  );
}
