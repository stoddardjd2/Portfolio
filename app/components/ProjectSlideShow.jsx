import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";
import { ScaledIframe } from "./ScaledIframe.jsx";

// Fullscreen iframe portal component
function IframeFullscreenPortal({ src, onClose }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black z-[99999] flex items-center justify-center"
      onClick={onClose}
    >
      {/* Fullscreen iframe container */}
      <div
        className="w-full h-full max-w-full max-h-full flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar keeps close button outside iframe layer (mobile safe) */}
        <div
          className="w-full bg-slate-800 border-b border-slate-600 p-2 shrink-0"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="flex gap-1">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  reloadIframe(src);
                }}
                className="w-6 h-6 bg-slate-700 hover:bg-slate-600 rounded flex items-center justify-center text-slate-300 cursor-pointer hover:text-slate-100 transition-colors"
                aria-label="Refresh iframe"
              >
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </button>
         
            </div>
            <div className="flex-1 bg-slate-700 rounded px-3 truncate py-1 text-xs text-slate-300 font-mono">
              {(() => {
                try {
                  return src ? new URL(src).hostname : "localhost";
                } catch (e) {
                  console.log("URL parse error:", src, e);
                  return "localhost";
                }
              })()}
            </div>
            <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="w-6 h-6 bg-slate-700 hover:bg-slate-600 rounded flex items-center justify-center text-slate-300 cursor-pointer hover:text-slate-100 transition-colors"
                aria-label="Close fullscreen"
              >
                ×
              </button>
          </div>
        </div>

        <div className="flex-1 w-full" onClick={(e) => e.stopPropagation()}>
          <iframe
            src={src}
            className="w-full h-full border-0"
            style={{ background: "white" }}
            title="Fullscreen iframe"
          />
        </div>
      </div>
    </motion.div>,
    document.body
  );
}

function useInView(ref, { threshold = 0.35, rootMargin = "0px" } = {}) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => setInView(entries[0]?.isIntersecting ?? false),
      { threshold, rootMargin }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, threshold, rootMargin]);

  return inView;
}

// small helper to lock body scroll when modal is open
// lock BOTH html + body (prevents scroll in all layouts)
function useLockHtmlScroll(locked) {
  useEffect(() => {
    if (!locked) return;

    const html = document.documentElement;
    const body = document.body;

    const scrollY = window.scrollY;

    // Store previous styles
    const prevHtmlPosition = html.style.position;
    const prevHtmlTop = html.style.top;
    const prevHtmlWidth = html.style.width;

    // Freeze scroll WITHOUT hiding scrollbar
    html.style.position = "fixed";
    html.style.top = `-${scrollY}px`;
    html.style.width = "100%";

    return () => {
      // Restore styles
      html.style.position = prevHtmlPosition;
      html.style.top = prevHtmlTop;
      html.style.width = prevHtmlWidth;

      window.scrollTo(0, scrollY);
    };
  }, [locked]);
}

// Helper to reload iframe content
function reloadIframe(src) {
  const iframes = document.querySelectorAll(`iframe[src="${src}"]`);
  iframes.forEach((iframe) => {
    try {
      // Add cache-busting parameter to force reload
      const separator = iframe.src.includes("?") ? "&" : "?";
      iframe.src = iframe.src + separator + "_t=" + Date.now();
    } catch (e) {
      console.log("Reload failed:", e);
    }
  });
}

