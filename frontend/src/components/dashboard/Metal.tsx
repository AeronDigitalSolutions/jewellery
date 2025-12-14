"use client";

import { useState, useEffect } from "react";
import styles from "@/style/dashboard/metal.module.css";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function AddMetal() {
  const [form, setForm] = useState({ name: "", price: "", perGram: "" });
  const [metals, setMetals] = useState([]);

  const [editId, setEditId] = useState<string | null>(null);

  const fetchMetals = async () => {
    const res = await fetch(`${API}/api/metals`);
    const data = await res.json();
    setMetals(data);
  };

  useEffect(() => {
    fetchMetals();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (editId) {
      // UPDATE METAL
      const res = await fetch(`${API}/api/metals/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          price: Number(form.price),
          perGram: Number(form.perGram),
        }),
      });

      const data = await res.json();
      alert(data.msg);
      setEditId(null);
    } else {
      // ADD NEW METAL
      const res = await fetch(`${API}/api/metals/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          price: Number(form.price),
          perGram: Number(form.perGram),
        }),
      });

      const data = await res.json();
      alert(data.msg);
    }

    setForm({ name: "", price: "", perGram: "" });
    fetchMetals();
  };

  const handleEdit = (m: any) => {
    setEditId(m._id);
    setForm({
      name: m.name,
      price: m.price.toString(),
      perGram: m.perGram.toString(),
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete?")) return;

    const res = await fetch(`${API}/api/metals/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    alert(data.msg);

    fetchMetals();
  };

  return (
    <div className={styles.wrapper}>
      
      {/* ADD / EDIT FORM */}
      <div className={styles.card}>
        <h2 className={styles.title}>
          {editId ? "Edit Metal" : "Add Metal"}
        </h2>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Metal Name"
            value={form.name}
            required
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            type="number"
            placeholder="Metal Price"
            value={form.price}
            required
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />

          <input
            type="number"
            placeholder="Gram"
            value={form.perGram}
            required
            onChange={(e) => setForm({ ...form, perGram: e.target.value })}
          />

          <button type="submit">
            {editId ? "Update Metal" : "Add Metal"}
          </button>

          {editId && (
            <button
              type="button"
              onClick={() => {
                setEditId(null);
                setForm({ name: "", price: "", perGram: "" });
              }}
              className={styles.cancelBtn}
            >
              Cancel Edit
            </button>
          )}
        </form>
      </div>

      {/* METAL LIST */}
      <div className={styles.listCard}>
        <h3 className={styles.listTitle}>Metal List</h3>

        {metals.length === 0 && <p>No metals added yet.</p>}

        {metals.map((m: any, index: number) => (
          <div key={index} className={styles.listItem}>
            <span>{m.name}</span>
            <span>₹{m.price}</span>
            <span>{m.perGram} /gm</span>

            <div className={styles.actions}>
              <button onClick={() => handleEdit(m)} className={styles.editBtn}>
                Edit
              </button>

              <button
                onClick={() => handleDelete(m._id)}
                className={styles.deleteBtn}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
