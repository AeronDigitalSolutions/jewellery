"use client";

import { useEffect, useState } from "react";
import styles from "@/style/cart.module.css";
import Link from "next/link";

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(stored);
  }, []);

  const updateCart = (updated: any[]) => {
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const increaseQty = (id: string) => {
    const updated = cart.map((item) =>
      item._id === id ? { ...item, qty: item.qty + 1 } : item
    );
    updateCart(updated);
  };

  const decreaseQty = (id: string) => {
    const updated = cart
      .map((item) =>
        item._id === id ? { ...item, qty: item.qty - 1 } : item
      )
      .filter((item) => item.qty > 0);
    updateCart(updated);
  };

  const removeItem = (id: string) => {
    if (!confirm("Remove item from cart?")) return;
    updateCart(cart.filter((item) => item._id !== id));
  };

  /* ================= TOTALS ================= */
  const subTotal = cart.reduce(
    (sum, item) => sum + item.totalPrice * item.qty,
    0
  );

  const gstAmount = Math.round(subTotal * 0.03); // 3% GST
  const grandTotal = subTotal + gstAmount;

  const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className={styles.empty}>
          <p>Your cart is empty 🛒</p>
          <Link href="/">Continue Shopping</Link>
        </div>
      ) : (
        <>
          {/* CART ITEMS */}
          <div className={styles.list}>
            {cart.map((item) => (
              <div key={item._id} className={styles.card}>
                <img
                  src={item.images?.[0]}
                  className={styles.image}
                  alt={item.name}
                />

                <div className={styles.info}>
                  <h3>{item.name}</h3>
                  <p>Weight: {item.weight} gm</p>

                  <p className={styles.price}>
                    ₹{item.totalPrice.toLocaleString("en-IN")}
                  </p>

                  <div className={styles.qtyRow}>
                    <button onClick={() => decreaseQty(item._id)}>-</button>
                    <span>{item.qty}</span>
                    <button onClick={() => increaseQty(item._id)}>+</button>
                  </div>

                  <button
                    className={styles.removeBtn}
                    onClick={() => removeItem(item._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* SUMMARY */}
          <div className={styles.summary}>
            <div className={styles.summaryRow}>
              <span>Total Items</span>
              <b>{totalItems}</b>
            </div>

            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span>₹{subTotal.toLocaleString("en-IN")}</span>
            </div>

            <div className={styles.summaryRow}>
              <span>GST (3%)</span>
              <span>₹{gstAmount.toLocaleString("en-IN")}</span>
            </div>

            <div className={`${styles.summaryRow} ${styles.grandTotal}`}>
              <span>Total Payable</span>
              <span>₹{grandTotal.toLocaleString("en-IN")}</span>
            </div>

            <button className={styles.checkoutBtn}>
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
