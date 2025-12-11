"use client";

import { useEffect, useState } from "react";
import styles from "@/style/common/popup.module.css";

export default function Popup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // SHOW POPUP AFTER 5 SECONDS
    const timer = setTimeout(() => {
      setOpen(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const closePopup = () => setOpen(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    alert("Details Submitted!");
    setOpen(false);
  };

  if (!open) return null;

  return (
    <>
      <div className={styles.overlay} onClick={closePopup}></div>

      <div className={styles.popup}>
        <span className={styles.close} onClick={closePopup}>×</span>

        <h2 className={styles.title}>Welcome to Jwellery</h2>
        <p className={styles.subtitle}>Please fill your details to continue</p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input type="text" placeholder="Full Name" required className={styles.input} />
          <input type="email" placeholder="Email Address" required className={styles.input} />
          <input type="tel" placeholder="Contact Number" required className={styles.input} />

          <button type="submit" className={styles.submitBtn}>
            Continue
          </button>
        </form>
      </div>
    </>
  );
}
