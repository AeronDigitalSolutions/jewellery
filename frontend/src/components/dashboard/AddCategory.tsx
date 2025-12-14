"use client";

import { useState } from "react";
import styles from "@/style/dashboard/addcategory.module.css";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function AddCategory() {
  const [form, setForm] = useState({
    name: "",
    image: "",
    metalType: "",
  });

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setForm({ ...form, image: reader.result as string });
    };

    if (file) reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await fetch(`${API}/api/categories/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    alert(data.msg);

    setForm({ name: "", image: "", metalType: "" });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h2 className={styles.title}>Add New Category</h2>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Category Name"
            value={form.name}
            required
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          {/* ✅ METAL TYPE DROPDOWN */}
          <select
            value={form.metalType}
            required
            onChange={(e) =>
              setForm({ ...form, metalType: e.target.value })
            }
          >
            <option value="">Select Metal Type</option>
            <option value="Gold">Gold</option>
            <option value="Silver">Silver</option>
          </select>

          <input type="file" accept="image/*" onChange={handleImageChange} />

          {form.image && <img src={form.image} className={styles.preview} />}

          <button type="submit">Add Category</button>
        </form>
      </div>
    </div>
  );
}
