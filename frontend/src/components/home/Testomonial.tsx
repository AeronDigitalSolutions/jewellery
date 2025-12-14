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
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % testimonials.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>What Our Customers Say</h2>

      <div className={styles.viewport}>
        <div
          className={styles.slider}
          style={{
            transform: `translateX(-${index * 33.3333}%)`,
          }}
        >
          {testimonials.map((review, i) => (
            <div key={i} className={styles.card}>
              <img src={review.image} className={styles.image} />
              <h3 className={styles.name}>{review.name}</h3>
              <p className={styles.text}>{review.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
