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
  className = "",
}) {
  const rootRef = useRef(null);
  const inView = useInView(rootRef, { once: true, amount: 0.3 });

  // render state
  const [sectionIdx, setSectionIdx] = useState(0);
  const [unitIdx, setUnitIdx] = useState(0);
  const [phase, setPhase] = useState("typingMain"); // "typingMain" | "erasing" | "typingRetyped"

  // internal refs (avoid stale closures + keep rAF loop stable)
  const sectionIdxRef = useRef(0);
  const unitIdxRef = useRef(0);
  const phaseRef = useRef("typingMain");

  // rAF timing refs
  const rafIdRef = useRef(null);
  const nextDueAtRef = useRef(0);
  const startedRef = useRef(false);

  // limit catch-up steps per frame (prevents jumpy fast-forward after tab throttling)
  const MAX_STEPS_PER_FRAME = 120;

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

      // ✅ robust letter-mode mapping: does NOT overcount wordIndex on multiple spaces
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
      const retypeUnits = retypeText ? buildUnits(retypeText, retypeWords) : null;

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

  // keep refs synced with state
  useEffect(() => {
    sectionIdxRef.current = sectionIdx;
  }, [sectionIdx]);

  useEffect(() => {
    unitIdxRef.current = unitIdx;
  }, [unitIdx]);

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  // helpers to update BOTH refs + state (single source of truth)
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
  };

  // time-based rAF loop (consistent speed)
  useEffect(() => {
    if (!inView) return;
    if (!processed.length) return;

    // start fresh if needed
    if (!startedRef.current) {
      startedRef.current = true;

      // ensure state & refs aligned on first start
      sectionIdxRef.current = sectionIdxRef.current || 0;
      unitIdxRef.current = unitIdxRef.current || 0;
      phaseRef.current = phaseRef.current || "typingMain";

      const now = performance.now();
      nextDueAtRef.current = now + (initialDelayMs > 0 ? initialDelayMs : 0);
    }

    const tick = (now) => {
      const sIdx = sectionIdxRef.current;
      if (sIdx >= processed.length) {
        cancelLoop();
        return;
      }

      const sec = processed[sIdx];
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

      let steps = 0;

      // advance while "due", but clamp per frame for smoothness
      while (now >= nextDueAtRef.current && steps < MAX_STEPS_PER_FRAME) {
        steps += 1;

        const p = phaseRef.current;
        const u = unitIdxRef.current;

        if (p === "typingMain") {
          // skipTypingMain: show full main text, but still honor initial delay + subsequent pauses/erase
          if (skipTypingMain) {
            if (u !== mainUnits.length) {
              commitUnitIdx(mainUnits.length);
            } else {
              // already fully shown; go to pause
              nextDueAtRef.current = now + (hasRetype ? pauseBeforeErase : pauseAfter);

              if (hasRetype) {
                commitPhase("erasing");
                // ensure erase starts from full length
                if (unitIdxRef.current !== mainUnits.length) commitUnitIdx(mainUnits.length);
              } else {
                commitSectionIdx(sIdx + 1);
                commitUnitIdx(0);
                commitPhase("typingMain");
              }
            }
            continue;
          }

          // normal typing
          if (u < mainUnits.length) {
            commitUnitIdx(u + 1);
            nextDueAtRef.current = now + speed;
            continue;
          }

          // end of main text
          nextDueAtRef.current = now + (hasRetype ? pauseBeforeErase : pauseAfter);

          if (hasRetype) {
            commitPhase("erasing");
            commitUnitIdx(mainUnits.length);
          } else {
            commitSectionIdx(sIdx + 1);
            commitUnitIdx(0);
            commitPhase("typingMain");
          }
          continue;
        }

        if (p === "erasing") {
          if (u > 0) {
            commitUnitIdx(u - 1);
            nextDueAtRef.current = now + eraseSpeed;
            continue;
          }

          // finished erasing
          if (hasRetype) {
            commitPhase("typingRetyped");
            commitUnitIdx(0);
            nextDueAtRef.current = now + speed;
          } else {
            commitSectionIdx(sIdx + 1);
            commitUnitIdx(0);
            commitPhase("typingMain");
            nextDueAtRef.current = now + speed;
          }
          continue;
        }

        if (p === "typingRetyped") {
          if (!retypeUnits) {
            // safety fallback
            commitSectionIdx(sIdx + 1);
            commitUnitIdx(0);
            commitPhase("typingMain");
            nextDueAtRef.current = now + speed;
            continue;
          }

          if (u < retypeUnits.length) {
            commitUnitIdx(u + 1);
            nextDueAtRef.current = now + speed;
            continue;
          }

          // end of retype
          nextDueAtRef.current = now + pauseAfter;
          commitSectionIdx(sIdx + 1);
          commitUnitIdx(0);
          commitPhase("typingMain");
          continue;
        }

        // unknown phase: bail safely
        commitPhase("typingMain");
        commitUnitIdx(0);
        nextDueAtRef.current = now + speed;
      }

      rafIdRef.current = requestAnimationFrame(tick);
    };

    rafIdRef.current = requestAnimationFrame(tick);

    return () => cancelLoop();
    // NOTE: processed is stable via useMemo; if sections change, loop restarts.
  }, [inView, processed, initialDelayMs]);

  // ✅ stable rendering so earlier content doesn't “rewrite”
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
          {isLastCharOfWord ? (isBreak ? <br /> : " ") : null}
        </React.Fragment>
      );
    });
  };

  const shouldShowCursorForSection = (i) =>
    showCursor && i === sectionIdx && sectionIdx < processed.length;

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

      {processed.map((sec, i) => {
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
              {renderUnits(sec, mainUnits, mainWords, mainUnits.length, breakAfterMain)}
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

        if (phase === "typingRetyped" && retypeUnits) {
          unitsToUse = retypeUnits;
          wordsToUse = retypeWords || [];
          visibleCount = unitIdx;
          breaksToUse = breakAfterRetype;
        }

        const content = renderUnits(sec, unitsToUse, wordsToUse, visibleCount, breaksToUse);
        const showCursorHere = shouldShowCursorForSection(i);

        return (
          <span key={i}>
            {content}
            {showCursorHere && (
              <span
                className={
                  "inline-block opacity-80 " + (phase === "erasing" ? "" : "animate-pulse")
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
