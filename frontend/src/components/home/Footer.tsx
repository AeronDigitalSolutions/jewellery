"use client";

import { useEffect, useState } from "react";
import styles from "@/style/home/footer.module.css";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function Footer() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch(`${API}/api/footer`)
      .then(res => res.json())
      .then(setData);
  }, []);

  return (
    <footer className={styles.footer}>
      {/* LEFT */}
      <div className={styles.left}>
        <h2 className={styles.logo}>Jwellery</h2>
        <p className={styles.desc}>
          Your trusted partner for premium jewellery collections.
        </p>
      </div>

      {/* CENTER */}
      <div className={styles.center}>
        <h3 className={styles.heading}>Quick Links</h3>
        <ul className={styles.links}>
          <li>Home</li>
          <li>About</li>
          <li>Categories</li>
          <li>Contact</li>
        </ul>
      </div>

      {/* RIGHT */}
      <div className={styles.right}>
        <h3 className={styles.heading}>Contact Us</h3>

        <p className={styles.info}>
          📍 {data?.address || "Loading..."}
        </p>
        <p className={styles.info}>
          📞 {data?.phone || ""}
        </p>
        <p className={styles.info}>
          📧 {data?.email || ""}
        </p>
      </div>
    </footer>
  );
}
