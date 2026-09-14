"use client";

import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { GalleryMedia } from "../types";
import { SETTLE_MS } from "./data";
import { GalleryState } from "./types";
import { centerThumbnail, scrollBehavior } from "./utilities";

/**
 * State and handlers for the product gallery
 *
 * The slides sit in a horizontal scroll-snap track, so a swipe scrolls it
 * natively. Arrows, thumbnails and keys scroll the same track from code, and
 * `isSeeking` tells the two apart while the track is moving
 */
export function useGallery(media: GalleryMedia[]): GalleryState {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPrimed, setIsPrimed] = useState(false); // Offscreen photos stay lazy until the visitor shows interest in the gallery
  const [playRequest, setPlayRequest] = useState(0);

  const trackRef = useRef<HTMLDivElement>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);
  const settleTimer = useRef<number>(undefined);
  const isSeeking = useRef(false); // True while code scrolls the track, so the slides it passes on the way are not selected

  const lastIndex = media.length - 1;

  const goTo = (targetIndex: number) => {
    const nextIndex = Math.max(0, Math.min(targetIndex, lastIndex));
    const track = trackRef.current;
    if (nextIndex === activeIndex || !track) return;

    isSeeking.current = true;
    setIsPrimed(true);
    setActiveIndex(nextIndex);
    track.scrollTo({
      left: nextIndex * track.clientWidth,
      behavior: scrollBehavior(),
    });
  };

  const selectSlide = (targetIndex: number) => {
    // Clicking the thumbnail of the video already on screen starts it again
    if (targetIndex === activeIndex) setPlayRequest((count) => count + 1);
    else goTo(targetIndex);
  };

  const handlePreviousClick = () => goTo(activeIndex - 1);

  const handleNextClick = () => goTo(activeIndex + 1);

  /**
   * A swipe moves the active slide along with the finger: the thumbnail
   * switches as soon as the next photo is more than half in view. A jump from
   * an arrow or thumbnail only lands once the track stops moving, so a jump
   * from 1 to 4 does not select (and play) the slides in between
   */
  const handleTrackScroll = () => {
    const track = trackRef.current;
    if (!track) return;

    const nearestIndex = Math.round(track.scrollLeft / track.clientWidth);
    if (!isSeeking.current) setActiveIndex(nearestIndex);

    const handleScrollSettled = () => {
      isSeeking.current = false;
      setActiveIndex(nearestIndex);
    };

    window.clearTimeout(settleTimer.current);
    settleTimer.current = window.setTimeout(handleScrollSettled, SETTLE_MS);
  };

  // The visitor grabbed the track mid-jump, so their swipe takes over
  const handleTrackGrab = () => {
    isSeeking.current = false;
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    // Arrow keys seek inside the video player
    if (event.target instanceof HTMLVideoElement) return;

    const targetIndex = {
      ArrowLeft: activeIndex - 1,
      ArrowRight: activeIndex + 1,
      Home: 0,
      End: lastIndex,
    }[event.key];
    if (targetIndex === undefined) return;

    event.preventDefault();
    goTo(targetIndex);
  };

  const handleInterest = () => setIsPrimed(true);

  useEffect(() => {
    return () => window.clearTimeout(settleTimer.current);
  }, []);

  // Keeps the active thumbnail in view when the row is wider than the gallery
  useEffect(() => {
    if (thumbsRef.current) centerThumbnail(thumbsRef.current, activeIndex);
  }, [activeIndex]);

  return {
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
  };
}
