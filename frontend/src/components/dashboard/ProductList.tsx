"use client";

import { useEffect, useState } from "react";
import styles from "@/style/dashboard/productlist.module.css";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function ProductList() {
  const [products, setProducts] = useState<any[]>([]);

  const fetchProducts = async () => {
    const res = await fetch(`${API}/api/products`);
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const remove = async (id: string) => {
    if (!confirm("Delete product?")) return;

    await fetch(`${API}/api/products/${id}`, { method: "DELETE" });
    fetchProducts();
  };

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Product List</h3>

      {products.map((p: any) => (
        <div key={p._id} className={styles.item}>
          <img src={p.images?.[0]} className={styles.img} />

          <div className={styles.info}>
            <p><b>{p.name}</b></p>

            {/* ✅ FIXED */}
            <p className={styles.category}>
              {p.category?.name}
            </p>

            <p className={styles.metal}>
              {p.category?.metalType}
            </p>

            <p className={styles.price}>
              ₹{Number(p.totalPrice).toLocaleString("en-IN")}
            </p>
          </div>

          <button
            className={styles.deleteBtn}
            onClick={() => remove(p._id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
