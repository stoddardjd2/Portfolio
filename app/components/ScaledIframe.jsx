import { useEffect, useRef, useState } from "react";

export function ScaledIframe({
  src,
  designWidth = 1440,
  designHeight = 900,
}) {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);

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

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden"
      style={{ height: designHeight * scale }}
    >
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
    </div>
  );
}