// Helper to create iframe fullscreen portal
function createIframeFullscreen(src, onClose) {
  return <IframeFullscreenPortal src={src} onClose={onClose} />;
}
// Reusable inner slideshow renderer (so modal = exact same UI/logic)
function SlideshowInner({
  list,
  title,
  aspectRatio,
  maxHeightPx,
  autoplay,
  intervalMs,
  pauseOnHover,
  loop,
  autoplayOnlyWhenInView,
  inViewThreshold,
  inViewRootMargin,
  showArrows,
  showDots,
  showCounter,
  setIframeFullscreen,
  showPlayPause,
  enableKeyboard,
  enableSwipe,
  slideFocus,
  className,
  imgClassName,
  onIndexChange,
  // NEW:
  enableClickToOpen,
  onOpenModal,
  initialIndex,
  isModal = false,
  onRequestClose,
  // isMobile = false,
}) {
  const [isMobile, setIsMobile] = useState(false);
  const breakpointPx = 454;
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpointPx);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpointPx]);

  const count = list.length;
  const canSlide = count > 1;

  const safeInit = Math.min(Math.max(0, initialIndex), Math.max(0, count - 1));
  const [idx, setIdx] = useState(safeInit);
  const [hover, setHover] = useState(false);
  const [playing, setPlaying] = useState(autoplay);
  const [iframeOverlayVisible, setIframeOverlayVisible] = useState(true);

  // Assign h and w to the current screen width and height, update on resize, with useState.

  // in-view gating (disabled in modal)
  const rootRef = useRef(null);
  const [scrollOnSlideChange, setScrollOnSlideChange] = useState(false);
  const [iframeHeightPx, setIframeHeightPx] = useState(null);
  const inView = useInView(rootRef, {
    threshold: inViewThreshold,
    rootMargin: inViewRootMargin,
  });

  useEffect(() => {
    if (!canSlide) return;

    const preload = (src) => {
      if (!src) return;
      const img = new Image();
      img.decoding = "async";
      img.src = src;
    };

    preload(list[(idx + 1) % count]);
    preload(list[(idx - 1 + count) % count]);
  }, [idx, list, count, canSlide]);

  // keep idx stable if list changes
  useEffect(() => {
    if (idx >= count) setIdx(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  // update local playing if parent changes autoplay
  useEffect(() => setPlaying(autoplay), [autoplay]);

  // NEW: if initialIndex changes (e.g. opening modal on clicked image), jump
  useEffect(() => {
    setIdx(safeInit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [safeInit, count]);

  const clampPct = (n, fallback) => {
    const v = Number(n);
    if (!Number.isFinite(v)) return fallback;
    return Math.min(100, Math.max(0, v));
  };

  const getSlideFocus = (i) => {
    const src = list[i];
    const base =
      typeof slideFocus === "function"
        ? slideFocus(i, src)
        : Array.isArray(slideFocus)
        ? slideFocus[i]
        : null;

    const xPct = clampPct(base?.xPct, 50);
    const yPct = clampPct(base?.yPct, 50);
    return { xPct, yPct };
  };

  const goTo = (next) => {
    if (!canSlide) return;

    setIdx((current) => {
      let n = typeof next === "function" ? next(current) : next;

      if (loop) n = (n + count) % count;
      else n = Math.min(Math.max(0, n), count - 1);

      onIndexChange?.(n);
      return n;
    });
  };

  const prev = () => goTo((i) => i - 1);
  const next = () => goTo((i) => i + 1);

  // autoplay
  useEffect(() => {
    if (!canSlide) return;
    if (!playing) return;
    if (pauseOnHover && hover) return;
    if (!isModal && autoplayOnlyWhenInView && !inView) return;

    const id = setInterval(() => goTo((i) => i + 1), intervalMs);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    canSlide,
    playing,
    pauseOnHover,
    hover,
    intervalMs,
    count,
    loop,
    autoplayOnlyWhenInView,
    inView,
    isModal,
  ]);

  // keyboard
  useEffect(() => {
    if (!enableKeyboard || !canSlide) return;

    const onKeyDown = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (isModal && e.key === "Escape") onRequestClose?.();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enableKeyboard, canSlide, count, isModal, onRequestClose]);

  const dragProps = enableSwipe
    ? {
        drag: "x",
        dragConstraints: { left: 0, right: 0 },
        dragElastic: 0.18,
        onDragEnd: (_, info) => {
          const offset = info.offset.x;
          const velocity = info.velocity.x;
          const swipe = Math.abs(offset) * velocity;

          if (offset > 60 || swipe > 12000) prev();
          else if (offset < -60 || swipe < -12000) next();
        },
      }
    : {};

  const containerStyle = {
    aspectRatio,
    ...(maxHeightPx ? { maxHeight: `${maxHeightPx}px` } : null),
  };

  const { xPct, yPct } = getSlideFocus(idx);
  const objectPosition = `${xPct}% ${yPct}%`;

  // Check if current slide is an iframe
  const currentItem = list[idx];
  const isCurrentSlideIframe =
    currentItem &&
    typeof currentItem === "object" &&
    currentItem.type === "iframe";

  const scrollToSlideshow = () => {
    if (!rootRef.current) return;
    rootRef.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest",
    });
  };

  useEffect(() => {
    if (!scrollOnSlideChange) return;

    // Wait for render + layout before centering
    const raf1 = requestAnimationFrame(() => {
      const raf2 = requestAnimationFrame(() => {
        scrollToSlideshow();
        setScrollOnSlideChange(false);
      });
      return () => cancelAnimationFrame(raf2);
    });

    // Fallback in case layout settles late (iframe/image)
    const timeoutId = setTimeout(() => {
      scrollToSlideshow();
      setScrollOnSlideChange(false);
    }, 120);

    return () => {
      cancelAnimationFrame(raf1);
      clearTimeout(timeoutId);
    };
  }, [idx, scrollOnSlideChange]);

  // Ensure overlay shows when an iframe slide becomes active
  useEffect(() => {
    if (isCurrentSlideIframe) {
      setIframeOverlayVisible(true);
    }
  }, [isCurrentSlideIframe, idx]);

  useEffect(() => {
    if (!isCurrentSlideIframe) return;
    if (!rootRef.current) return;

    const update = () => {
      if (!rootRef.current) return;
      const containerWidth = rootRef.current.offsetWidth;
      const designWidth = isMobile ? 375 : 1400;
      const designHeight = isMobile ? 800 : 815;
      const scale = containerWidth / designWidth;
      setIframeHeightPx(designHeight * scale);
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [isCurrentSlideIframe, isMobile, currentItem?.src]);

  // Calculate container style for mobile iframe slides
  const getContainerStyle = () => {
    if (isMobile && isCurrentSlideIframe) {
      // Mobile phone dimensions: 375x667 (iPhone) + padding
      return {
        ...containerStyle,
        height: iframeHeightPx ? `${iframeHeightPx}px` : "590px",
        margin: "0 auto", // Center on page
        paddingTop: "12px",
      };
    }
    if (isCurrentSlideIframe) {
      // Add top padding for the badge
      return {
        ...containerStyle,
        height: iframeHeightPx ? `${iframeHeightPx}px` : undefined,
        paddingTop: "12px",
      };
    }
    return containerStyle;
  };

  return (
    <div
      ref={rootRef}
      className={`relative w-full ${
        isMobile && isCurrentSlideIframe ? "flex  justify-center" : ""
      } ${isCurrentSlideIframe ? "overflow-visible" : "overflow-visible"} ${className}`}
      style={getContainerStyle()}
      onMouseEnter={() => {
        setHover(true);
        if (isCurrentSlideIframe) {
          setIframeOverlayVisible(false);
        }
      }}
      onMouseLeave={() => {
        setHover(false);
        if (isCurrentSlideIframe) {
          setIframeOverlayVisible(true);
        }
      }}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {(() => {
          const currentItem = list[idx];
          const isIframe =
            currentItem &&
            typeof currentItem === "object" &&
            currentItem.type === "iframe";

          if (isIframe) {
            return (
              <motion.div
                key={currentItem.src || idx}
                className={
                  "absolute inset-0 flex h-full items-center justify-center  select-none " +
                  (enableClickToOpen ? "cursor-pointer " : "")
                }
                initial={{ opacity: 0, scale: 1.002 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.002 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => {
                  if (!enableClickToOpen) return;
                  onOpenModal?.(idx);
                }}
                {...dragProps}
              >
                {/* Full overlay with centered badge */}
                <motion.div
                  className="flex absolute inset-0 z-10 items-center justify-center bg-black/40 backdrop-blur-[2px]"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: iframeOverlayVisible ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  style={{ pointerEvents: iframeOverlayVisible ? "auto" : "none" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIframeFullscreen(currentItem.src);
                  }}
                >
                  <div className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/95 backdrop-blur-sm border border-slate-200/50 shadow-lg">
                    <svg
                      className="w-4 h-4 text-slate-700"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                      />
                    </svg>
                    <span className="text-sm font-medium text-slate-700">
                      Interactive Demo
                    </span>
                  </div>
                </motion.div>
                {/* Browser-like container - full width */}
                <div className="relative w-full flex flex-col h-full">
                  {/* Browser chrome */}
                  <div className="w-full bg-slate-800 rounded-t-lg border border-slate-600 p-2 shrink-0">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      </div>
                      {/* Control buttons */}
                      <div className="flex gap-1">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            reloadIframe(currentItem.src);
                          }}
                          className="w-6 h-6 bg-slate-700 hover:bg-slate-600 rounded flex items-center justify-center text-slate-400 cursor-pointer hover:text-slate-300 transition-colors"
                          aria-label="Refresh iframe"
                        >
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                            />
                          </svg>
                        </button>
                   
                      </div>
                      <div className="flex-1 bg-slate-700 rounded px-3 truncate py-1 text-xs text-slate-300 font-mono">
                        {(() => {
                          try {
                            return currentItem.src
                              ? new URL(currentItem.src).hostname
                              : "localhost";
                          } catch (e) {
                            console.log("URL parse error:", currentItem.src, e);
                            return "localhost";
                          }
                        })()}
                      </div>
                      <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setIframeFullscreen(currentItem.src);
                          }}
                          className="w-6 h-6 cursor-pointer bg-slate-700 hover:bg-slate-600 rounded flex items-center justify-center text-slate-400 hover:text-slate-300 transition-colors"
                          aria-label="Toggle fullscreen"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                            />
                          </svg>
                        </button>
                    </div>
                  </div>
                  {/* Iframe scaled to container width with proportional height */}
                  <div className="relative w-full bg-white rounded-b-lg border border-slate-600 overflow-hidden shadow-2xl">
                    <ScaledIframe
                      src={currentItem.src}
                      designWidth={isMobile ? 375 : 1400}
                      designHeight={isMobile ? 900 : 815}
                      delayLoad={currentItem.delayLoad}
                    />
                  </div>
                </div>
              </motion.div>
            );
          }

          return (
            <motion.img
              key={currentItem || idx}
              src={currentItem}
              alt={`${title} preview ${idx + 1}`}
              loading="eager"
              className={
                "absolute inset-0 h-full w-full object-cover select-none " +
                (enableClickToOpen ? "cursor-pointer " : "") +
                imgClassName
              }
              style={{ objectPosition }}
              initial={{ opacity: 0, scale: 1.002 }}
              animate={{ opacity: 1, scale: 1, objectPosition }}
              exit={{ opacity: 0, scale: 1.002 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => {
                if (!enableClickToOpen) return;
                onOpenModal?.(idx);
              }}
              {...dragProps}
            />
          );
        })()}
      </AnimatePresence>

      {(showCounter || showPlayPause) && canSlide && (
        <div className="absolute left-3 right-3 top-3 flex items-center justify-between pointer-events-none">
          {showCounter ? (
            <div className="rounded-full border border-white/10 bg-black/25 px-2.5 py-1 text-[11px] text-white/90 backdrop-blur-md">
              {idx + 1} / {count}
            </div>
          ) : (
            <span />
          )}

          {showPlayPause && (
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              className="pointer-events-auto rounded-full border border-white/10 bg-black/25 px-2.5 py-1 text-[11px] text-white/90 backdrop-blur-md hover:bg-black/35 transition"
              aria-label={playing ? "Pause slideshow" : "Play slideshow"}
            >
              {playing ? "Pause" : "Play"}
            </button>
          )}
        </div>
      )}

      {canSlide && showArrows && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              console.log("Previous button clicked");
              prev();
              setScrollOnSlideChange(true);
            }}
            aria-label="Previous image"
            className="group absolute -left-3 md:left-3 top-1/2 -translate-y-1/2 z-10
              h-12 w-12 md:h-9 md:w-9 rounded-full bg-neutral-950/80
              border border-white/10 text-white/85
              shadow-lg shadow-black/20 transition-all
              hover:bg-neutral-900 hover:scale-105 active:scale-95
              touch-manipulation"
          >
            <span className="block text-lg md:text-lg leading-none transition-transform group-hover:-translate-x-0.5">
              ‹
            </span>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              console.log("Next button clicked");
              next();
              setScrollOnSlideChange(true);
            }}
            aria-label="Next image"
            className="group absolute -right-3 md:right-3 top-1/2 -translate-y-1/2 z-10
              h-12 w-12 md:h-9 md:w-9 rounded-full bg-neutral-950/80
              border border-white/10 text-white/85
              shadow-lg shadow-black/20 transition-all
              hover:bg-neutral-900 hover:scale-105 active:scale-95
              touch-manipulation"
          >
            <span className="block text-lg md:text-lg leading-none transition-transform group-hover:translate-x-0.5">
              ›
            </span>
          </button>
        </>
      )}

      {canSlide && showDots && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
          {list.map((_, dotIdx) => (
            <button
              key={dotIdx}
              type="button"
              onClick={() => goTo(dotIdx)}
              className={
                "h-1.5 w-1.5 rounded-full transition-opacity " +
                (dotIdx === idx
                  ? "bg-white opacity-90"
                  : "bg-white opacity-30 hover:opacity-60")
              }
              aria-label={`Go to image ${dotIdx + 1}`}
            />
          ))}
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]" />
    </div>
  );
}

