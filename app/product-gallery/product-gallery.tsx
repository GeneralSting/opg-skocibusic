"use client";

import { FC } from "react";
import { GalleryArrow } from "./gallery-arrow";
import { GallerySlide } from "./gallery-slide";
import { GalleryThumb } from "./gallery-thumb";
import { ProductGalleryProps } from "./types";
import { useGallery } from "./use-gallery";

/**
 * Photo and video gallery on a detail page: one large slide with previous/next
 * arrows, and a row of thumbnails underneath that pick the slide directly
 *
 * Phones and tablets swipe between the slides and show no arrows (see
 * `.gallery-arrow` in globals.css). A video can never be the first slide (see
 * `CatalogItem.gallery`), so nothing plays on page load
 *
 * State and handlers live in ./use-gallery; this file is markup only
 */
export const ProductGallery: FC<ProductGalleryProps> = ({ title, media }) => {
  const {
    activeIndex,
    lastIndex,
    isPrimed,
    playRequest,
    trackRef,
    thumbsRef,
    selectSlide,
    handlePreviousClick,
    handleNextClick,
    handleTrackScroll,
    handleTrackGrab,
    handleKeyDown,
    handleInterest,
  } = useGallery(media);

  const hasSeveral = media.length > 1;

  return (
    <div
      className="gallery"
      role="group"
      aria-roledescription="galerija"
      aria-label={`Fotografije: ${title}`}
      onKeyDown={handleKeyDown}
      onPointerEnter={handleInterest}
      onTouchStart={handleInterest}
      onFocus={handleInterest}
    >
      <div className="detail-media gallery-stage">
        <div
          ref={trackRef}
          className="gallery-track"
          tabIndex={0}
          onScroll={handleTrackScroll}
          onTouchStart={handleTrackGrab}
          onWheel={handleTrackGrab}
        >
          {media.map((mediaItem, mediaIndex) => (
            <GallerySlide
              key={`${mediaItem.src}-${mediaIndex}`}
              mediaItem={mediaItem}
              index={mediaIndex}
              total={media.length}
              title={title}
              isActive={mediaIndex === activeIndex}
              isPrimed={isPrimed}
              playRequest={playRequest}
            />
          ))}
        </div>

        {hasSeveral && (
          <>
            <GalleryArrow
              direction="prev"
              disabled={activeIndex === 0}
              onClick={handlePreviousClick}
            />
            <GalleryArrow
              direction="next"
              disabled={activeIndex === lastIndex}
              onClick={handleNextClick}
            />
          </>
        )}
      </div>

      {hasSeveral && (
        <div ref={thumbsRef} className="gallery-thumbs">
          {media.map((mediaItem, mediaIndex) => (
            <GalleryThumb
              key={`${mediaItem.src}-${mediaIndex}`}
              mediaItem={mediaItem}
              index={mediaIndex}
              total={media.length}
              isActive={mediaIndex === activeIndex}
              onSelect={selectSlide}
            />
          ))}
        </div>
      )}
    </div>
  );
};
