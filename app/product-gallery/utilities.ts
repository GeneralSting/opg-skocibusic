import { getImageProps } from "next/image";

// Smooth scrolling, unless the visitor asked the system for reduced motion
export const scrollBehavior = (): ScrollBehavior =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "instant"
    : "smooth";

// The browser would otherwise download the full-size original just to show the poster
export const posterSrc = (src: string) =>
  getImageProps({ src, alt: "", width: 540, height: 405, quality: 70 }).props
    .src;

/** Scrolls the thumbnail row so the active thumbnail sits in the middle */
export function centerThumbnail(strip: HTMLElement, index: number) {
  const thumbnail = strip.children[index] as HTMLElement | undefined;
  if (!thumbnail) return;

  strip.scrollTo({
    left: thumbnail.offsetLeft - (strip.clientWidth - thumbnail.offsetWidth) / 2,
    behavior: scrollBehavior(),
  });
}

/**
 * A click counts as permission to play with sound. After a swipe some browsers
 * (Safari) disagree, so the video starts muted instead of not at all
 */
export function playVideo(video: HTMLVideoElement) {
  const retryMuted = (error: DOMException) => {
    if (error.name !== "NotAllowedError") return;
    video.muted = true;
    video.play().catch(ignoreRejection);
  };

  video.play().catch(retryMuted);
}

// Nothing left to try: the visitor can still start it from the controls
const ignoreRejection = () => {};
