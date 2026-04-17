import React, { useEffect, useMemo, useState } from "react";

export default function TypewriterText({
  text,
  mode = "word",        // "word" | "letter"
  speed = 40,           // ms between steps
  initialDelay = 0,     // ms before starting
  start = true,         // can be controlled by parent
  className = "",
  highlights = {},      // { founder: "text-emerald-400", "AI-powered": "text-sky-400" }
  breakAfter = [],      // [wordIndex] -> insert <br /> after these word indexes (0-based)
}) {
  // Normalize simple entities
  const normalized = useMemo(
    () =>
      text
        .replace(/&amp;/g, "&")
        .replace(/&nbsp;/g, " "),
    [text]
  );

  // Always have a word list for word-level logic
  const words = useMemo(
    () => normalized.split(" "),
    [normalized]
  );

  // Units depend on mode:
  // - word mode: ["Full-stack", "engineer", ...]
  // - letter mode: [{ char: "F", wordIndex: 0 }, ...]
  const units = useMemo(() => {
    if (mode === "word") {
      return words;
    }

    // letter mode → build char metadata with wordIndex
    const chars = [];
    let currentWordIndex = 0;

    for (let i = 0; i < normalized.length; i++) {
      const char = normalized[i];

      if (char === " ") {
        // space character: no word index, then move to next word
        chars.push({ char, wordIndex: null });
        currentWordIndex += 1;
      } else {
        chars.push({ char, wordIndex: currentWordIndex });
      }
    }

    return chars;
  }, [mode, normalized, words]);

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start || !units.length) {
      return;
    }

    let intervalId;
    const startTimeout = setTimeout(() => {
      intervalId = setInterval(() => {
        setCount((prev) => {
          if (prev >= units.length) {
            clearInterval(intervalId);
            return prev;
          }
          return prev + 1;
        });
      }, speed);
    }, initialDelay);

    return () => {
      clearTimeout(startTimeout);
      if (intervalId) clearInterval(intervalId);
    };
  }, [start, speed, initialDelay, units.length]);

  const visible = units.slice(0, count);

  return (
    <span className={className} style={{ whiteSpace: "pre-wrap" }}>
      {visible.map((unit, i) => {
        // LETTER MODE: unit = { char, wordIndex }
        if (mode === "letter") {
          const { char, wordIndex } = unit;

          // Figure out if this char belongs to a highlighted word
          let highlightClass = "";
          if (wordIndex !== null && wordIndex < words.length) {
            const rawWord = words[wordIndex] || "";
            const plainWord = rawWord.replace(/[.,!?;:"()]/g, "");
            highlightClass = highlights[plainWord] || "";
          }

          // Determine if this is the last character of its word (for breakAfter)
          const next = visible[i + 1];
          const isLastCharOfWord =
            wordIndex !== null &&
            (i === visible.length - 1 ||
              !next ||
              next.wordIndex !== wordIndex);

          return (
            <React.Fragment key={i}>
              <span className={highlightClass}>{char}</span>
              {isLastCharOfWord && breakAfter.includes(wordIndex) && (
                <br className="hidden md:block" />
              )}
            </React.Fragment>
          );
        }

        // WORD MODE
        const rawWord = unit;
        const plainWord = rawWord.replace(/[.,!?;:"()]/g, "");
        const highlightClass = highlights[plainWord] || "";

        return (
          <React.Fragment key={i}>
            <span className={highlightClass}>{rawWord}</span>{" "}
            {breakAfter.includes(i) && (
              <br className="hidden md:block" />
            )}
          </React.Fragment>
        );
      })}
    </span>
  );
}
