import Image from "next/image";
import { FC } from "react";
import { THUMB_SIZES } from "./data";
import { GalleryThumbProps } from "./types";

// Thumbnail under the main slide, video shows its poster with a play icon on top
export const GalleryThumb: FC<GalleryThumbProps> = ({
  mediaItem,
  index,
  total,
  isActive,
  onSelect,
}) => {
  const isVideo = mediaItem.type === "video";
  const position = `${index + 1} od ${total}`;

  const handleClick = () => onSelect(index);

  return (
    <button
      type="button"
      className={`gallery-thumb ${isActive ? "active" : ""}`}
      aria-label={
        isVideo
          ? `Pokreni video ${position}`
          : `Prikaži fotografiju ${position}`
      }
      aria-current={isActive}
      onClick={handleClick}
    >
      <Image
        src={mediaItem.type === "video" ? mediaItem.poster : mediaItem.src}
        alt=""
        fill
        quality={50}
        sizes={THUMB_SIZES}
        draggable={false}
        style={{ objectFit: "cover" }}
      />
      {isVideo && (
        <span className="gallery-play" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 14 14">
            <path d="M3.5 1.8 L12 7 L3.5 12.2 Z" fill="currentColor" />
          </svg>
        </span>
      )}
    </button>
  );
};
