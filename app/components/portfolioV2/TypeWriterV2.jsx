"use client";

import React from "react";

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function safeNum(v) {
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

export default function TypewriterV2({
  text = "",
  speedMs = 22,
  startDelayMs = 0,
  periodPauseMs = 320,

  cursor = true,
  cursorChar = "▍",
  className = "",

  /** CONTROLLED */
  hasRun = false,
  onDone = null,
}) {
  const [out, setOut] = React.useState("");
  const [done, setDone] = React.useState(false);

  // ✅ "run once" refs (Strict Mode safe)
  const startedRef = React.useRef(false);
  const completedRef = React.useRef(false);

  const speed = React.useMemo(
    () => clamp(safeNum(speedMs) ?? 22, 5, 200),
    [speedMs]
  );

  const startDelay = React.useMemo(
    () => Math.max(0, safeNum(startDelayMs) ?? 0),
    [startDelayMs]
  );

  const periodPause = React.useMemo(
    () => Math.max(0, safeNum(periodPauseMs) ?? 0),
    [periodPauseMs]
  );

  React.useEffect(() => {
    // If parent says it already ran → render full text immediately
    if (hasRun) {
      completedRef.current = true;
      startedRef.current = true;
      setOut(text);
      setDone(true);
      return;
    }

    // ✅ already completed once → never run again
    if (completedRef.current) return;

    // prevent duplicate starts (but allow Strict Mode re-run after cleanup)
    if (startedRef.current) return;
    startedRef.current = true;

    let i = 0;
    let tStart = null;
    let tInterval = null;
    let tPause = null;

    setOut("");
    setDone(false);

    const clearAll = () => {
      if (tStart) window.clearTimeout(tStart);
      if (tInterval) window.clearInterval(tInterval);
      if (tPause) window.clearTimeout(tPause);
      tStart = null;
      tInterval = null;
      tPause = null;
    };

    const step = () => {
      i += 1;
      setOut(text.slice(0, i));

      if (i >= text.length) {
        clearAll();
        completedRef.current = true;
        setDone(true);
        onDone?.();
        return;
      }

      // pause after "."
      if (text[i - 1] === "." && periodPause > 0) {
        if (tInterval) {
          window.clearInterval(tInterval);
          tInterval = null;
        }
        tPause = window.setTimeout(() => {
          tPause = null;
          tInterval = window.setInterval(step, speed);
        }, periodPause);
      }
    };

    tStart = window.setTimeout(() => {
      tStart = null;
      tInterval = window.setInterval(step, speed);
    }, startDelay);

    return () => {
      clearAll();

      // ✅ Strict Mode: cleanup fires immediately in dev before the "real" run.
      // If we didn't complete, allow the next effect call to start.
      if (!completedRef.current) startedRef.current = false;
    };
  }, [text, speed, startDelay, periodPause, hasRun, onDone]);

  return (
    <span className={className}>
      {out}
      {cursor && !done ? (
        <span className="inline-block align-baseline opacity-80 animate-pulse">
          {cursorChar}
        </span>
      ) : null}
    </span>
  );
}
