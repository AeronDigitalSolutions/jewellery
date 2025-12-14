"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "@/style/productdetail.module.css";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState<any>(null);
  const [mainImage, setMainImage] = useState("");
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    if (!id) return;

    fetch(`${API}/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setMainImage(data.images?.[0]);
      });
  }, [id]);

  const formatPrice = (p: any) =>
    Number(p?.totalPrice ?? 0).toLocaleString("en-IN");

  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = cart.find((item: any) => item._id === product._id);

    if (existing) existing.qty += qty;
    else cart.push({ ...product, qty });

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to Cart!");
  };

  if (!product) return <h2>Loading...</h2>;

  return (
    <>
      <div className={styles.container}>
        {/* Thumbnails */}
        <div className={styles.thumbnailColumn}>
          {product.images.map((img: string, i: number) => (
            <img
              key={i}
              src={img}
              className={styles.thumbnail}
              onClick={() => setMainImage(img)}
            />
          ))}
        </div>

        {/* Main Image */}
        <div className={styles.mainImageWrapper}>
          <img src={mainImage} className={styles.mainImage} />
        </div>

        {/* Info */}
        <div className={styles.info}>
          <h1 className={styles.name}>{product.name}</h1>

          <p className={styles.price}>₹{formatPrice(product)}</p>

          <p className={styles.weight}>Weight: {product.weight} gm</p>

          <div className={styles.qtyRow}>
            <button onClick={() => setQty(qty > 1 ? qty - 1 : 1)}>-</button>
            <span>{qty}</span>
            <button onClick={() => setQty(qty + 1)}>+</button>
          </div>

          <button className={styles.addButton} onClick={addToCart}>
            Add to Cart
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className={styles.tabsContainer}>
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${
              activeTab === "description" ? styles.activeTab : ""
            }`}
            onClick={() => setActiveTab("description")}
          >
            Description
          </button>

          <button
            className={`${styles.tab} ${
              activeTab === "specs" ? styles.activeTab : ""
            }`}
            onClick={() => setActiveTab("specs")}
          >
            Specifications
          </button>
        </div>

        <div className={styles.tabContent}>
          {activeTab === "description" && <p>{product.description}</p>}
          {activeTab === "specs" && <p>{product.specification}</p>}
        </div>
      </div>
    </>
  );
}
