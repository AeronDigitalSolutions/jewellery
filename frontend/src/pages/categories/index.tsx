"use client";

import { useEffect, useState } from "react";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import styles from "@/style/categories.module.css";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function Categories() {
  const [goldCategories, setGoldCategories] = useState<any[]>([]);
  const [silverCategories, setSilverCategories] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${API}/api/categories`)
      .then((res) => res.json())
      .then((data) => {
        setGoldCategories(
          data.filter((c: any) => c.metalType === "Gold")
        );
        setSilverCategories(
          data.filter((c: any) => c.metalType === "Silver")
        );
      });
  }, []);

  return (
    <>
      <Header />

      <div className={styles.container}>
        <h1 className={styles.title}>Categories</h1>

        {/* 🟡 GOLD CATEGORIES */}
        {goldCategories.length > 0 && (
          <>
            <h2 className={styles.sectionTitle}>Gold Jewellery</h2>

            <div className={styles.grid}>
              {goldCategories.map((cat) => (
                <div key={cat._id} className={styles.card}>
                  <img src={cat.image} className={styles.image} />
                  <p className={styles.name}>{cat.name}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ⚪ SILVER CATEGORIES */}
        {silverCategories.length > 0 && (
          <>
            <h2 className={styles.sectionTitle}>Silver Jewellery</h2>

            <div className={styles.grid}>
              {silverCategories.map((cat) => (
                <div key={cat._id} className={styles.card}>
                  <img src={cat.image} className={styles.image} />
                  <p className={styles.name}>{cat.name}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <Footer />
    </>
  );
}
