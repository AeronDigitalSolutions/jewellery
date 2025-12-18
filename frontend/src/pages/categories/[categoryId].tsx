import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import Link from "next/link";
import { IoShareSocial } from "react-icons/io5";
import styles from "@/style/home/productcat.module.css";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function CategoryProductsPage() {
  const router = useRouter();
  const { categoryId } = router.query;

  const [products, setProducts] = useState<any[]>([]);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    if (!categoryId) return;

    fetch(`${API}/api/products?category=${categoryId}`)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        if (data?.[0]?.category?.name) {
          setCategoryName(data[0].category.name);
        }
      });
  }, [categoryId]);

  const addToCart = (product: any) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = cart.find((i: any) => i._id === product._id);
    if (existing) existing.qty += 1;
    else cart.push({ ...product, qty: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const shareProduct = (product: any) => {
    const url = `${window.location.origin}/products/${product._id}`;
    if (navigator.share) navigator.share({ title: product.name, url });
    else {
      navigator.clipboard.writeText(url);
      alert("Product link copied!");
    }
  };

  return (
    <>
      <Header />

      <div className={styles.container}>
        <h2 className={styles.title}>
          {categoryName || "Category Products"}
        </h2>

        <div className={styles.grid}>
          {products.map(p => (
            <div key={p._id} className={styles.card}>
              
              {/* ✅ SHARE BUTTON */}
              <button
                className={styles.shareBtn}
                onClick={() => shareProduct(p)}
              >
                <IoShareSocial />
              </button>

              {/* ✅ IMAGE WRAPPER */}
              <div className={styles.imageWrapper}>
                <img src={p.images?.[0]} className={styles.image} />
              </div>

              <h3 className={styles.name}>{p.name}</h3>
              <p className={styles.weight}>Weight: {p.weight} gm</p>
              <p className={styles.price}>₹{Number(p?.totalPrice || 0).toLocaleString("en-IN")}</p>

              <div className={styles.buttonRow}>
                <button className={styles.cartBtn} onClick={() => addToCart(p)}>
                  Add to Cart
                </button>

                <Link href={`/products/${p._id}`} className={styles.detailsBtn}>
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}
