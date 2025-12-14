"use client";

import { useEffect, useState } from "react";
import styles from "@/style/home/categories.module.css";
import Link from "next/link";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function Categories() {
  const [gold, setGold] = useState<any[]>([]);
  const [silver, setSilver] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${API}/api/categories`)
      .then(res => res.json())
      .then(data => {
        setGold(data.filter((c: any) => c.metalType === "Gold"));
        setSilver(data.filter((c: any) => c.metalType === "Silver"));
      });
  }, []);

  const render = (title: string, items: any[]) => (
    <div className={styles.section}>
      <h3 className={styles.sectionTitle}>{title}</h3>

      <div className={styles.slider}>
        {items.map(cat => (
          <Link
            key={cat._id}
            href={`/categories/${cat._id}`}
            className={styles.card}
          >
            <img src={cat.image} className={styles.image} />
            <p className={styles.name}>{cat.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Shop by Categories</h2>

      {render("Gold Jewellery", gold)}
      {render("Silver Jewellery", silver)}

      {/* ✅ RESTORED VIEW ALL BUTTON */}
      <Link href="/categories">
        <button className={styles.button}>
          View All Categories
        </button>
      </Link>
    </div>
  );
}
