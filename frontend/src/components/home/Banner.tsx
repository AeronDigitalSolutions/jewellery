"use client";

import { useEffect, useState } from "react";
import styles from "../../style/home/banner.module.css";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function Banner() {
  const [images, setImages] = useState<string[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchBanners = async () => {
      const res = await fetch(`${API}/api/banners/all`);
      const data = await res.json();
      setImages(data.map((b: any) => b.image));
    };
    fetchBanners();
  }, []);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [images.length]);

  if (images.length === 0) return null;

  return (
    <div className={styles.banner}>
      {images.map((img, i) => (
        <img
          key={i}
          src={img}
          className={`${styles.image} ${
            i === index ? styles.active : ""
          }`}
          alt={`Banner ${i + 1}`}
        />
      ))}

      {images.length > 1 && (
        <>
          <button
            className={styles.arrowLeft}
            onClick={() =>
              setIndex((prev) => (prev - 1 + images.length) % images.length)
            }
          >
            ❮
          </button>

          <button
            className={styles.arrowRight}
            onClick={() =>
              setIndex((prev) => (prev + 1) % images.length)
            }
          >
            ❯
          </button>

          <div className={styles.dots}>
            {images.map((_, i) => (
              <span
                key={i}
                className={`${styles.dot} ${
                  i === index ? styles.activeDot : ""
                }`}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
