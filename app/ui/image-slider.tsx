"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { AboutImage } from "../types";

interface ImageSliderProps {
  images: AboutImage[];
}

export default function ImageSlider({ images }: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  const sliderRef = useRef<HTMLDivElement>(null);

  // Calculate translateX using state instead of ref
  const baseTranslate = -currentIndex * 100;
  const dragTranslate =
    isDragging && containerWidth > 0 ? (dragOffset / containerWidth) * 100 : 0;

  const sliderStyle = {
    transform: `translateX(${baseTranslate + dragTranslate}%)`,
    transition: isDragging ? "none" : "transform 0.3s ease-in-out",
  };

  const handleDragStart = useCallback((clientX: number) => {
    setIsDragging(true);
    setDragStart(clientX);
    setDragOffset(0);
  }, []);

  const handleDragMove = useCallback(
    (clientX: number) => {
      if (!isDragging) return;
      const offset = clientX - dragStart;
      setDragOffset(offset);
    },
    [isDragging, dragStart],
  );

  const handleDragEnd = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);

    const threshold = 100;
    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset > 0 && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      } else if (dragOffset < 0 && currentIndex < images.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    }
    setDragOffset(0);
  }, [isDragging, dragOffset, currentIndex, images.length]);

  // Touch events
  const handleTouchStart = (event: React.TouchEvent) => {
    handleDragStart(event.touches[0].clientX);
  };

  const handleTouchMove = (event: React.TouchEvent) => {
    handleDragMove(event.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleDragEnd();
  };

  // Mouse events
  const handleMouseDown = (event: React.MouseEvent) => {
    event.preventDefault();
    handleDragStart(event.clientX);
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    handleDragMove(event.clientX);
  };

  const handleMouseUp = () => {
    handleDragEnd();
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleDragEnd();
    }
  };

  const goToSlide = useCallback(
    (index: number) => {
      setCurrentIndex(Math.max(0, Math.min(index, images.length - 1)));
      setDragOffset(0);
    },
    [images.length],
  );

  // Keyboard equivalent for the drag gesture.
  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case "ArrowLeft":
        event.preventDefault();
        goToSlide(currentIndex - 1);
        break;
      case "ArrowRight":
        event.preventDefault();
        goToSlide(currentIndex + 1);
        break;
      case "Home":
        event.preventDefault();
        goToSlide(0);
        break;
      case "End":
        event.preventDefault();
        goToSlide(images.length - 1);
        break;
    }
  };

  // Update container width on mount and resize
  useEffect(() => {
    const updateWidth = () => {
      if (sliderRef.current) {
        setContainerWidth(sliderRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return (
    <div
      className="slider-container"
      role="group"
      aria-roledescription="karusel"
      aria-label="Fotografije gospodarstva"
    >
      <div
        ref={sliderRef}
        className={`slider-wrapper ${isDragging ? "dragging" : ""}`}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        <div className="slider-track" style={sliderStyle}>
          {images.map((image, index) => (
            <div
              key={image.src}
              className="slide"
              aria-hidden={index !== currentIndex}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                quality={70}
                className="about-image"
                /**
                 * All slides stay lazy, event first one
                 * The whole slider is below the fold, and React 19 emits a "<link rel="preload"> for any image
                 * that is not lazy - which would make this photos compete with the hero image for LCP
                 */
                loading="lazy"
                // Gives sharper, smaller-sized images depending on the screen break
                sizes="(max-width: 480px) 450px, (max-width: 992px) 700px, 50vw"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Dots Navigation */}
      <div className="slider-dots">
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            className={`dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => goToSlide(index)}
            aria-label={`Prikaži fotografiju ${index + 1} od ${images.length}`}
            aria-current={index === currentIndex}
          />
        ))}
      </div>
    </div>
  );
}
