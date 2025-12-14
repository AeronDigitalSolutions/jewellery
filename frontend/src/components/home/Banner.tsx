"use client";

import { useEffect, useRef, useState } from "react";
import styles from "../../style/home/banner.module.css";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function Banner() {
  const [images, setImages] = useState<string[]>([]);
  const [index, setIndex] = useState(0);

  // 🔹 Fetch banners once
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await fetch(`${API}/api/banners/all`);
        const data = await res.json();
        setImages(data.map((b: any) => b.image));
      } catch (err) {
        console.error("Banner fetch failed", err);
      }
    };

    fetchBanners();
  }, []);

  // 🔹 Auto-slide (ONLY when images exist)
  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  if (images.length === 0) return null;

  const next = () =>
    setIndex((prev) => (prev + 1) % images.length);

  const prev = () =>
    setIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className={styles.banner}>
      <div
        className={styles.slider}
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((img, i) => (
          <img key={i} src={img} className={styles.image} />
        ))}
      </div>

      {images.length > 1 && (
        <>
          <button onClick={prev} className={styles.arrowLeft}>❮</button>
          <button onClick={next} className={styles.arrowRight}>❯</button>

          <div className={styles.dots}>
            {images.map((_, i) => (
              <span
                key={i}
                className={`${styles.dot} ${index === i ? styles.activeDot : ""}`}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
