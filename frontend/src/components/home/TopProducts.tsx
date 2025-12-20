"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { IoShareSocial } from "react-icons/io5";
import styles from "@/style/home/topproducts.module.css";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function TopProducts() {
  const [slots, setSlots] = useState<any[]>(Array(8).fill(null));

  useEffect(() => {
    fetch(`${API}/api/top-products`)
      .then(res => res.json())
      .then(data => {
        const filled = Array(8).fill(null);
        data?.forEach((item: any) => {
          if (item.slot >= 1 && item.slot <= 8 && item.productId) {
            filled[item.slot - 1] = item.productId;
          }
        });
        setSlots(filled);
      });
  }, []);

  const addToCart = (product: any) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = cart.find((i: any) => i._id === product._id);
    if (existing) existing.qty += 1;
    else cart.push({ ...product, qty: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const shareProduct = (product: any) => {
    const url = `${window.location.origin}/products/${product._id}`;
    if (navigator.share) navigator.share({ title: product.name, url });
    else {
      navigator.clipboard.writeText(url);
      alert("Product link copied!");
    }
  };

  const formatPrice = (price: number) =>
    Number(price || 0).toLocaleString("en-IN");

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Top Products</h2>

      <div className={styles.grid}>
        {slots.map((p, i) =>
          p ? (
            <div key={p._id} className={styles.card}>
              {/* SHARE BUTTON */}
              <button
                className={styles.shareBtn}
                onClick={() => shareProduct(p)}
              >
                <IoShareSocial />
              </button>

              {/* ✅ IMAGE WRAPPER (FIX) */}
              <div className={styles.imageWrapper}>
                <img src={p.images?.[0]} className={styles.image} />
              </div>

              <h3 className={styles.name}>{p.name}</h3>
              <p className={styles.weight}>Weight: {p.weight} gm</p>
              <p className={styles.price}>
                ₹{formatPrice(p.totalPrice)}
              </p>

              <div className={styles.buttonRow}>
                <button
                  className={styles.cartBtn}
                  onClick={() => addToCart(p)}
                >
                  Add to Cart
                </button>

                <Link
                  href={`/products/${p._id}`}
                  className={styles.detailsBtn}
                >
                  View Details
                </Link>
              </div>
            </div>
          ) : (
            <div key={i} className={`${styles.card} ${styles.empty}`}>
              Coming Soon
            </div>
          )
        )}
      </div>

      <Link href="/products">
        <button className={styles.viewAll}>View All Products</button>
      </Link>
    </div>
  );
}
