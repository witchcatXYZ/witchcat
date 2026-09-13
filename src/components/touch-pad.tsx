import type { PointerEvent } from "react";

type Dir = "up" | "down" | "left" | "right" | "action";

export function TouchPad({
  onDown,
  onUp,
}: {
  onDown: (d: Dir) => void;
  onUp: (d: Dir) => void;
}) {
  function bind(d: Dir) {
    return {
      onPointerDown: (e: PointerEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.currentTarget.setPointerCapture(e.pointerId);
        onDown(d);
      },
      onPointerUp: (e: PointerEvent<HTMLButtonElement>) => {
        e.preventDefault();
        onUp(d);
      },
      onPointerCancel: () => onUp(d),
    };
  }

  const btn =
    "flex size-14 items-center justify-center border-2 border-ink bg-bg/90 font-display text-lg text-ink active:bg-band active:text-band-ink select-none touch-none";

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-end justify-between px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden">
      <div className="pointer-events-auto grid grid-cols-3 grid-rows-3 gap-1">
        <span />
        <button type="button" className={btn} aria-label="Up" {...bind("up")}>
          ↑
        </button>
        <span />
        <button type="button" className={btn} aria-label="Left" {...bind("left")}>
          ←
        </button>
        <span />
        <button type="button" className={btn} aria-label="Right" {...bind("right")}>
          →
        </button>
        <span />
        <button type="button" className={btn} aria-label="Down" {...bind("down")}>
          ↓
        </button>
        <span />
      </div>
      <button
        type="button"
        className={btn + " pointer-events-auto size-16"}
        aria-label="Action"
        {...bind("action")}
      >
        A
      </button>
    </div>
  );
}
