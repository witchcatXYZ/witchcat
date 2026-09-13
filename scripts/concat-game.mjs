import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const src = "/workspace/attachments";
const files = [
  "02-const.js",
  "02-music-player.js",
  "02-text-manager.js",
  "02-var.js",
  "03-fade-screen.js",
  "03-level.js",
  "03-music-utils.js",
  "04-images-decoder.js",
  "04-level-decoder.js",
  "05-collisions.js",
  "10-canvas.js",
  "10-level.js",
  "10-tiles.js",
  "20-character-movement.js",
  "20-character.js",
  "20-life.js",
  "51-canvas-animations.js",
  "90-cinematic.js",
  "95-events.js",
  "95-gamepad-events.js",
  "97-music.js",
  "97-sfx.js",
  "98-game.js",
];

let body = files
  .map((f) => {
    let t = readFileSync(join(src, f), "utf8");
    if (f === "02-var.js") {
      t = t.replace(
        `const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const backgroundCanvas = document.getElementById('gameBackgroundCanvas');
const backgroundCtx = backgroundCanvas.getContext('2d');`,
        `/* canvases injected by bootWitchCat */`,
      );
    }
    if (f === "98-game.js") {
      t = t.replace(/\nloadGame\(\);\s*$/, "\n");
      t = t.replace(
        `document.addEventListener('keydown', handleKeyDown);
  document.addEventListener('keyup', handleKeyUp);
  requestAnimationFrame(animate);`,
        `document.addEventListener('keydown', handleKeyDown);
  document.addEventListener('keyup', handleKeyUp);
  __raf = requestAnimationFrame(animate);`,
      );
    }
    if (f === "51-canvas-animations.js") {
      t = t.replace(
        `function animate(ts) {
  if (!lastTimestamp) lastTimestamp = ts;`,
        `function animate(ts) {
  if (!__running) return;
  if (!lastTimestamp) lastTimestamp = ts;`,
      );
      t = t.replace(
        `  handleGamepadInput();
  requestAnimationFrame(animate);
}`,
        `  handleGamepadInput();
  if (__running) __raf = requestAnimationFrame(animate);
}`,
      );
    }
    return `\n/* ===== ${f} ===== */\n${t}`;
  })
  .join("\n");

const out = `/* Witch Cat engine — Satanimax JS13K (MIT) + Erkan Akdeniz 2026 port.
   Concatenated from original src/js in gulp load order. */
(function (global) {
  "use strict";

  function bootWitchCat(opts) {
    const canvas = opts.canvas;
    const backgroundCanvas = opts.backgroundCanvas;
    const ctx = canvas.getContext("2d");
    const backgroundCtx = backgroundCanvas.getContext("2d");
    let __running = true;
    let __raf = 0;

${body}

    function mapCodeToInput(code) {
      switch (code) {
        case "ArrowUp":
        case "KeyW":
        case "KeyZ":
          return "up";
        case "ArrowDown":
        case "KeyS":
          return "down";
        case "ArrowLeft":
        case "KeyA":
        case "KeyQ":
          return "left";
        case "ArrowRight":
        case "KeyD":
          return "right";
        case "Space":
        case "Enter":
          return "action";
        default:
          return null;
      }
    }

    loadGame();

    const api = {
      stop() {
        __running = false;
        if (__raf) cancelAnimationFrame(__raf);
        document.removeEventListener("keydown", handleKeyDown);
        document.removeEventListener("keyup", handleKeyUp);
      },
      input: handleInput,
      release: handleRelease,
      getState() {
        return {
          x: characterX,
          y: characterY,
          season: currentSeason,
          cats: (savedData && savedData.collectedCatsList && savedData.collectedCatsList.length) || 0,
          life: characterLife,
          maxLife: characterMaxLife,
        };
      },
      newGame() {
        try {
          localStorage.removeItem("witch-cat");
        } catch {}
      },
    };

    global.__controlsTest = {
      getX: () => characterX,
      getY: () => characterY,
      getYaw: () => characterX,
      getSpeed: () => (keyStack.length ? characterSpeed : 0),
      setKeys(codes) {
        keyStack.length = 0;
        for (const c of codes || []) {
          const dir = mapCodeToInput(c);
          if (dir && dir !== "action" && !keyStack.includes(dir)) keyStack.push(dir);
          if (dir === "action") handleInput("action");
        }
      },
    };

    return api;
  }

  global.WitchCat = { boot: bootWitchCat };
})(typeof window !== "undefined" ? window : globalThis);
`;

writeFileSync("/workspace/public/game/engine.js", out);
console.log("wrote", out.length, "bytes");
