"use client";

import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import styles from "@/style/home/topproducts.module.css";
import Link from "next/link";

export default function AllProductsPage() {
  const products = [
    { id: 1, name: "Gold Ring", img: "/assets/earings.jpg", weight: "4 gm", price: "₹8,999" },
    { id: 2, name: "Diamond Pendant", img: "/assets/earings.jpg", weight: "3 gm", price: "₹12,499" },
    { id: 3, name: "Men’s Bracelet", img: "/assets/earings.jpg", weight: "10 gm", price: "₹22,999" },
    { id: 4, name: "Gold Chain", img: "/assets/earings.jpg", weight: "8 gm", price: "₹17,999" },
    { id: 5, name: "Silver Anklet", img: "/assets/earings.jpg", weight: "6 gm", price: "₹2,499" },
    { id: 6, name: "Diamond Earrings", img: "/assets/earings.jpg", weight: "2 gm", price: "₹9,499" },
    { id: 7, name: "Ruby Ring", img: "/assets/earings.jpg", weight: "5 gm", price: "₹19,999" },
    { id: 8, name: "Pearl Necklace", img: "/assets/earings.jpg", weight: "12 gm", price: "₹25,499" },
    { id: 9, name: "Baby Kada", img: "/assets/earings.jpg", weight: "3 gm", price: "₹4,999" },
    { id: 10, name: "Gold Nosepin", img: "/assets/earings.jpg", weight: "1 gm", price: "₹1,799" },
    { id: 11, name: "Diamond Bracelet", img: "/assets/earings.jpg", weight: "7 gm", price: "₹29,999" },
    { id: 12, name: "Wedding Mangalsutra", img: "/assets/earings.jpg", weight: "15 gm", price: "₹32,999" }
  ];

  const addToCart = (product: any) => {
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");

    const existing = cart.find((item: any) => item.id === product.id);

    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ ...product, qty: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
    alert("Added to Cart!");
  };

  return (
    <>
      <Header />

      <div className={styles.container}>
        <h2 className={styles.title}>All Products</h2>

        <div className={styles.grid}>
          {products.map((p) => (
            <div key={p.id} className={styles.card}>
              <img src={p.img} className={styles.image} />
              <h3 className={styles.name}>{p.name}</h3>
              <p className={styles.weight}>Weight: {p.weight}</p>
              <p className={styles.price}>{p.price}</p>

              <div className={styles.buttonRow}>
                <button className={styles.cartBtn} onClick={() => addToCart(p)}>
                  Add to Cart
                </button>

                <Link href={`/products/${p.id}`} className={styles.detailsBtn}>
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}
