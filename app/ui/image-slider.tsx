"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";

interface SliderImage {
  src: string;
  alt: string;
}

interface ImageSliderProps {
  images: SliderImage[];
}

export default function ImageSlider({ images }: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

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
  const handleTouchStart = (e: React.TouchEvent) => {
    handleDragStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleDragMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleDragEnd();
  };

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleDragStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleDragMove(e.clientX);
  };

  const handleMouseUp = () => {
    handleDragEnd();
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleDragEnd();
    }
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setDragOffset(0);
  };

  // Calculate translateX using state instead of ref
  const baseTranslate = -currentIndex * 100;
  const dragTranslate =
    isDragging && containerWidth > 0 ? (dragOffset / containerWidth) * 100 : 0;

  const sliderStyle = {
    transform: `translateX(${baseTranslate + dragTranslate}%)`,
    transition: isDragging ? "none" : "transform 0.3s ease-in-out",
  };

  return (
    <div className="slider-container">
      <div
        ref={sliderRef}
        className={`slider-wrapper ${isDragging ? "dragging" : ""}`}
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
            <div key={index} className="slide">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                quality={70}
                className="about-image"
                priority={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
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
        {images.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
