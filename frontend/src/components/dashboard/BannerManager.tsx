"use client";

import { useEffect, useState } from "react";
import styles from "@/style/dashboard/banner.module.css";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function BannerManager() {
  const [image, setImage] = useState("");
  const [banners, setBanners] = useState([]);
  const [editId, setEditId] = useState<string | null>(null);

  const fetchBanners = async () => {
    const res = await fetch(`${API}/api/banners/all`);
    setBanners(await res.json());
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleImage = (e: any) => {
    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result as string);
    reader.readAsDataURL(e.target.files[0]);
  };

  const submit = async () => {
    const url = editId
      ? `${API}/api/banners/${editId}`
      : `${API}/api/banners/add`;

    const method = editId ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image }),
    });

    setImage("");
    setEditId(null);
    fetchBanners();
  };

  const del = async (id: string) => {
    if (!confirm("Delete banner?")) return;
    await fetch(`${API}/api/banners/${id}`, { method: "DELETE" });
    fetchBanners();
  };

  return (
    <div className={styles.wrapper}>
      <h2>Manage Banner Images</h2>

      <p className={styles.info}>
        Recommended size: <b>1920 × 600 px</b> | JPG / PNG | Max 300 KB
      </p>

      <input type="file" accept="image/*" onChange={handleImage} />
      {image && <img src={image} className={styles.preview} />}

      <button onClick={submit}>
        {editId ? "Update Banner" : "Add Banner"}
      </button>

      <div className={styles.list}>
        {banners.map((b: any) => (
          <div key={b._id} className={styles.item}>
            <img src={b.image} />
            <div>
              <button onClick={() => { setEditId(b._id); setImage(b.image); }}>
                Edit
              </button>
              <button onClick={() => del(b._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
