import { FC } from "react";
import { GalleryArrowProps } from "./types";

/**
 * Previous or next button over the main slide
 *
 * `aria-disabled` rather than `disabled`: a disabled button drops keyboard
 * focus, so pressing "next" on the last slide would throw the visitor back to
 * the top of the page
 */
export const GalleryArrow: FC<GalleryArrowProps> = ({
  direction,
  disabled,
  onClick,
}) => (
  <button
    type="button"
    className={`gallery-arrow ${direction}`}
    aria-label={direction === "prev" ? "Prethodna slika" : "Sljedeća slika"}
    aria-disabled={disabled}
    onClick={onClick}
  >
    <svg
      width="18"
      height="18"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path
        d={
          direction === "prev"
            ? "M12.5 4 L6.5 10 L12.5 16"
            : "M7.5 4 L13.5 10 L7.5 16"
        }
      />
    </svg>
  </button>
);
