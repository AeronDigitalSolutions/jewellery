import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import styles from "@/style/categories.module.css";

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
    <>
      <Header />

      <div className={styles.container}>
        <h1 className={styles.title}>All Categories</h1>

        <div className={styles.grid}>
          {categories.map((cat, index) => (
            <div key={index} className={styles.card}>
              <img src={cat.img} className={styles.image} />
              <p className={styles.name}>{cat.name}</p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}
