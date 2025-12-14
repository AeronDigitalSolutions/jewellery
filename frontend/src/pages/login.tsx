"use client";

import { useState } from "react";
import styles from "@/style/auth.module.css";
import Link from "next/link";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API}/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.msg);
        setLoading(false);
        return;
      }

      // Save token
      localStorage.setItem("token", data.token);

      alert("Login Successful!");

      // 🔥 Redirect to Dashboard
      window.location.href = "/dashboard";

    } catch (err) {
      console.error(err);
      alert("Server error");
    }

    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <form className={styles.card} onSubmit={handleLogin}>
        <h2 className={styles.title}>Welcome Back</h2>

        {/* EMAIL */}
        <label className={styles.label}>Email</label>
        <input
          type="email"
          className={styles.input}
          placeholder="Enter your email"
          value={form.email}
          required
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        {/* PASSWORD */}
        <label className={styles.label}>Password</label>
        <div className={styles.passwordBox}>
          <input
            type={showPassword ? "text" : "password"}
            className={styles.input}
            placeholder="Enter your password"
            value={form.password}
            required
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <span
            className={styles.eye}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "👁️" : "🙈"}
          </span>
        </div>

        <button type="submit" className={styles.button}>
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Change Password */}
        <p className={styles.footerText}>
          <Link href="/change-password" className={styles.link}>
            Change Password?
          </Link>
        </p>

        {/* Signup */}
        <p className={styles.footerText}>
          Don’t have an account?
          <Link href="/signup" className={styles.link}>
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}
