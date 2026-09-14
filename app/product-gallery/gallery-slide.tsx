import Image from "next/image";
import { FC } from "react";
import { SLIDE_SIZES } from "./data";
import { GalleryVideo } from "./gallery-video";
import { GallerySlideProps } from "./types";

/**
 * One slide in the track. Every slide but the active one is `inert`, which also
 * keeps the controls of an offscreen video out of the tab order
 */
export const GallerySlide: FC<GallerySlideProps> = ({
  mediaItem,
  index,
  total,
  title,
  isActive,
  isPrimed,
  playRequest,
}) => (
  <div
    className={`gallery-slide ${mediaItem.type}`}
    role="group"
    aria-roledescription="slajd"
    aria-label={`${index + 1} od ${total}`}
    inert={!isActive}
  >
    {mediaItem.type === "image" ? (
      <Image
        src={mediaItem.src}
        alt={mediaItem.alt ?? title}
        fill
        quality={70}
        sizes={SLIDE_SIZES}
        loading={index === 0 || isPrimed ? "eager" : "lazy"}
        fetchPriority={index === 0 ? "high" : undefined} // The first photo is the largest thing on the page, so it loads first
        draggable={false}
        style={{ objectFit: "cover" }}
      />
    ) : (
      <GalleryVideo
        video={mediaItem}
        title={title}
        isActive={isActive}
        playRequest={playRequest}
      />
    )}
  </div>
);
