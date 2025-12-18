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
  const [phase, setPhase] = useState("typingMain");

  const rafRef = useRef(null);
  const nextAtRef = useRef(null);

  /* ---------------- helpers ---------------- */

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

  /* ---------------- preprocessing ---------------- */

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

  /* ---------------- timing loop (stable across prod/dev) ---------------- */

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

    const computeDelay = () => {
      const isFirstMain =
        sectionIdx === 0 &&
        phase === "typingMain" &&
        unitIdx === 0 &&
        initialDelayMs > 0;

      if (phase === "typingMain") {
        if (unitIdx < mainUnits.length) {
          if (skipTypingMain) return isFirstMain ? initialDelayMs : 0;
          return isFirstMain ? initialDelayMs : speed;
        }
        if (sec.retypeText && retypeUnits?.length) return pauseBeforeErase;
        return pauseAfter;
      }

      if (phase === "erasing") {
        return unitIdx > 0 ? eraseSpeed : 0;
      }

      if (phase === "typingRetyped") {
        if (retypeUnits && unitIdx < retypeUnits.length) return speed;
        return pauseAfter;
      }

      return null;
    };

    const tick = () => {
      const now = performance.now();

      if (nextAtRef.current == null) {
        const d = computeDelay();
        if (d != null) nextAtRef.current = now + d;
      }

      if (now >= nextAtRef.current) {
        if (phase === "typingMain") {
          if (unitIdx < mainUnits.length) {
            if (skipTypingMain) setUnitIdx(mainUnits.length);
            else setUnitIdx((n) => n + 1);
          } else if (sec.retypeText && retypeUnits?.length) {
            setPhase("erasing");
            setUnitIdx(mainUnits.length);
          } else {
            setSectionIdx((i) => i + 1);
            setUnitIdx(0);
            setPhase("typingMain");
          }
        } else if (phase === "erasing") {
          if (unitIdx > 0) setUnitIdx((n) => n - 1);
          else if (sec.retypeText && retypeUnits?.length) {
            setPhase("typingRetyped");
            setUnitIdx(0);
          } else {
            setSectionIdx((i) => i + 1);
            setUnitIdx(0);
            setPhase("typingMain");
          }
        } else if (phase === "typingRetyped" && retypeUnits) {
          if (unitIdx < retypeUnits.length) setUnitIdx((n) => n + 1);
          else {
            setSectionIdx((i) => i + 1);
            setUnitIdx(0);
            setPhase("typingMain");
          }
        }

        const d = computeDelay();
        nextAtRef.current = now + (d ?? 0);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      nextAtRef.current = null;
    };
  }, [inView, sectionIdx, unitIdx, phase, processed, initialDelayMs]);

  /* ---------------- rendering ---------------- */

  const renderUnits = (sec, unitsArr, wordsArr, visibleCount, breakAfter) => {
    const { mode, highlights } = sec;
    const visibleUnits = unitsArr.slice(0, visibleCount);

    return visibleUnits.map((unit, idx) => {
      if (mode === "word") {
        const rawWord = unit;
        const colorClass = resolveHighlightClass(highlights, rawWord);
        const isBreak = breakAfter.includes(idx);
        const isLast = idx === visibleUnits.length - 1;

        return (
          <React.Fragment key={idx}>
            <span className={colorClass}>{rawWord}</span>
            {isBreak && !isLast ? <br /> : !isLast ? " " : ""}
          </React.Fragment>
        );
      }

      const { char, wordIndex } = unit;
      let highlightClass = "";

      if (wordIndex != null && wordsArr[wordIndex]) {
        highlightClass = resolveHighlightClass(
          highlights,
          wordsArr[wordIndex]
        );
      }

      const next = visibleUnits[idx + 1];
      const isLastCharOfWord =
        wordIndex != null && (!next || next.wordIndex !== wordIndex);

      const isBreak = wordIndex != null && breakAfter.includes(wordIndex);
      const isLast = idx === visibleUnits.length - 1;

      return (
        <React.Fragment key={idx}>
          <span className={highlightClass}>{char}</span>
          {isLastCharOfWord &&
            (isBreak && !isLast ? <br /> : !isLast ? " " : "")}
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
          return (
            <span key={i}>
              {retypeText && retypeUnits?.length
                ? renderUnits(
                    sec,
                    retypeUnits,
                    retypeWords || [],
                    retypeUnits.length,
                    breakAfterRetype
                  )
                : renderUnits(
                    sec,
                    mainUnits,
                    mainWords,
                    mainUnits.length,
                    breakAfterMain
                  )}
            </span>
          );
        }

        if (i > sectionIdx) return <span key={i} />;

        let units = mainUnits;
        let words = mainWords;
        let visible = unitIdx;
        let breaks = breakAfterMain;

        if (phase === "typingMain" && skipTypingMain) {
          visible = mainUnits.length;
        }

        if (phase === "typingRetyped" && retypeUnits) {
          units = retypeUnits;
          words = retypeWords || [];
          visible = unitIdx;
          breaks = breakAfterRetype;
        }

        return (
          <span key={i}>
            {renderUnits(sec, units, words, visible, breaks)}
            {shouldShowCursorForSection(i) && (
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
