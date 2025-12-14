"use client";

import { useEffect, useState } from "react";
import styles from "@/style/dashboard/topproductsadmin.module.css";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function TopProductsAdmin() {
  const [products, setProducts] = useState<any[]>([]);
  const [slots, setSlots] = useState<any[]>([]);

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

    fetchSlots();
  };

  const remove = async (slot: number) => {
    await fetch(`${API}/api/top-products/${slot}`, {
      method: "DELETE",
    });

    fetchSlots();
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Top Products (8 Slots)</h2>

      <div className={styles.grid}>
        {Array.from({ length: 8 }).map((_, i) => {
          const slotNo = i + 1;
          const filled = slots.find(s => s.slot === slotNo);

          return (
            <div key={slotNo} className={styles.slot}>
              <p className={styles.slotTitle}>Slot {slotNo}</p>

              {filled ? (
                <>
                  <img
                    src={filled.productId.images?.[0]}
                    className={styles.image}
                  />
                  <p>{filled.productId.name}</p>

                  <button
                    className={styles.removeBtn}
                    onClick={() => remove(slotNo)}
                  >
                    Remove
                  </button>
                </>
              ) : (
                <select
                  onChange={(e) =>
                    assign(slotNo, e.target.value)
                  }
                  defaultValue=""
                >
                  <option value="">Select product</option>
                  {products.map(p => (
                    <option key={p._id} value={p._id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
