"use client";

import { useEffect, useState } from "react";
import styles from "@/style/testomonial.module.css";

const testimonials = [
  {
    name: "Aarohi Verma",
    image: "/assets/testo1.jpg",
    text: "Absolutely loved the jewellery quality! Perfect shine and finish.",
  },
  {
    name: "Priya Kapoor",
    image: "/assets/testo2.jpg",
    text: "Great customer service and fast delivery. Highly recommended!",
  },
  {
    name: "Sneha Rao",
    image: "/assets/testo1.jpg",
    text: "The bridal set was stunning! Everyone admired it at the wedding.",
  },
  {
    name: "Neha Sharma",
    image: "/assets/testo2.jpg",
    text: "Very premium packaging and amazing craftsmanship.",
  },
  {
    name: "Komal Singh",
    image: "/assets/testo1.jpg",
    text: "Beautiful designs and affordable prices. I loved everything!",
  },
];

export default function Testomonial() {
  const [start, setStart] = useState(0);
  const [perView, setPerView] = useState(3);

  // 🔁 Responsive count
  useEffect(() => {
    const updateView = () => {
      if (window.innerWidth <= 600) setPerView(1);
      else if (window.innerWidth <= 992) setPerView(2);
      else setPerView(3);
    };

    updateView();
    window.addEventListener("resize", updateView);
    return () => window.removeEventListener("resize", updateView);
  }, []);

  // 🔁 Rotate testimonials (NO SLIDE)
  useEffect(() => {
    const interval = setInterval(() => {
      setStart(prev =>
        prev + perView >= testimonials.length ? 0 : prev + perView
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [perView]);

  const visible = testimonials.slice(start, start + perView);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>What Our Customers Say</h2>

      <div className={styles.grid}>
        {visible.map((review, i) => (
          <div key={i} className={styles.card}>
            <img src={review.image} className={styles.image} />
            <h3 className={styles.name}>{review.name}</h3>
            <p className={styles.text}>{review.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
