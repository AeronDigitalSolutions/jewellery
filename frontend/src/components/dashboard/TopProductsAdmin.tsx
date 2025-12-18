"use client";

import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import styles from "@/style/dashboard/topproductsadmin.module.css";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function TopProductsAdmin() {
  const [products, setProducts] = useState<any[]>([]);
  const [slots, setSlots] = useState<any[]>([]);
  const [activeSlot, setActiveSlot] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(`${API}/api/products`)
      .then(res => res.json())
      .then(setProducts);

    fetchSlots();
  }, []);

  const fetchSlots = () => {
    fetch(`${API}/api/top-products`)
      .then(res => res.json())
      .then(setSlots);
  };

  const assign = async (slot: number, productId: string) => {
    await fetch(`${API}/api/top-products/assign`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slot, productId }),
    });

    setActiveSlot(null);
    setSearch("");
    fetchSlots();
  };

  const remove = async (slot: number) => {
    await fetch(`${API}/api/top-products/${slot}`, { method: "DELETE" });
    fetchSlots();
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Top Products (8 Slots)</h2>

      <div className={styles.grid}>
        {Array.from({ length: 8 }).map((_, i) => {
          const slotNo = i + 1;
          const filled = slots.find(s => s.slot === slotNo);

          return (
            <div key={slotNo} className={styles.slotCard}>
              <p className={styles.slotTitle}>Slot {slotNo}</p>

              {filled ? (
                <>
                  <img
                    src={filled.productId.images?.[0]}
                    className={styles.image}
                    alt={filled.productId.name}
                  />
                  <p className={styles.name}>{filled.productId.name}</p>

                  <button
                    className={styles.removeBtn}
                    onClick={() => remove(slotNo)}
                  >
                    Remove
                  </button>
                </>
              ) : (
                <button
                  className={styles.addBtn}
                  onClick={() => setActiveSlot(slotNo)}
                >
                  Select Product
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* 🔍 SEARCH MODAL */}
      {activeSlot && (
        <div className={styles.modal}>
          <div className={styles.modalCard}>
            {/* HEADER */}
            <div className={styles.modalHeader}>
              <h3>Select Product for Slot {activeSlot}</h3>
              <button
                className={styles.closeIcon}
                onClick={() => setActiveSlot(null)}
              >
                <IoClose />
              </button>
            </div>

            <input
              type="text"
              placeholder="Search product..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className={styles.searchInput}
            />

            <div className={styles.productList}>
              {filteredProducts.length ? (
                filteredProducts.map(p => (
                  <div
                    key={p._id}
                    className={styles.productItem}
                    onClick={() => assign(activeSlot, p._id)}
                  >
                    <img src={p.images?.[0]} alt={p.name} />
                    <span>{p.name}</span>
                  </div>
                ))
              ) : (
                <p className={styles.empty}>No products found</p>
              )}
            </div>

            <button
              className={styles.cancelBtn}
              onClick={() => setActiveSlot(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
