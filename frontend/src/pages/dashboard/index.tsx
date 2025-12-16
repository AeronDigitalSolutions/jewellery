"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/style/dashboard.module.css";

import AddMetal from "@/components/dashboard/Metal";
import AddCategory from "@/components/dashboard/AddCategory";
import AddProduct from "@/components/dashboard/AddProduct";
import CategoryList from "@/components/dashboard/CategoryList";
import ProductList from "@/components/dashboard/ProductList";
import UserList from "@/components/dashboard/UserList";
import BannerManager from "@/components/dashboard/BannerManager";
import FooterManager from "@/components/dashboard/FooterManager";
import TopProductsAdmin from "@/components/dashboard/TopProductsAdmin";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function Dashboard() {
  const router = useRouter();
  const [active, setActive] = useState<number>(-1);

  // 📊 DASHBOARD STATS (NO USERS)
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
  });

  const handleLogout = () => {
  localStorage.removeItem("token");
  router.replace("/login");
};


  // 🔐 AUTH CHECK
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first!");
      router.push("/login");
    }
  }, [router]);

  // 📊 FETCH DASHBOARD DATA
  useEffect(() => {
    const loadStats = async () => {
      try {
        const [products, categories] = await Promise.all([
          fetch(`${API}/api/products`).then(res => res.json()),
          fetch(`${API}/api/categories`).then(res => res.json()),
        ]);

        setStats({
          products: products.length || 0,
          categories: categories.length || 0,
        });
      } catch (err) {
        console.error("Dashboard stats error:", err);
      }
    };

    loadStats();
  }, []);

  // 📌 SIDEBAR MENU
  const menu = [
    { name: "Dashboard", id: -1 },
    { name: "Add Metal", id: 0 },
    { name: "Add Category", id: 1 },
    { name: "Add Product", id: 2 },
    { name: "Category List", id: 3 },
    { name: "Product List", id: 4 },
    { name: "User List", id: 5 },
    { name: "Banner Images", id: 6 },
    { name: "Footer Settings", id: 7 },
    { name: "Top Products", id: 8 },
  ];

  // 🏠 DASHBOARD HOME
  const renderDashboardHome = () => (
    <>
      <h1 className={styles.pageHeader}>Admin Dashboard</h1>
      <p className={styles.subHeader}>
        Welcome to your jewellery management panel
      </p>

      {/* 📊 STATS */}
      <div className={styles.cardsRow}>
        <div className={styles.cardBox}>
          <p className={styles.cardTitle}>Total Products</p>
          <p className={styles.cardValue}>{stats.products}</p>
        </div>

        <div className={styles.cardBox}>
          <p className={styles.cardTitle}>Categories</p>
          <p className={styles.cardValue}>{stats.categories}</p>
        </div>
      </div>
    </>
  );

  // 🔄 CONTENT SWITCH
  const renderComponent = () => {
    switch (active) {
      case -1:
        return renderDashboardHome();
      case 0:
        return <AddMetal />;
      case 1:
        return <AddCategory />;
      case 2:
        return <AddProduct />;
      case 3:
        return <CategoryList />;
      case 4:
        return <ProductList />;
      case 5:
        return <UserList />;
      case 6:
        return <BannerManager />;
      case 7:
        return <FooterManager />;
      case 8:
        return <TopProductsAdmin />;
      default:
        return renderDashboardHome();
    }
  };

  return (
    <div className={styles.wrapper}>
      {/* SIDEBAR */}
      {/* SIDEBAR */}
<div className={styles.sidebar}>
  <h2 className={styles.sidebarTitle}>Admin Panel</h2>

  {menu.map(item => (
    <div
      key={item.id}
      className={`${styles.menuItem} ${
        active === item.id ? styles.active : ""
      }`}
      onClick={() => setActive(item.id)}
    >
      {item.name}
    </div>
  ))}

  {/* LOGOUT BUTTON */}
  <button
    className={styles.logoutBtn}
    onClick={handleLogout}
  >
    Logout
  </button>
</div>


      {/* MAIN CONTENT */}
      <div className={styles.content}>{renderComponent()}</div>
    </div>
  );
}
