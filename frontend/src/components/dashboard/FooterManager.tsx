"use client";

import { useEffect, useState } from "react";
import styles from "@/style/dashboard/footermanager.module.css";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function FooterManager() {
  const [form, setForm] = useState({
    address: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    fetch(`${API}/api/footer`)
      .then(res => res.json())
      .then(data => {
        if (data) setForm(data);
      });
  }, []);

  const submit = async (e: any) => {
    e.preventDefault();

    const res = await fetch(`${API}/api/footer/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    alert(data.msg);
  };

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Footer Contact Settings</h3>

      <form className={styles.form} onSubmit={submit}>
        <textarea
  className={styles.textarea}
  placeholder="Address"
  value={form.address}
  onChange={(e) => setForm({ ...form, address: e.target.value })}
  required
/>

<input
  className={styles.input}
  type="text"
  placeholder="Phone Number"
  value={form.phone}
  onChange={(e) => setForm({ ...form, phone: e.target.value })}
  required
/>

<input
  className={styles.input}
  type="email"
  placeholder="Email Address"
  value={form.email}
  onChange={(e) => setForm({ ...form, email: e.target.value })}
  required
/>

<button type="submit" className={styles.submitBtn}>
  Save Footer Info
</button>

      </form>
    </div>
  );
}
