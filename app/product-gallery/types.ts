import type { KeyboardEvent, RefObject } from "react";
import { GalleryMedia, GalleryVideo } from "../types";

export interface ProductGalleryProps {
  title: string; // Item title, the fallback alt text and the gallery's accessible name
  media: GalleryMedia[];
}

export interface GallerySlideProps {
  mediaItem: GalleryMedia;
  index: number;
  total: number;
  title: string;
  isActive: boolean;
  isPrimed: boolean; // Once true, offscreen photos stop lazy loading
  playRequest: number;
}

export interface GalleryVideoProps {
  video: GalleryVideo;
  title: string;
  isActive: boolean;
  playRequest: number; // Changes when this video's thumbnail is clicked while it is already on screen
}

export interface GalleryThumbProps {
  mediaItem: GalleryMedia;
  index: number;
  total: number;
  isActive: boolean;
  onSelect: (index: number) => void;
}

export interface GalleryArrowProps {
  direction: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
}

export interface GalleryState {
  activeIndex: number;
  lastIndex: number;
  isPrimed: boolean;
  playRequest: number;
  trackRef: RefObject<HTMLDivElement | null>;
  thumbsRef: RefObject<HTMLDivElement | null>;
  selectSlide: (index: number) => void;
  handlePreviousClick: () => void;
  handleNextClick: () => void;
  handleTrackScroll: () => void;
  handleTrackGrab: () => void;
  handleKeyDown: (event: KeyboardEvent<HTMLDivElement>) => void;
  handleInterest: () => void;
}
