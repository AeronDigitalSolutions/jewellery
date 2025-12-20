"use client";

import { useState, useEffect } from "react";
import styles from "@/style/dashboard/addproduct.module.css";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface Category {
  _id: string;
  name: string;
}

interface Metal {
  _id: string;
  name: string;
  price: number;
}

export default function AddProduct() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [metals, setMetals] = useState<Metal[]>([]);
  const [imageError, setImageError] = useState("");

  const [form, setForm] = useState({
    name: "",
    category: "",
    metalId: "",
    metalPrice: 0,
    weight: "",

    makingType: "PERCENT",
    makingValue: "",

    wastageType: "PERCENT",
    wastageValue: "",

    totalPrice: 0,
    description: "",
    specification: "",
    images: [] as string[],
  });

  /* ================= FETCH ================= */
  useEffect(() => {
    fetch(`${API}/api/categories`)
      .then(res => res.json())
      .then(setCategories);

    fetch(`${API}/api/metals`)
      .then(res => res.json())
      .then(setMetals);
  }, []);

  /* ================= CALC ================= */
  const calculateTotal = (
    metalPrice: number,
    weight: number,
    makingType: string,
    makingValue: number,
    wastageType: string,
    wastageValue: number
  ) => {
    const base = metalPrice * weight;

    const making =
      makingType === "PERCENT"
        ? (base * makingValue) / 100
        : makingValue;

    const wastage =
      wastageType === "PERCENT"
        ? (base * wastageValue) / 100
        : wastageValue;

    return Math.round(base + making + wastage);
  };

  const recalc = (data = form) => {
    if (!data.metalPrice || !data.weight) return 0;

    return calculateTotal(
      data.metalPrice,
      Number(data.weight),
      data.makingType,
      Number(data.makingValue || 0),
      data.wastageType,
      Number(data.wastageValue || 0)
    );
  };

  /* ================= METAL ================= */
  const handleMetalChange = (metalId: string) => {
    const metal = metals.find(m => m._id === metalId);
    if (!metal) return;

    const updated = {
      ...form,
      metalId,
      metalPrice: metal.price,
    };

    setForm({
      ...updated,
      totalPrice: recalc(updated),
    });
  };

  /* ================= IMAGES (1:1 VALIDATION) ================= */
  const handleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImageError("");

    files.forEach(file => {
      const reader = new FileReader();

      reader.onload = () => {
        const img = new Image();
        img.src = reader.result as string;

        img.onload = () => {
          if (img.width !== img.height) {
            setImageError("❌ Only 1:1 (square) images are allowed");
            return;
          }

          setForm(prev => ({
            ...prev,
            images: [...prev.images, reader.result as string],
          }));
        };
      };

      reader.readAsDataURL(file);
    });

    e.target.value = "";
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const payload = {
      name: form.name,
      category: form.category,
      metalId: form.metalId,
      metalPrice: form.metalPrice,
      weight: Number(form.weight),

      makingType: form.makingType,
      makingValue: Number(form.makingValue || 0),

      wastageType: form.wastageType,
      wastageValue: Number(form.wastageValue || 0),

      description: form.description,
      specification: form.specification,
      images: form.images,
    };

    const res = await fetch(`${API}/api/products/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.msg || "Failed to add product");
      return;
    }

    alert("Product added successfully!");

    setForm({
      name: "",
      category: "",
      metalId: "",
      metalPrice: 0,
      weight: "",
      makingType: "PERCENT",
      makingValue: "",
      wastageType: "PERCENT",
      wastageValue: "",
      totalPrice: 0,
      description: "",
      specification: "",
      images: [],
    });
  };

  /* ================= UI ================= */
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Add Product</h3>

      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          placeholder="Product Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          required
        />

        <select
          value={form.category}
          onChange={e => setForm({ ...form, category: e.target.value })}
          required
        >
          <option value="">Select Category</option>
          {categories.map(c => (
            <option key={c._id} value={c._id}>{c.name}</option>
          ))}
        </select>

        <select
          value={form.metalId}
          onChange={e => handleMetalChange(e.target.value)}
          required
        >
          <option value="">Select Metal</option>
          {metals.map(m => (
            <option key={m._id} value={m._id}>
              {m.name} (₹{m.price}/gm)
            </option>
          ))}
        </select>

        <input readOnly value={form.metalPrice} />

        <input
          type="number"
          placeholder="Weight (gm)"
          value={form.weight}
          onChange={e => {
            const updated = { ...form, weight: e.target.value };
            setForm({ ...updated, totalPrice: recalc(updated) });
          }}
          required
        />

        {/* WASTAGE */}
        <div className={styles.row}>
          <select
            value={form.wastageType}
            onChange={e => {
              const updated = { ...form, wastageType: e.target.value };
              setForm({ ...updated, totalPrice: recalc(updated) });
            }}
          >
            <option value="PERCENT">Wastage %</option>
            <option value="AMOUNT">Wastage ₹</option>
          </select>

          <input
            type="number"
            placeholder="Wastage"
            value={form.wastageValue}
            onChange={e => {
              const updated = { ...form, wastageValue: e.target.value };
              setForm({ ...updated, totalPrice: recalc(updated) });
            }}
          />
        </div>

        {/* MAKING */}
        <div className={styles.row}>
          <select
            value={form.makingType}
            onChange={e => {
              const updated = { ...form, makingType: e.target.value };
              setForm({ ...updated, totalPrice: recalc(updated) });
            }}
          >
            <option value="PERCENT">Making %</option>
            <option value="AMOUNT">Making ₹</option>
          </select>

          <input
            type="number"
            placeholder="Making Charge"
            value={form.makingValue}
            onChange={e => {
              const updated = { ...form, makingValue: e.target.value };
              setForm({ ...updated, totalPrice: recalc(updated) });
            }}
          />
        </div>

        <input
          readOnly
          value={`₹ ${form.totalPrice}`}
          className={styles.totalPrice}
        />

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
        />

        <textarea
          placeholder="Specification"
          value={form.specification}
          onChange={e => setForm({ ...form, specification: e.target.value })}
        />

        <input type="file" multiple accept="image/*" onChange={handleImages} />

        {imageError && (
          <p className={styles.imageError}>{imageError}</p>
        )}

        <div className={styles.previewBox}>
          {form.images.map((img, i) => (
            <img key={i} src={img} className={styles.preview} />
          ))}
        </div>

        <button className={styles.submitBtn}>Add Product</button>
      </form>
    </div>
  );
}
