import React, { useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "framer-motion";

/**
 * sections = [
 *   {
 *     text: "Full-stack engineer & founder…",
 *     retypeText?: "Full-stack engineer & product-focused founder…",
 *     skipTypingMain?: boolean,  // if true, main text appears instantly (no typing), but erase/retype still runs
 *     mode?: "word" | "letter",
 *     speed?: number,           // typing speed (ms)
 *     eraseSpeed?: number,      // backspace speed (ms)
 *     pauseAfter?: number,      // pause after final text before next section
 *     pauseBeforeErase?: number,// pause after typing main text before erasing (or after instant show)
 *     highlights?: { [plainWord]: "tailwind classes" },
 *     breakAfter?: number[],    // word indices to insert <br /> after
 *   },
 *   ...
 * ]
 */

export function TypewriterSections({
  sections,
  defaultMode = "word",
  defaultSpeed = 40,
  defaultEraseSpeed = 30,
  defaultPauseAfter = 400,
  defaultPauseBeforeErase = 600,
  initialDelayMs = 0,
  showCursor = false, // toggle blinking cursor
  cursorChar = "| ", // cursor character
  className = "",
}) {
  const rootRef = useRef(null);
  const inView = useInView(rootRef, { once: true, amount: 0.3 });

  const [sectionIdx, setSectionIdx] = useState(0);
  const [unitIdx, setUnitIdx] = useState(0);
  const [phase, setPhase] = useState("typingMain"); // "typingMain" | "erasing" | "typingRetyped"

  // Strip punctuation only
  const baseNormalizeWord = (w) => (w || "").replace(/[.,!?;:"()]/g, "");

  // Highlight lookup: try raw, lower, upper
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

      const makeWords = (txt) => (txt.trim() ? txt.trim().split(/\s+/) : []); // no leading/trailing/empty “words”

      const mainWords = makeWords(mainText);
      const retypeWords = retypeText ? makeWords(retypeText) : null;

      const buildUnits = (txt, wordsForTxt) => {
        if (mode === "word") return wordsForTxt;

        const units = [];
        let wordIndex = 0;

        for (let i = 0; i < txt.length; i++) {
          const char = txt[i];
          if (/\s/.test(char)) {
            units.push({ char, wordIndex: null });
            wordIndex++;
          } else {
            units.push({ char, wordIndex });
          }
        }
        return units;
      };

      const mainUnits = buildUnits(mainText, mainWords);
      const retypeUnits = retypeText ? buildUnits(retypeText, retypeWords) : null;

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
        breakAfter: s.breakAfter || [],
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

  // Core typing / erasing state machine
  useEffect(() => {
    if (!inView) return;
    if (sectionIdx >= processed.length) return;

    const sec = processed[sectionIdx];
    const {
      mainUnits,
      retypeUnits,
      speed,
      eraseSpeed,
      pauseAfter,
      pauseBeforeErase,
      skipTypingMain,
    } = sec;

    let delay;
    const isFirstMain =
      sectionIdx === 0 &&
      phase === "typingMain" &&
      unitIdx === 0 &&
      initialDelayMs > 0;

    if (phase === "typingMain") {
      if (unitIdx < mainUnits.length) {
        // NEW: instant reveal if skipTypingMain
        if (skipTypingMain) {
          delay = isFirstMain ? initialDelayMs : 0;
        } else {
          delay = isFirstMain ? initialDelayMs : speed;
        }
      } else if (sec.retypeText && retypeUnits && retypeUnits.length) {
        delay = pauseBeforeErase; // finished typing main; wait then start erasing
      } else {
        delay = pauseAfter; // finished section, no retype
      }
    } else if (phase === "erasing") {
      if (unitIdx > 0) {
        delay = eraseSpeed;
      } else {
        delay = 0; // done erasing, go type retype
      }
    } else if (phase === "typingRetyped") {
      if (retypeUnits && unitIdx < retypeUnits.length) {
        delay = speed;
      } else {
        delay = pauseAfter; // finished retyped text
      }
    } else {
      return;
    }

    const timerId = setTimeout(() => {
      if (phase === "typingMain") {
        if (unitIdx < mainUnits.length) {
          // NEW: jump to fully visible main text
          if (skipTypingMain) {
            setUnitIdx(mainUnits.length);
          } else {
            setUnitIdx((n) => n + 1);
          }
        } else if (sec.retypeText && retypeUnits && retypeUnits.length) {
          setPhase("erasing");
          setUnitIdx(mainUnits.length);
        } else {
          setSectionIdx((i) => i + 1);
          setUnitIdx(0);
          setPhase("typingMain");
        }
        return;
      }

      if (phase === "erasing") {
        if (unitIdx > 0) {
          setUnitIdx((n) => n - 1);
        } else {
          if (sec.retypeText && retypeUnits && retypeUnits.length) {
            setPhase("typingRetyped");
            setUnitIdx(0);
          } else {
            setSectionIdx((i) => i + 1);
            setUnitIdx(0);
            setPhase("typingMain");
          }
        }
        return;
      }

      if (phase === "typingRetyped" && retypeUnits) {
        if (unitIdx < retypeUnits.length) {
          setUnitIdx((n) => n + 1);
        } else {
          setSectionIdx((i) => i + 1);
          setUnitIdx(0);
          setPhase("typingMain");
        }
        return;
      }
    }, delay);

    return () => clearTimeout(timerId);
  }, [inView, sectionIdx, unitIdx, phase, processed, initialDelayMs]);

  // Render with highlights + br, but DO NOT output <br/> when it's the last visible thing
  const renderUnits = (sec, unitsArr, wordsArr, visibleCount) => {
    const { mode, highlights, breakAfter } = sec;
    const visibleUnits = unitsArr.slice(0, visibleCount);

    return visibleUnits.map((unit, idx) => {
      // WORD MODE
      if (mode === "word") {
        const rawWord = unit;
        const colorClass = resolveHighlightClass(highlights, rawWord);

        const isBreak = breakAfter.includes(idx);
        const isLastVisible = idx === visibleUnits.length - 1;

        // only render the <br /> once something AFTER it is visible
        const shouldRenderBreakNow = isBreak && !isLastVisible;

        return (
          <React.Fragment key={idx}>
            <span className={colorClass}>{rawWord}</span>
            {shouldRenderBreakNow ? <br /> : !isLastVisible ? " " : ""}
          </React.Fragment>
        );
      }

      // LETTER MODE (unit = { char, wordIndex })
      const { char, wordIndex } = unit;
      let highlightClass = "";

      if (wordIndex !== null && wordsArr[wordIndex]) {
        const rawWord = wordsArr[wordIndex];
        highlightClass = resolveHighlightClass(highlights, rawWord);
      }

      const next = visibleUnits[idx + 1];
      const isLastCharOfWord =
        wordIndex !== null && (!next || next.wordIndex !== wordIndex);

      const isBreak = wordIndex !== null && breakAfter.includes(wordIndex);
      const isLastVisible = idx === visibleUnits.length - 1;

      // only render the <br /> once something AFTER it is visible
      const shouldRenderBreakNow = isBreak && !isLastVisible;

      return (
        <React.Fragment key={idx}>
          <span className={highlightClass}>{char}</span>
          {isLastCharOfWord &&
            (shouldRenderBreakNow ? <br /> : !isLastVisible ? " " : "")}
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
      // no pre-wrap: let <br /> control line breaks,
      // and we control spaces manually
      style={{ whiteSpace: "normal" }}
    >
      {processed.map((sec, i) => {
        const {
          mainWords,
          mainUnits,
          retypeText,
          retypeWords,
          retypeUnits,
          skipTypingMain,
        } = sec;

        // Sections BEFORE current → fully rendered final state (with highlights)
        if (i < sectionIdx) {
          if (retypeText && retypeUnits && retypeUnits.length) {
            return (
              <span key={i}>
                {renderUnits(sec, retypeUnits, retypeWords || [], retypeUnits.length)}
              </span>
            );
          }
          return (
            <span key={i}>
              {renderUnits(sec, mainUnits, mainWords, mainUnits.length)}
            </span>
          );
        }

        // Sections AFTER current → nothing yet
        if (i > sectionIdx) {
          return <span key={i} />;
        }

        // CURRENT SECTION
        let unitsToUse = mainUnits;
        let wordsToUse = mainWords;
        let visibleCount = unitIdx;

        // NEW: if skipping typing main, render it fully during typingMain
        if (phase === "typingMain" && skipTypingMain) {
          visibleCount = mainUnits.length;
        }

        if (phase === "typingRetyped" && retypeUnits) {
          unitsToUse = retypeUnits;
          wordsToUse = retypeWords || [];
          visibleCount = unitIdx;
        }

        const content = renderUnits(sec, unitsToUse, wordsToUse, visibleCount);
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
