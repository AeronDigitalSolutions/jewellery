"use client";

import { useState } from "react";
import styles from "@/style/signup.module.css";
import { useRouter } from "next/router";

export default function Signup() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      const res = await fetch("http://localhost:5000/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!res.ok) {
        setMsg(data.msg || "Signup failed");
        setLoading(false);
        return;
      }

      setMsg("Signup Successful! Redirecting to Login...");
      setTimeout(() => router.push("/login"), 1500);
    } catch (err) {
      setMsg("Server Error");
    }

    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <form className={styles.card} onSubmit={handleSignup}>
        <h2 className={styles.title}>Create Account</h2>

        {msg && <p className={styles.msg}>{msg}</p>}

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className={styles.input}
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          className={styles.input}
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className={styles.input}
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? "Signing Up..." : "Sign Up"}
        </button>

        <p className={styles.switch}>
          Already have an account? <span onClick={() => router.push("/login")}>Login</span>
        </p>
      </form>
    </div>
  );
}
