import React, { useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "framer-motion";

export function TypewriterSections({
  sections,
  defaultMode = "word",
  defaultSpeed = 40,
  defaultEraseSpeed = 30,
  defaultPauseAfter = 400,
  defaultPauseBeforeErase = 600,
  initialDelayMs = 0,
  showCursor = false,
  cursorChar = "| ",
  // cursorChar = "▍",
  className = "",
  onFinish,
  runKey = 0, // ✅ only restarts when this changes
  start = true, // ✅ runs only when true
}) {
  const rootRef = useRef(null);
  const inView = useInView(rootRef, { once: true, amount: 0.3 });

  // render state
  const [sectionIdx, setSectionIdx] = useState(0);
  const [unitIdx, setUnitIdx] = useState(0);
  const [phase, setPhase] = useState("typingMain"); // typingMain | erasing | typingRetyped | waitingNextSectionMain | waitingNextSectionRetyped

  // internal refs
  const sectionIdxRef = useRef(0);
  const unitIdxRef = useRef(0);
  const phaseRef = useRef("typingMain");

  // rAF timing refs
  const rafIdRef = useRef(null);
  const nextDueAtRef = useRef(Number.POSITIVE_INFINITY);
  const startedRef = useRef(false);

  // delay gate
  const initialDelayUntilRef = useRef(0);
  const delayArmedRef = useRef(false);
  const typingAllowedRef = useRef(false);

  // latest onFinish/start
  const onFinishRef = useRef(onFinish);
  useEffect(() => {
    onFinishRef.current = onFinish;
  }, [onFinish]);

  const startRef = useRef(start);
  useEffect(() => {
    startRef.current = start;
  }, [start]);

  // finish once
  const finishedFiredRef = useRef(false);
  const fireFinishedOnce = () => {
    if (finishedFiredRef.current) return;
    finishedFiredRef.current = true;
    if (typeof onFinishRef.current === "function") onFinishRef.current();
  };

  const baseNormalizeWord = (w) => (w || "").replace(/[.,!?;:"()]/g, "");
  const resolveHighlightClass = (highlights, rawWord) => {
    const plain = baseNormalizeWord(rawWord);
    return (
      highlights[plain] ||
      highlights[plain.toLowerCase()] ||
      highlights[plain.toUpperCase()] ||
      ""
    );
  };

  const processed = useMemo(() => {
    return sections.map((s) => {
      const mode = s.mode || defaultMode;
      const speed = s.speed ?? defaultSpeed;
      const eraseSpeed = s.eraseSpeed ?? defaultEraseSpeed;
      const pauseAfter = s.pauseAfter ?? defaultPauseAfter;
      const pauseBeforeErase = s.pauseBeforeErase ?? defaultPauseBeforeErase;
      const skipTypingMain = !!s.skipTypingMain;

      const normalizeText = (txt) =>
        (txt || "").replace(/&amp;/g, "&").replace(/&nbsp;/g, " ");

      const mainText = normalizeText(s.text);
      const retypeText = s.retypeText ? normalizeText(s.retypeText) : null;

      const makeWords = (txt) => (txt.trim() ? txt.trim().split(/\s+/) : []);
      const mainWords = makeWords(mainText);
      const retypeWords = retypeText ? makeWords(retypeText) : null;

      const buildUnits = (txt, wordsForTxt) => {
        if (mode === "word") return wordsForTxt;

        const units = [];
        let wordIndex = 0;
        let inWord = false;

        for (let i = 0; i < txt.length; i++) {
          const char = txt[i];
          if (/\s/.test(char)) {
            units.push({ char, wordIndex: null });
            if (inWord) {
              inWord = false;
              wordIndex += 1;
            }
          } else {
            units.push({ char, wordIndex });
            inWord = true;
          }
        }
        return units;
      };

      const mainUnits = buildUnits(mainText, mainWords);
      const retypeUnits = retypeText
        ? buildUnits(retypeText, retypeWords)
        : null;

      const legacyBreakAfter = s.breakAfter || [];
      const breakAfterMain = s.breakAfterMain ?? legacyBreakAfter;
      const breakAfterRetype = s.breakAfterRetype ?? legacyBreakAfter;

      return {
        mode,
        speed,
        eraseSpeed,
        pauseAfter,
        pauseBeforeErase,
        skipTypingMain,

        mainText,
        mainWords,
        mainUnits,

        retypeText,
        retypeWords,
        retypeUnits,

        highlights: s.highlights || {},
        breakAfterMain,
        breakAfterRetype,
      };
    });
  }, [
    sections,
    defaultMode,
    defaultSpeed,
    defaultEraseSpeed,
    defaultPauseAfter,
    defaultPauseBeforeErase,
  ]);

  // ✅ FREEZE processed during a run (prevents flashing when parent rerenders)
  const processedRef = useRef(processed);
  const runProcessedRef = useRef(processed); // snapshot used during active run
  useEffect(() => {
    processedRef.current = processed;
    if (!startedRef.current) runProcessedRef.current = processed;
  }, [processed]);

  const initialDelayMsRef = useRef(initialDelayMs);
  useEffect(() => {
    initialDelayMsRef.current = initialDelayMs;
  }, [initialDelayMs]);

  // keep refs synced
  useEffect(() => {
    sectionIdxRef.current = sectionIdx;
  }, [sectionIdx]);
  useEffect(() => {
    unitIdxRef.current = unitIdx;
  }, [unitIdx]);
  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  // commit helpers
  const commitSectionIdx = (v) => {
    sectionIdxRef.current = v;
    setSectionIdx(v);
  };
  const commitUnitIdx = (v) => {
    unitIdxRef.current = v;
    setUnitIdx(v);
  };
  const commitPhase = (v) => {
    phaseRef.current = v;
    setPhase(v);
  };

  const cancelLoop = () => {
    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    rafIdRef.current = null;

    startedRef.current = false;

    delayArmedRef.current = false;
    typingAllowedRef.current = false;
    initialDelayUntilRef.current = 0;

    nextDueAtRef.current = Number.POSITIVE_INFINITY;

    runProcessedRef.current = processedRef.current;
  };

  const runKeyRef = useRef(runKey);

  useEffect(() => {
    if (!inView) return;

    const latestProc = processedRef.current;
    if (!latestProc.length) return;

    // stop immediately if start is false
    if (!startRef.current) {
      if (startedRef.current) cancelLoop();
      return;
    }

    // runKey forces restart
    if (runKeyRef.current !== runKey) {
      runKeyRef.current = runKey;
      finishedFiredRef.current = false;
      cancelLoop();
    }

    // don't restart if already running or done
    if (startedRef.current || finishedFiredRef.current) return;

    startedRef.current = true;

    // ✅ snapshot sections for this run
    runProcessedRef.current = processedRef.current;

    // hard reset visible state
    commitSectionIdx(0);
    commitUnitIdx(0);
    commitPhase("typingMain");

    // arm delay
    const t0 = performance.now();
    const delay = initialDelayMsRef.current || 0;

    delayArmedRef.current = true;
    typingAllowedRef.current = delay <= 0;

    initialDelayUntilRef.current = t0 + delay;
    nextDueAtRef.current = delay > 0 ? initialDelayUntilRef.current : t0;

    const tick = (now) => {
      if (!startRef.current) {
        cancelLoop();
        return;
      }

      const curProc = runProcessedRef.current;

      // finished?
      if (sectionIdxRef.current >= curProc.length) {
        fireFinishedOnce();
        cancelLoop();
        return;
      }

      // delay gate
      if (delayArmedRef.current && !typingAllowedRef.current) {
        if (now < initialDelayUntilRef.current) {
          rafIdRef.current = requestAnimationFrame(tick);
          return;
        }
        typingAllowedRef.current = true;
        nextDueAtRef.current = now;
      }

      if (!typingAllowedRef.current) {
        rafIdRef.current = requestAnimationFrame(tick);
        return;
      }

      if (now < nextDueAtRef.current) {
        rafIdRef.current = requestAnimationFrame(tick);
        return;
      }

      // one step per frame
      const sIdx = sectionIdxRef.current;
      const sec = curProc[sIdx];

      const {
        mainUnits,
        retypeUnits,
        speed,
        eraseSpeed,
        pauseAfter,
        pauseBeforeErase,
        skipTypingMain,
      } = sec;

      const hasRetype = !!(sec.retypeText && retypeUnits && retypeUnits.length);
      const p = phaseRef.current;
      const u = unitIdxRef.current;

      const advanceSection = () => {
        const nextS = sectionIdxRef.current + 1;
        commitSectionIdx(nextS);
        commitUnitIdx(0);
        commitPhase("typingMain");

        if (nextS >= curProc.length) {
          fireFinishedOnce();
          cancelLoop();
          return true;
        }
        return false;
      };

      // ✅ waiting phases that actually honor pauseAfter
      if (p === "waitingNextSectionMain" || p === "waitingNextSectionRetyped") {
        if (advanceSection()) return;
        nextDueAtRef.current = now + speed;
        rafIdRef.current = requestAnimationFrame(tick);
        return;
      }

      if (p === "typingMain") {
        if (skipTypingMain) {
          if (u !== mainUnits.length) {
            commitUnitIdx(mainUnits.length);
            nextDueAtRef.current = now + speed;
          } else {
            if (hasRetype) {
              // pauseBeforeErase is honored by due-time; phase can switch now
              nextDueAtRef.current = now + pauseBeforeErase;
              commitPhase("erasing");
              commitUnitIdx(mainUnits.length);
            } else {
              // ✅ HOLD for pauseAfter, THEN advance
              commitPhase("waitingNextSectionMain");
              nextDueAtRef.current = now + pauseAfter;
            }
          }
          rafIdRef.current = requestAnimationFrame(tick);
          return;
        }

        if (u < mainUnits.length) {
          commitUnitIdx(u + 1);
          nextDueAtRef.current = now + speed;
          rafIdRef.current = requestAnimationFrame(tick);
          return;
        }

        if (hasRetype) {
          nextDueAtRef.current = now + pauseBeforeErase;
          commitPhase("erasing");
          commitUnitIdx(mainUnits.length);
          rafIdRef.current = requestAnimationFrame(tick);
          return;
        }

        // ✅ HOLD for pauseAfter, THEN advance
        commitPhase("waitingNextSectionMain");
        nextDueAtRef.current = now + pauseAfter;
        rafIdRef.current = requestAnimationFrame(tick);
        return;
      }

      if (p === "erasing") {
        if (u > 0) {
          commitUnitIdx(u - 1);
          nextDueAtRef.current = now + eraseSpeed;
          rafIdRef.current = requestAnimationFrame(tick);
          return;
        }

        if (hasRetype) {
          commitPhase("typingRetyped");
          commitUnitIdx(0);
          nextDueAtRef.current = now + speed;
        } else {
          if (advanceSection()) return;
          nextDueAtRef.current = now + speed;
        }

        rafIdRef.current = requestAnimationFrame(tick);
        return;
      }

      if (p === "typingRetyped") {
        if (!retypeUnits) {
          if (advanceSection()) return;
          nextDueAtRef.current = now + speed;
          rafIdRef.current = requestAnimationFrame(tick);
          return;
        }

        if (u < retypeUnits.length) {
          commitUnitIdx(u + 1);
          nextDueAtRef.current = now + speed;
          rafIdRef.current = requestAnimationFrame(tick);
          return;
        }

        // ✅ HOLD for pauseAfter, THEN advance (and keep showing retyped text)
        commitPhase("waitingNextSectionRetyped");
        nextDueAtRef.current = now + pauseAfter;
        rafIdRef.current = requestAnimationFrame(tick);
        return;
      }

      // fallback
      commitPhase("typingMain");
      commitUnitIdx(0);
      nextDueAtRef.current = now + speed;
      rafIdRef.current = requestAnimationFrame(tick);
    };

    rafIdRef.current = requestAnimationFrame(tick);

    return () => cancelLoop();
  }, [inView, runKey, start]);

  // rendering helper
  const renderUnits = (sec, unitsArr, wordsArr, visibleCount, breakAfter) => {
    const { mode, highlights } = sec;
    const visibleUnits = unitsArr.slice(0, visibleCount);

    return visibleUnits.map((unit, idx) => {
      if (mode === "word") {
        const rawWord = unit;
        const colorClass = resolveHighlightClass(highlights, rawWord);
        const isBreak = breakAfter.includes(idx);

        return (
          <React.Fragment key={`${idx}-${rawWord}`}>
            <span className={colorClass}>{rawWord}</span>
            {isBreak ? <br /> : " "}
          </React.Fragment>
        );
      }

      const { char, wordIndex } = unit;
      let highlightClass = "";

      if (wordIndex !== null && wordsArr[wordIndex]) {
        highlightClass = resolveHighlightClass(highlights, wordsArr[wordIndex]);
      }

      const next = visibleUnits[idx + 1];
      const isLastCharOfWord =
        wordIndex !== null && (!next || next.wordIndex !== wordIndex);

      const isBreak = wordIndex !== null && breakAfter.includes(wordIndex);

      return (
        <React.Fragment key={`${idx}-${char}`}>
          <span className={highlightClass}>{char}</span>
          {isLastCharOfWord ? isBreak ? <br /> : " " : null}
        </React.Fragment>
      );
    });
  };

  const activeProcessed = runProcessedRef.current;

  const shouldShowCursorForSection = (i) =>
    showCursor && i === sectionIdx && sectionIdx < activeProcessed.length;

  return (
    <span
      ref={rootRef}
      className={className}
      style={{
        whiteSpace: "normal",
        display: "inline-block",
        minHeight: "1em",
      }}
    >
      {/* sentinel so inView triggers even with empty content */}
      <span
        aria-hidden="true"
        style={{ display: "inline-block", width: 1, height: "1em", opacity: 0 }}
      >
        .
      </span>

      {activeProcessed.map((sec, i) => {
        const {
          mainWords,
          mainUnits,
          retypeText,
          retypeWords,
          retypeUnits,
          skipTypingMain,
          breakAfterMain,
          breakAfterRetype,
        } = sec;

        // completed sections render fully
        if (i < sectionIdx) {
          if (retypeText && retypeUnits && retypeUnits.length) {
            return (
              <span key={i}>
                {renderUnits(
                  sec,
                  retypeUnits,
                  retypeWords || [],
                  retypeUnits.length,
                  breakAfterRetype
                )}
              </span>
            );
          }
          return (
            <span key={i}>
              {renderUnits(
                sec,
                mainUnits,
                mainWords,
                mainUnits.length,
                breakAfterMain
              )}
            </span>
          );
        }

        // future sections empty
        if (i > sectionIdx) return <span key={i} />;

        // current section partial
        let unitsToUse = mainUnits;
        let wordsToUse = mainWords;
        let visibleCount = unitIdx;
        let breaksToUse = breakAfterMain;

        if (phase === "typingMain" && skipTypingMain) {
          visibleCount = mainUnits.length;
        }

        const showRetyped =
          phase === "typingRetyped" || phase === "waitingNextSectionRetyped";

        if (showRetyped && retypeUnits) {
          unitsToUse = retypeUnits;
          wordsToUse = retypeWords || [];
          visibleCount = unitIdx;
          breaksToUse = breakAfterRetype;
        }

        const content = renderUnits(
          sec,
          unitsToUse,
          wordsToUse,
          visibleCount,
          breaksToUse
        );
        const showCursorHere = shouldShowCursorForSection(i);

        return (
          <span key={i}>
            {content}
            {showCursorHere && (
              <span
                className={
                  "inline-block opacity-80 " +
                  (phase === "erasing" ? "" : "animate-pulse")
                }
              >
                {cursorChar}
              </span>
            )}
          </span>
        );
      })}
    </span>
  );
}
