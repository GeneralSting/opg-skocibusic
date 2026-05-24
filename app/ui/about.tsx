"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";

const images = [
  {
    src: "/test.webp",
    alt: "Farma 6",
  },
  {
    src: "/watering-2.webp",
    alt: "Farma 7",
  },
  {
    src: "/test-2.webp",
    alt: "Farma 4",
  },
  {
    src: "/cow.jpg",
    alt: "Farma 6",
  },

  {
    src: "/pig.webp",
    alt: "Farma 3",
  },
  {
    src: "/test-1.webp",
    alt: "Farma 3",
  },
  {
    src: "/sheep-eating.webp",
    alt: "Farma 4",
  },
  {
    src: "/dog.webp",
    alt: "Farma 2",
  },

  {
    src: "/test-5.webp",
    alt: "Farma 7",
  },
  {
    src: "/test-6.webp",
    alt: "Farma 7",
  },
];

export default function About() {
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
  }, [isDragging, dragOffset, currentIndex]);

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
    <section id="about">
      <div className="container">
        <div className="about-layout">
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
                      className="about-image"
                      priority={index === 0}
                      loading={index === 0 ? "eager" : "lazy"}
                      sizes="(max-width: 992px) 100vw, 50vw"
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

          <div className="about-content">
            <div className="section-label">O nama</div>
            <h2 className="section-title">Malo gospodarstvo Velika pažnja</h2>
            <p className="section-desc">
              Naše obiteljsko poljoprivredno gospodarstvo smješteno je u selu
              Koritna, u srcu plodne slavonske zemlje. Uzgajamo i proizvodimo
              hranu koju i sami ponosno stavljamo na svoj stol. Vjerujemo da ono
              što dolazi iz prirode, uzgojeno s pažnjom, poštovanjem i bez
              nepotrebnih dodataka, donosi ono najvrjednije: zdravlje i pravi
              okus domaćeg.
            </p>

            <div className="about-values">
              <div className="value-item">
                <Image
                  src="/location.png"
                  alt="Plodna Slavonija"
                  width={64}
                  height={64}
                  className="v-icon"
                  loading="lazy"
                />
                <div>
                  <h3>Lokalno podrijetlo</h3>
                  <p>
                    Svi proizvodi potječu s našeg gospodarstva - znate točno
                    odakle dolaze.
                  </p>
                </div>
              </div>

              <div className="value-item">
                <Image
                  src="/agreement.png"
                  alt="Isti stol"
                  width={64}
                  height={64}
                  className="v-icon"
                  loading="lazy"
                />
                <div>
                  <h3>Osobni pristup</h3>
                  <p>
                    Direktan kontakt i kupnja od čovjeka koji to sam uzgaja.
                  </p>
                </div>
              </div>

              <div className="value-item">
                <Image
                  src="/love.png"
                  alt="Pažnja do kraja"
                  width={64}
                  height={64}
                  className="v-icon"
                  loading="lazy"
                />
                <div>
                  <h3>Dobrobit životinja</h3>
                  <p>Naše životinje žive slobodno, na prirodan način</p>
                </div>
              </div>

              <div className="value-item">
                <Image
                  src="/healthy-living.png"
                  alt="Bez nepotrebnih dodataka"
                  width={64}
                  height={64}
                  className="v-icon"
                  loading="lazy"
                />
                <div>
                  <h3>Tradicija = zdravlje</h3>
                  <p>
                    Držimo se tradicionalnog načina: sporije, prirodnije,
                    zdravije.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
