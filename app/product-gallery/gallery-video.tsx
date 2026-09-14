"use client";

import { FC, useEffect, useRef } from "react";
import { GalleryVideoProps } from "./types";
import { playVideo, posterSrc } from "./utilities";

/** Starts playing as soon as its slide becomes active and pauses when the visitor moves on */
export const GalleryVideo: FC<GalleryVideoProps> = ({
  video,
  title,
  isActive,
  playRequest,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // `playRequest` re-runs this when the thumbnail is clicked again, which restarts a paused video
  useEffect(() => {
    const element = videoRef.current;
    if (!element) return;

    if (isActive) playVideo(element);
    else element.pause();
  }, [isActive, playRequest]);

  return (
    <video
      ref={videoRef}
      src={video.src}
      poster={posterSrc(video.poster)}
      aria-label={`Video: ${title}`}
      controls
      playsInline
      preload="none"
    />
  );
};
