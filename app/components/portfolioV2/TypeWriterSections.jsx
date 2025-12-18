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

  const [sectionIdx, setSectionIdx] = useState(0);
  const [unitIdx, setUnitIdx] = useState(0);
  const [phase, setPhase] = useState("typingMain"); // "typingMain" | "erasing" | "typingRetyped"

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

      // ✅ NEW: allow per-text/per-retype breaks, with legacy fallback
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
        if (skipTypingMain) {
          delay = isFirstMain ? initialDelayMs : 0;
        } else {
          delay = isFirstMain ? initialDelayMs : speed;
        }
      } else if (sec.retypeText && retypeUnits && retypeUnits.length) {
        delay = pauseBeforeErase;
      } else {
        delay = pauseAfter;
      }
    } else if (phase === "erasing") {
      if (unitIdx > 0) delay = eraseSpeed;
      else delay = 0;
    } else if (phase === "typingRetyped") {
      if (retypeUnits && unitIdx < retypeUnits.length) delay = speed;
      else delay = pauseAfter;
    } else {
      return;
    }

    const timerId = setTimeout(() => {
      if (phase === "typingMain") {
        if (unitIdx < mainUnits.length) {
          if (skipTypingMain) setUnitIdx(mainUnits.length);
          else setUnitIdx((n) => n + 1);
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
        if (unitIdx < retypeUnits.length) setUnitIdx((n) => n + 1);
        else {
          setSectionIdx((i) => i + 1);
          setUnitIdx(0);
          setPhase("typingMain");
        }
      }
    }, delay);

    return () => clearTimeout(timerId);
  }, [inView, sectionIdx, unitIdx, phase, processed, initialDelayMs]);

  // ✅ UPDATED: pass breakAfter explicitly per render (main vs retype)
  const renderUnits = (sec, unitsArr, wordsArr, visibleCount, breakAfter) => {
    const { mode, highlights } = sec;
    const visibleUnits = unitsArr.slice(0, visibleCount);

    return visibleUnits.map((unit, idx) => {
      if (mode === "word") {
        const rawWord = unit;
        const colorClass = resolveHighlightClass(highlights, rawWord);

        const isBreak = breakAfter.includes(idx);
        const isLastVisible = idx === visibleUnits.length - 1;
        const shouldRenderBreakNow = isBreak && !isLastVisible;

        return (
          <React.Fragment key={idx}>
            <span className={colorClass}>{rawWord}</span>
            {shouldRenderBreakNow ? <br /> : !isLastVisible ? " " : ""}
          </React.Fragment>
        );
      }

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
    <span ref={rootRef} className={className} style={{ whiteSpace: "normal" }}>
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

        if (i > sectionIdx) return <span key={i} />;

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
