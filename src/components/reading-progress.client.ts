/**
 * reading-progress.client.ts — updates the top progress bar's width from
 * scroll position. Throttled with requestAnimationFrame. Uses `mount` so
 * the listener is torn down on view transitions and re-initialized
 * against the new page's document height.
 */

import { mount } from "@cloudflare/nimbus-docs/client";

function initReadingProgress(bar: HTMLElement): () => void {
  let raf = 0;

  const update = () => {
    raf = 0;
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    const progress = max > 0 ? window.scrollY / max : 0;
    bar.style.transform = `scaleX(${progress})`;
  };

  const onScrollOrResize = () => {
    if (!raf) raf = requestAnimationFrame(update);
  };

  update();
  window.addEventListener("scroll", onScrollOrResize, { passive: true });
  window.addEventListener("resize", onScrollOrResize, { passive: true });

  return () => {
    window.removeEventListener("scroll", onScrollOrResize);
    window.removeEventListener("resize", onScrollOrResize);
    if (raf) cancelAnimationFrame(raf);
  };
}

mount("[data-nb-reading-progress]", initReadingProgress);