export default function ProjectSlideshow({
  targetElementForModal = "top", //required

  images = [],
  title = "Project",
  initialIndex = 0,

  // sizing
  aspectRatio = "16 / 10",
  maxHeightPx,

  // behavior
  autoplay = true,
  intervalMs = 4000,
  pauseOnHover = true,
  loop = true,

  autoplayOnlyWhenInView = true,
  inViewThreshold = 0.35,
  inViewRootMargin = "0px",

  // UI toggles
  showArrows = true,
  showDots = true,
  showCounter = false,
  showPlayPause = false,

  // interaction
  enableKeyboard = true,
  enableSwipe = true,

  slideFocus,
  className = "",
  imgClassName = "",
  onIndexChange,
  // NEW
  openModalOnClick = false,
}) {
  const list = useMemo(() => (images?.length ? images : []), [images]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalStartIdx, setModalStartIdx] = useState(initialIndex);
  const [iframeFullscreen, setIframeFullscreen] = useState(null); // Store iframe element for fullscreen
  const [isMobile, setIsMobile] = useState(false);

  useLockHtmlScroll(modalOpen);

  // Detect mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 40);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const openModal = (startIdx) => {
    setModalStartIdx(startIdx ?? 0);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);
  const portalEl =
    typeof document !== "undefined"
      ? document.getElementById(targetElementForModal) || document.body
      : null;

  // keep modalStartIdx aligned if parent changes initialIndex
  useEffect(() => {
    if (!modalOpen) setModalStartIdx(initialIndex);
  }, [initialIndex, modalOpen]);

  if (!list.length) return null;

  return (
    <>
      {/* Inline slideshow */}
      <SlideshowInner
        list={list}
        title={title}
        initialIndex={initialIndex}
        aspectRatio={aspectRatio}
        maxHeightPx={maxHeightPx}
        autoplay={autoplay}
        intervalMs={intervalMs}
        pauseOnHover={pauseOnHover}
        loop={loop}
        autoplayOnlyWhenInView={autoplayOnlyWhenInView}
        inViewThreshold={inViewThreshold}
        inViewRootMargin={inViewRootMargin}
        showArrows={showArrows}
        showDots={showDots}
        showCounter={showCounter}
        showPlayPause={showPlayPause}
        enableKeyboard={enableKeyboard}
        enableSwipe={enableSwipe}
        slideFocus={slideFocus}
        className={className}
        imgClassName={imgClassName}
        onIndexChange={onIndexChange}
        enableClickToOpen={openModalOnClick}
        onOpenModal={openModal}
        setIframeFullscreen={setIframeFullscreen}
        isMobile={isMobile}
      />

      {/* Fullscreen modal */}
      {openModalOnClick && portalEl &&
        createPortal(
          <AnimatePresence>
            {modalOpen && (
              <motion.div
                className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onMouseDown={(e) => {
                  console.log("down", e.target, e.currentTarget);
                  if (e.target === e.currentTarget) closeModal();
                }}
                role="dialog"
                aria-modal="true"
              >
                {/* Close button */}
                <button
                  type="button"
                  onClick={closeModal}
                  aria-label="Close"
                  className="fixed right-4 top-4 z-[10000]
              h-10 w-10 rounded-full bg-neutral-950/70 border border-white/10
              text-white/90 hover:bg-neutral-900 transition
              shadow-lg shadow-black/30 grid place-items-center"
                >
                  <span className="text-2xl leading-none">×</span>
                </button>

                {/* Centered stage */}
                <div className="w-full max-w-6xl max-h-[85vh] overflow-hidden">
                  <SlideshowInner
                    list={list}
                    title={title}
                    initialIndex={modalStartIdx}
                    aspectRatio={aspectRatio}
                    maxHeightPx={undefined}
                    autoplay={autoplay}
                    intervalMs={intervalMs}
                    pauseOnHover={pauseOnHover}
                    loop={loop}
                    autoplayOnlyWhenInView={false}
                    inViewThreshold={inViewThreshold}
                    inViewRootMargin={inViewRootMargin}
                    showArrows={showArrows}
                    showDots={showDots}
                    showCounter={showCounter}
                    showPlayPause={showPlayPause}
                    enableKeyboard={enableKeyboard}
                    enableSwipe={enableSwipe}
                    slideFocus={slideFocus}
                    className="w-full"
                    imgClassName={imgClassName}
                    onIndexChange={onIndexChange}
                    enableClickToOpen={false}
                    isModal
                    onRequestClose={closeModal}
                    setIframeFullscreen={setIframeFullscreen}
                    isMobile={isMobile}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          portalEl
        )}

      {/* Iframe Fullscreen Portal */}
      <AnimatePresence>
        {iframeFullscreen &&
          createIframeFullscreen(iframeFullscreen, () =>
            setIframeFullscreen(null)
          )}
      </AnimatePresence>
    </>
  );
}
