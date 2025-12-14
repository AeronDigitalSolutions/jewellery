"use client";

import { useEffect, useState } from "react";
import styles from "@/style/home/header.module.css";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const [cartCount, setCartCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  /* ================= CART SYNC ================= */
  const syncCartCount = () => {
    try {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const count = cart.reduce(
        (sum: number, item: any) => sum + (item.qty || 0),
        0
      );
      setCartCount(count);
    } catch {
      setCartCount(0);
    }
  };

  useEffect(() => {
    syncCartCount();
    window.addEventListener("cartUpdated", syncCartCount);
    return () =>
      window.removeEventListener("cartUpdated", syncCartCount);
  }, []);

  /* ================= ACTIVE LINK ================= */
  const isActive = (path: string) => pathname === path;

  return (
    <>
      <nav className={styles.navbar}>
        {/* LOGO */}
        <div
          className={styles.left}
          onClick={() => router.push("/")}
          style={{ cursor: "pointer" }}
        >
          <img src="/assets/logo.png" className={styles.logoImg} />
        </div>

        {/* MENU */}
        <ul className={styles.menu}>
          <li>
            <Link
              href="/"
              className={isActive("/") ? styles.active : ""}
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              href="/categories"
              className={isActive("/categories") ? styles.active : ""}
            >
              Categories
            </Link>
          </li>

          <li>
            <Link
              href="/products"
              className={isActive("/products") ? styles.active : ""}
            >
              Products
            </Link>
          </li>
        </ul>

        {/* RIGHT */}
        <div className={styles.right}>
          {/* SIGN IN */}
          <button
            className={styles.signInBtn}
            onClick={() => router.push("/login")}
          >
            Sign In
          </button>

          {/* CART */}
          <Link href="/cart" className={styles.cartBox}>
            <span className={styles.cartIcon}>Cart 🛍️</span>
            {cartCount > 0 && (
              <span className={styles.badge}>{cartCount}</span>
            )}
          </Link>

          {/* MOBILE HAMBURGER */}
          <div
            className={styles.hamburger}
            onClick={() => setMenuOpen(true)}
          >
            ☰
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <>
          <div
            className={styles.overlay}
            onClick={() => setMenuOpen(false)}
          />

          <div className={styles.mobileMenu}>
            <span
              className={styles.closeBtn}
              onClick={() => setMenuOpen(false)}
            >
              ×
            </span>

            <Link href="/" onClick={() => setMenuOpen(false)}>
              Home
            </Link>

            <Link href="/categories" onClick={() => setMenuOpen(false)}>
              Categories
            </Link>

            <Link href="/products" onClick={() => setMenuOpen(false)}>
              Products
            </Link>

            <button
              className={styles.signInMobile}
              onClick={() => {
                setMenuOpen(false);
                router.push("/login");
              }}
            >
              Sign In
            </button>
          </div>
        </>
      )}
    </>
  );
}
