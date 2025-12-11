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
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const slide = setInterval(() => {
      setStartIndex((prev) => (prev + 1) % testimonials.length);
    }, 2500);

    return () => clearInterval(slide);
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>What Our Customers Say</h2>

      <div
        className={styles.slider}
        style={{ transform: `translateX(-${startIndex * 100}%)` }}
      >
        {testimonials.map((review, index) => (
          <div key={index} className={styles.card}>
            <img src={review.image} className={styles.image} />
            <h3 className={styles.name}>{review.name}</h3>
            <p className={styles.text}>{review.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
