import React, { useState, useEffect, useRef } from "react";
import styles from "../../style/home/banner.module.css";

const images = [
  "/assets/banner1.jpg",
  "/assets/banner3.jpg",
  "/assets/banner4.jpg"
];


export default function Banner() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % images.length);
  const prev = () =>
    setIndex((prev) => (prev - 1 + images.length) % images.length);

  // ------ Swipe Logic (Built-In) ------
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const onTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current;

    if (distance > 50) next();
    if (distance < -50) prev();
  };
  // ------------------------------------

  useEffect(() => {
    const slide = setInterval(next, 3000);
    return () => clearInterval(slide);
  }, []);

  return (
    <div
      className={styles.banner}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div
        className={styles.slider}
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((img, i) => (
          <img key={i} src={img} className={styles.image} />
        ))}
      </div>

      <button className={styles.arrowLeft} onClick={prev}>❮</button>
      <button className={styles.arrowRight} onClick={next}>❯</button>

      <div className={styles.dots}>
        {images.map((_, i) => (
          <span
            key={i}
            className={`${styles.dot} ${index === i ? styles.activeDot : ""}`}
            onClick={() => setIndex(i)}
          ></span>
        ))}
      </div>
    </div>
  );
}