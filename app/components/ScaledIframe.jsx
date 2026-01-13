import { useEffect, useRef, useState } from "react";

export function ScaledIframe({
  src,
  designWidth = 1440,
  designHeight = 900,
  delayLoad = false,
}) {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [shouldLoad, setShouldLoad] = useState(!delayLoad);

  useEffect(() => {
    const resize = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.offsetWidth;
      setScale(containerWidth / designWidth);
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [designWidth]);

  useEffect(() => {
    if (delayLoad) {
      // Delay loading by 2 seconds to let slideshow initialize first
      const timer = setTimeout(() => setShouldLoad(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [delayLoad]);

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden"
      style={{ height: designHeight * scale }}
    >
      {shouldLoad ? (
        <iframe
          src={src}
          width={designWidth}
          height={designHeight}
          className="origin-top-left"
          style={{
            transform: `scale(${scale})`,
            border: "0",
          }}
        />
      ) : (
        <div
          className="w-full bg-slate-100 flex items-center justify-center text-slate-500"
          style={{ height: designHeight * scale }}
        >
          <div className="text-center">
            <div className="animate-pulse">Loading preview...</div>
          </div>
        </div>
      )}
    </div>
  );
}
