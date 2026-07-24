import { GripHorizontal, GripVertical } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils.js";

/**
 * Reveal1 — drag-to-compare before/after slider.
 *
 * Adapted from the pasted marketplace snippet for this codebase:
 *  - `@/lib/utils` -> relative import (no `@/` alias configured here)
 *  - shadcn tokens that don't exist in this theme were mapped to the brand
 *    palette (text-muted-foreground -> text-primary/70, bg-primary/text-background
 *    handle -> bg-pink/text-cocoa) and radii bumped to the site's rounded style.
 */
interface Reveal1Props {
  heading?: string;
  description?: string;
  beforeImage: {
    src: string;
    alt: string;
  };
  afterImage: {
    src: string;
    alt: string;
  };
  beforeLabel?: string;
  afterLabel?: string;
  orientation?: "horizontal" | "vertical";
  initialPosition?: number;
  showLabels?: boolean;
  dividerWidth?: number;
  className?: string;
  /** Render only the comparison slider (no section wrapper / header) for use in grids. */
  bare?: boolean;
  /** Tailwind aspect-ratio class for the comparison box (default aspect-video). */
  aspectClassName?: string;
}

export function Reveal1({
  heading,
  description,
  beforeImage,
  afterImage,
  beforeLabel = "Before",
  afterLabel = "After",
  orientation = "horizontal",
  initialPosition = 50,
  showLabels = true,
  dividerWidth = 4,
  className,
  bare = false,
  aspectClassName = "aspect-video",
}: Reveal1Props) {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const isHorizontal = orientation === "horizontal";

  const handleMove = useCallback(
    (clientX: number, clientY: number) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();

      if (isHorizontal) {
        const x = clientX - rect.left;
        const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
        setPosition(percentage);
      } else {
        const y = clientY - rect.top;
        const percentage = Math.max(0, Math.min(100, (y / rect.height) * 100));
        setPosition(percentage);
      }
    },
    [isHorizontal]
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setIsDragging(true);
      handleMove(e.clientX, e.clientY);
    },
    [handleMove]
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      setIsDragging(true);
      const touch = e.touches[0];
      if (touch) {
        handleMove(touch.clientX, touch.clientY);
      }
    },
    [handleMove]
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        handleMove(e.clientX, e.clientY);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging) {
        const touch = e.touches[0];
        if (touch) {
          handleMove(touch.clientX, touch.clientY);
        }
      }
    };

    const handleEnd = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("touchmove", handleTouchMove);
      document.addEventListener("mouseup", handleEnd);
      document.addEventListener("touchend", handleEnd);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("mouseup", handleEnd);
      document.removeEventListener("touchend", handleEnd);
    };
  }, [isDragging, handleMove]);

  const slider = (
    <div
            ref={containerRef}
            role="slider"
            aria-label="Before/After comparison slider"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={position}
            tabIndex={0}
            className={cn(
              "relative w-full select-none overflow-hidden rounded-[26px] border border-primary/10 shadow-[0_20px_55px_rgba(9,84,61,0.14)]",
              aspectClassName,
              isHorizontal ? "cursor-ew-resize" : "cursor-ns-resize"
            )}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          >
            {/* After Image (Bottom layer - full) */}
            <div className="absolute inset-0">
              <img
                className="absolute inset-0 size-full object-cover"
                src={afterImage.src}
                alt={afterImage.alt}
                loading="lazy"
                draggable="false"
              />
            </div>

            {/* Before Image (Top layer - clipped) */}
            <div
              className="absolute inset-0"
              style={{
                clipPath: isHorizontal
                  ? `inset(0 ${100 - position}% 0 0)`
                  : `inset(0 0 ${100 - position}% 0)`,
              }}
            >
              <img
                className="absolute inset-0 size-full object-cover"
                src={beforeImage.src}
                alt={beforeImage.alt}
                loading="lazy"
                draggable="false"
              />
            </div>

            {/* Divider Line */}
            <div
              className={cn(
                "absolute z-10 bg-cream shadow-lg",
                isHorizontal ? "bottom-0 top-0 -translate-x-1/2" : "left-0 right-0 -translate-y-1/2"
              )}
              style={{
                [isHorizontal ? "left" : "top"]: `${position}%`,
                [isHorizontal ? "width" : "height"]: `${dividerWidth}px`,
              }}
            >
              {/* Handle */}
              <div
                className={cn(
                  "absolute bg-pink text-cocoa rounded-full shadow-xl",
                  "flex items-center justify-center",
                  "h-10 w-10 border-[3px] border-cream",
                  "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
                  "transition-transform",
                  isDragging && "scale-110"
                )}
              >
                {isHorizontal ? (
                  <GripVertical className="size-5 text-cocoa" />
                ) : (
                  <GripHorizontal className="size-5 text-cocoa" />
                )}
              </div>
            </div>

            {/* Labels */}
            {showLabels && (
              <>
                <div
                  className={cn(
                    "absolute z-20 rounded-full px-3 py-1.5",
                    "bg-cocoa/85 text-cream text-sm font-semibold backdrop-blur-sm",
                    "left-4 top-4"
                  )}
                >
                  {beforeLabel}
                </div>
                <div
                  className={cn(
                    "absolute z-20 rounded-full px-3 py-1.5",
                    "bg-pink text-cocoa text-sm font-semibold backdrop-blur-sm",
                    isHorizontal ? "right-4 top-4" : "bottom-4 left-4"
                  )}
                >
                  {afterLabel}
                </div>
              </>
            )}
          </div>
  );

  if (bare) {
    return <div className={cn("w-full", className)}>{slider}</div>;
  }

  return (
    <section className={cn("w-full py-16 md:py-24", className)}>
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <div className="flex flex-col items-center gap-8">
          {(heading || description) && (
            <div className="flex flex-col items-center gap-4 text-center">
              {heading && (
                <h2 className="text-balance text-2xl font-semibold text-primary sm:text-3xl md:text-5xl">
                  {heading}
                </h2>
              )}
              {description && (
                <p className="max-w-2xl text-balance text-base text-primary/70 sm:text-lg">
                  {description}
                </p>
              )}
            </div>
          )}
          {slider}
        </div>
      </div>
    </section>
  );
}

export default Reveal1;
