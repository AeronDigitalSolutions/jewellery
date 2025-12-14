"use client";

import { useEffect, useState } from "react";
import styles from "@/style/common/popup.module.css";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function Popup() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    // Prevent showing popup again
    const submitted = localStorage.getItem("popupSubmitted");
    if (submitted) return;

    const timer = setTimeout(() => {
      setOpen(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const closePopup = () => setOpen(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API}/api/popup-users/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.msg || "Something went wrong");
        setLoading(false);
        return;
      }

      alert("Details submitted successfully!");
      localStorage.setItem("popupSubmitted", "true");
      setOpen(false);
    } catch (error) {
      console.error(error);
      alert("Server error");
    }

    setLoading(false);
  };

  if (!open) return null;

  return (
    <>
      <div className={styles.overlay} onClick={closePopup}></div>

      <div className={styles.popup}>
        <span className={styles.close} onClick={closePopup}>×</span>

        <h2 className={styles.title}>Welcome to Jewellery</h2>
        <p className={styles.subtitle}>Please fill your details to continue</p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            required
            className={styles.input}
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            type="email"
            placeholder="Email Address"
            required
            className={styles.input}
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="tel"
            placeholder="Contact Number"
            required
            className={styles.input}
            value={form.phone}
            onChange={(e) =>
              setForm({ ...form, phone: e.target.value })
            }
          />

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Continue"}
          </button>
        </form>
      </div>
    </>
  );
}
