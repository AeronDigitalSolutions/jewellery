"use client";

import { useState } from "react";
import styles from "@/style/auth.module.css";

export default function ChangePassword() {
  const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  const [email, setEmail] = useState("");
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = async (e: any) => {
    e.preventDefault();

    if (!email) {
      return alert("Email is required");
    }

    if (newPass !== confirmPass) {
      return alert("New password and confirm password must match!");
    }

    setLoading(true);

    try {
      const res = await fetch(`${API}/api/users/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          email,
          oldPass,
          newPass,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setLoading(false);
        return alert(data.msg);
      }

      alert("Password updated successfully!");
      window.location.href = "/login";
    } catch (err) {
      console.error(err);
      alert("Server error");
    }

    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <form className={styles.card} onSubmit={handleChange}>
        <h2 className={styles.title}>Change Password</h2>

        {/* EMAIL */}
        <label className={styles.label}>Email</label>
        <input
          type="email"
          className={styles.input}
          placeholder="Enter your registered email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* OLD PASSWORD */}
        <label className={styles.label}>Old Password</label>
        <div className={styles.passwordBox}>
          <input
            type={showOld ? "text" : "password"}
            className={styles.input}
            value={oldPass}
            required
            onChange={(e) => setOldPass(e.target.value)}
          />
          <span className={styles.eye} onClick={() => setShowOld(!showOld)}>
            {showOld ? "👁️" : "🙈"}
          </span>
        </div>

        {/* NEW PASSWORD */}
        <label className={styles.label}>New Password</label>
        <div className={styles.passwordBox}>
          <input
            type={showNew ? "text" : "password"}
            className={styles.input}
            value={newPass}
            required
            onChange={(e) => setNewPass(e.target.value)}
          />
          <span className={styles.eye} onClick={() => setShowNew(!showNew)}>
            {showNew ? "👁️" : "🙈"}
          </span>
        </div>

        {/* CONFIRM PASSWORD */}
        <label className={styles.label}>Confirm New Password</label>
        <input
          type="password"
          className={styles.input}
          value={confirmPass}
          required
          onChange={(e) => setConfirmPass(e.target.value)}
        />

        <button className={styles.button} disabled={loading}>
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
}
