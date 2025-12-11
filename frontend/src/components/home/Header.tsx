"use client";

import { useEffect, useState } from "react";
import styles from "@/style/home/header.module.css";
import Link from "next/link";

export default function Header() {
  const [cartCount, setCartCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartCount(cart.reduce((sum: number, item: any) => sum + item.qty, 0));

    const updateCart = () => {
      const updatedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartCount(updatedCart.reduce((sum: number, item: any) => sum + item.qty, 0));
    };

    window.addEventListener("cartUpdated", updateCart);
    return () => window.removeEventListener("cartUpdated", updateCart);
  }, []);

  return (
    <>
      <nav className={styles.navbar}>
        
        {/* LOGO */}
        <div className={styles.left}>
          <img src="/assets/logo.png" className={styles.logoImg} />
          <span className={styles.logoText}>Jwellery</span>
        </div>

        {/* MENU */}
        <ul className={styles.menu}>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/categories">Categories</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>

        {/* RIGHT */}
        <div className={styles.right}>
          <button className={styles.signInBtn}>Sign In</button>

          <Link href="/cart" className={styles.cartBox}>
            <span className={styles.cartIcon}>🛍️</span>
            {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
          </Link>

          <div className={styles.hamburger} onClick={() => setMenuOpen(true)}>☰</div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <>
          <div className={styles.overlay} onClick={() => setMenuOpen(false)}></div>

          <div className={styles.mobileMenu}>
            <span className={styles.closeBtn} onClick={() => setMenuOpen(false)}>×</span>

            <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link href="/about" onClick={() => setMenuOpen(false)}>About</Link>
            <Link href="/categories" onClick={() => setMenuOpen(false)}>Categories</Link>
            <Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>

            <button className={styles.signInMobile}>Sign In</button>
          </div>
        </>
      )}
    </>
  );
}
