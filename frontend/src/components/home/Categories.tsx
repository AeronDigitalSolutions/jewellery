import styles from "../../style/home/categories.module.css";
import Link from "next/link";

const categories = [
  { name: "Rings", img: "/assets/ring.jpg" },
  { name: "Necklaces", img: "/assets/necklace.jpg" },
  { name: "Earrings", img: "/assets/ring.jpg" },
  { name: "Bracelets", img: "/assets/earings.jpg" },
  { name: "Pendants", img: "/assets/ring.jpg" },
  { name: "Bangles", img: "/assets/earings.jpg" },
  { name: "Bridal Sets", img: "/assets/necklace.jpg" },
  { name: "Men’s Jewellery", img: "/assets/earings.jpg" },
];

export default function Categories() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Shop by Categories</h2>

      <div className={styles.grid}>
        {categories.map((cat, index) => (
          <div key={index} className={styles.card}>
            <img src={cat.img} className={styles.image} />
            <p className={styles.name}>{cat.name}</p>
          </div>
        ))}
      </div>

      <Link href="/categories">
        <button className={styles.button}>View All Categories</button>
      </Link>
    </div>
  );
}
