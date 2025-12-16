import { useMemo, useState, useEffect } from "react";
import ProjectSlideshow from "../ProjectSlideShow";
export default function ProjectCard({
  title,
  icon,
  description,
  features = [],
  badges = [],
  imageUrl,
  images,
  showAllImages = true,
  enableSlideshow = false,
  slideshowIntervalMs,
  slideshowAutoplay = true,
  slideshowPauseOnHover = true,
  imagesPerRow = 2,

  integrations = [],
  integrationText = "Integrates with",
  // [{ name: "TikTok", logo?: string, href?: string }]

  // NEW: slideshow buttons prop
  showSlideshowButtons = true, // show prev/next arrows when slideshow is enabled
  showDots,
  showArrows,
  slideFocus,
  tag, // { text, className? }
  actions = [], // [{ href, label, icon?, target?, rel?, className? }]

  layout = "stack",
  className = "",
}) {
  const imageList = useMemo(
    () => (images?.length ? images : imageUrl ? [imageUrl] : []),
    [images, imageUrl]
  );

  const [activeIdx, setActiveIdx] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (activeIdx >= imageList.length) setActiveIdx(0);
  }, [imageList.length, activeIdx]);

  useEffect(() => {
    if (!enableSlideshow) return;
    if (!slideshowAutoplay) return;
    if (imageList.length <= 1) return;
    if (slideshowPauseOnHover && isHovering) return;

    const id = setInterval(() => {
      setActiveIdx((i) => (i + 1) % imageList.length);
    }, slideshowIntervalMs);

    return () => clearInterval(id);
  }, [
    enableSlideshow,
    slideshowAutoplay,
    slideshowIntervalMs,
    slideshowPauseOnHover,
    isHovering,
    imageList.length,
  ]);

  const gridCols =
    imagesPerRow === 1
      ? "grid-cols-1"
      : imagesPerRow === 3
      ? "grid-cols-3"
      : "grid-cols-2";

  const hasImages = imageList.length > 0;
  const hasFeatures = features.length > 0;
  const hasBadges = badges.length > 0;
  const hasActions = actions.length > 0;
  const hasIntegrations = integrations.length > 0;

  const canSlide = enableSlideshow && imageList.length > 1;
  const goPrev = () =>
    setActiveIdx((i) => (i - 1 + imageList.length) % imageList.length);
  const goNext = () => setActiveIdx((i) => (i + 1) % imageList.length);

  const renderMedia = () => {
    if (!hasImages) return null;

    if (enableSlideshow) {
      return (
        <ProjectSlideshow
          images={imageList}
          title={title}
          aspectRatio="16 / 9" // or "1 / 1" for square
          autoplay={slideshowAutoplay}
          intervalMs={slideshowIntervalMs}
          pauseOnHover={slideshowPauseOnHover}
          showArrows={showSlideshowButtons}
          showDots={showDots}
          showCounter={false}
          showPlayPause={false}
          slideFocus={slideFocus}
        />
      );
    }

    if (showAllImages && imageList.length > 1) {
      return (
        <div className={`grid ${gridCols} gap-2 p-2`}>
          {imageList.map((src, i) => (
            <div
              key={src + i}
              className="relative w-full overflow-hidden rounded-md border border-neutral-800"
              style={{ aspectRatio: "1 / 1" }} // <- square tiles (same height + width)
            >
              <img
                src={src}
                alt={`${title} preview ${i + 1}`}
                loading="lazy"
                className="absolute inset-0 block w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      );
    }

    return (
      <img
        src={imageList[0]}
        alt={`${title} preview`}
        loading="lazy"
        className="w-full object-cover"
      />
    );
  };

  return (
    <div
      className={
        "rounded-2xl h-fit border border-neutral-800 bg-neutral-900/30 overflow-hidden " +
        className
      }
    >
      <div className="p-8 md:p-10 relative">
        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
          <div className="">
            {tag?.text && (
              <div className="mb-4">
                <div
                  className={
                    tag.className ||
                    "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-semibold uppercase tracking-wider border border-blue-500/20"
                  }
                >
                  {tag.text}
                </div>
              </div>
            )}

            <div className="flex items-start gap-3">
              {icon && (
                <img
                  className="rounded-[60px]  top-4 right-4 sm:static  inline-block w-6 h-6  align-middle leading-none text-[24px] text-neutral-400 mt-0.5 flex-shrink-0"
                  src={icon}
                />
              )}

              <div>
                <h3 className="text-2xl mr-5 sm:mr-0 font-medium text-white tracking-tight mb-2">
                  {title}
                </h3>
              </div>
            </div>
            {description && (
              <p className="text-neutral-400 max-w-xl">{description}</p>
            )}
            {hasIntegrations && (
              <div className="mb-0 mt-5 w-full flex flex-wrap items-center gap-4">
                <span className="text-[10px] uppercase tracking-widest text-neutral-500">
                  {integrationText}
                </span>

                <div className="flex flex-wrap items-center gap-3">
                  {integrations.map((brand, idx) => {
                    const Wrapper = brand.href ? "a" : "div";

                    return (
                      <Wrapper
                        key={brand.name + idx}
                        href={brand.href}
                        target={brand.href ? "_blank" : undefined}
                        rel={brand.href ? "noreferrer" : undefined}
                        className="flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/40 px-3 py-1 text-[11px] text-neutral-300 hover:border-neutral-600 transition-colors"
                      >
                        {brand.logo && (
                          <img
                            src={brand.logo}
                            alt={brand.name}
                            className="h-4 w-4 object-contain"
                          />
                        )}
                        <span>{brand.name}</span>
                      </Wrapper>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {hasActions && (
            <div className="flex gap-3">
              {actions.map((a, idx) => (
                <a
                  key={a.href + idx}
                  href={a.href}
                  target={a.target}
                  rel={
                    a.rel || (a.target === "_blank" ? "noreferrer" : undefined)
                  }
                  className={
                    a.className ||
                    "h-9 px-4 whitespace-nowrap rounded border border-neutral-700 hover:border-neutral-500 text-neutral-300 hover:text-white text-xs font-medium flex items-center gap-2 transition-colors"
                  }
                >
                  {a.icon && (
                    <span
                      className="iconify inline-block align-middle leading-none text-[16px]"
                      data-icon={a.icon}
                      aria-hidden="true"
                    />
                  )}
                  {a.label}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Main content */}
        {layout === "split" ? (
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mt-8">
            <div>
              {hasFeatures && (
                <>
                  <h4 className="text-xs font-medium text-white uppercase tracking-wider mb-4 border-b border-neutral-800 pb-2">
                    Key Features Built
                  </h4>

                  <ul className="space-y-3">
                    {features.map((f, idx) => {
                      const props = typeof f === "string" ? { text: f } : f;
                      return <FeatureItem key={idx} {...props} />;
                    })}
                  </ul>
                </>
              )}
            </div>

            <div>
              {hasImages && (
                <div
                  className="overflow-hidden rounded-lg border border-neutral-800 bg-neutral-950"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  {renderMedia()}
                </div>
              )}
            </div>
          </div>
        ) : (
          <>
            {hasImages && (
              <div
                className="mt-8 overflow-hidden rounded-lg border border-neutral-800 bg-neutral-950"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                {renderMedia()}
              </div>
            )}

            {hasFeatures && (
              <div className="mt-8">
                <h4 className="text-xs font-medium text-white uppercase tracking-wider mb-4 border-b border-neutral-800 pb-2">
                  Key Features Built
                </h4>
                <ul className="space-y-3">
                  {features.map((f, idx) => {
                    const props = typeof f === "string" ? { text: f } : f;
                    return <FeatureItem key={idx} {...props} />;
                  })}
                </ul>
              </div>
            )}
          </>
        )}

        {hasBadges && (
          <div className="flex flex-wrap gap-2 mt-6">
            {badges.map((badge) => (
              <span
                key={badge}
                className="px-2 py-0.5 text-[10px] text-neutral-500 border border-neutral-800 rounded"
              >
                {badge}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function FeatureItem({
  text,
  icon = "lucide:check",
  iconColorClass = "text-blue-400",
  emphasis = false,
}) {
  return (
    <li className="flex items-start gap-3 text-sm text-neutral-400">
      <span
        className={`iconify inline-block align-middle leading-none text-[16px] mt-0.5 flex-shrink-0 ${iconColorClass}`}
        data-icon={icon}
        aria-hidden="true"
      />
      <span className={emphasis ? "text-neutral-200 font-medium" : ""}>
        {text}
      </span>
    </li>
  );
}
