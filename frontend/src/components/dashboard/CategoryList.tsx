"use client";

import { useState, useEffect } from "react";
import styles from "@/style/dashboard/categorylist.module.css";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function CategoryList() {
  const [categories, setCategories] = useState<any[]>([]);

  const fetchCategories = async () => {
    const res = await fetch(`${API}/api/categories`);
    const data = await res.json();
    setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this category?")) return;

    const res = await fetch(`${API}/api/categories/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();
    alert(data.msg);
    fetchCategories();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h2 className={styles.title}>Category List</h2>

        {categories.map((cat) => (
          <div key={cat._id} className={styles.listItem}>
            <span className={styles.catId}>{cat.categoryId}</span>

            <img src={cat.image} className={styles.listImg} />

            <span className={styles.catName}>{cat.name}</span>

            {/* ✅ FIXED */}
            <span
              className={`${styles.metalTag} ${
                cat.metalType === "Gold"
                  ? styles.gold
                  : styles.silver
              }`}
            >
              {cat.metalType || "Not Set"}
            </span>

            <div className={styles.actions}>
              <button
                className={styles.deleteBtn}
                onClick={() => handleDelete(cat._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
