import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "@/style/productdetail.module.css";

const allProducts = [
  { id: 1, name: "Gold Ring", img: "/assets/earings.jpg", weight: "4 gm", price: "₹8,999" },
  { id: 2, name: "Diamond Pendant", img: "/assets/earings.jpg", weight: "3 gm", price: "₹12,499" },
  { id: 3, name: "Men’s Bracelet", img: "/assets/earings.jpg", weight: "10 gm", price: "₹22,999" },
  { id: 4, name: "Gold Chain", img: "/assets/earings.jpg", weight: "8 gm", price: "₹17,999" },
  { id: 5, name: "Silver Anklet", img: "/assets/earings.jpg", weight: "6 gm", price: "₹2,499" },
  { id: 6, name: "Diamond Earrings", img: "/assets/earings.jpg", weight: "2 gm", price: "₹9,499" },
  { id: 7, name: "Ruby Ring", img: "/assets/earings.jpg", weight: "5 gm", price: "₹19,999" },
  { id: 8, name: "Pearl Necklace", img: "/assets/earings.jpg", weight: "12 gm", price: "₹25,499" },
  { id: 9, name: "Baby Kada", img: "/assets/earings.jpg", weight: "3 gm", price: "₹4,999" },
  { id: 10, name: "Gold Nosepin", img: "/assets/earings.jpg", weight: "1 gm", price: "₹1,799" },
  { id: 11, name: "Diamond Bracelet", img: "/assets/earings.jpg", weight: "7 gm", price: "₹29,999" },
  { id: 12, name: "Wedding Mangalsutra", img: "/assets/earings.jpg", weight: "15 gm", price: "₹32,999" }
];

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [qty, setQty] = useState(1);
  const [product, setProduct] = useState<any>(null);
  const [mainImage, setMainImage] = useState("");

  const [activeTab, setActiveTab] = useState("description");

  const thumbnails = [
    "/assets/earings.jpg",
    "/assets/earings.jpg",
    "/assets/earings.jpg",
    "/assets/earings.jpg"
  ];

  useEffect(() => {
    if (id) {
      const found = allProducts.find((p) => p.id === Number(id));
      setProduct(found);
      setMainImage(found?.img || "");
    }
  }, [id]);

  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");

    const existing = cart.find((item: any) => item.id === product.id);

    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({ ...product, qty });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart!");
  };

  if (!product) return <h2>Loading...</h2>;

  return (
    <>
      <div className={styles.container}>

        {/* Thumbnails */}
        <div className={styles.thumbnailColumn}>
          {thumbnails.map((img, i) => (
            <img
              key={i}
              src={img}
              className={styles.thumbnail}
              onClick={() => setMainImage(img)}
            />
          ))}
        </div>

        {/* Main Image */}
        <div className={styles.mainImageWrapper}>
          <img src={mainImage} className={styles.mainImage} />
        </div>

        {/* Product Info */}
        <div className={styles.info}>
          <h1 className={styles.name}>{product.name}</h1>
          <p className={styles.price}>{product.price}</p>
          <p className={styles.weight}>Weight: {product.weight}</p>

          <p className={styles.delivery}>
            Delivery: <strong>Tomorrow, {new Date().getDate() + 1}</strong>
          </p>

          <div className={styles.qtyRow}>
            <button onClick={() => setQty(qty > 1 ? qty - 1 : 1)}>-</button>
            <span>{qty}</span>
            <button onClick={() => setQty(qty + 1)}>+</button>
          </div>

          <button className={styles.addButton} onClick={addToCart}>
            Add to Cart
          </button>
        </div>
      </div>

      {/* Tabs Section */}
      <div className={styles.tabsContainer}>
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === "description" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("description")}
          >
            Description
          </button>

          <button
            className={`${styles.tab} ${activeTab === "specs" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("specs")}
          >
            Specifications
          </button>
        </div>

        <div className={styles.tabContent}>
          {activeTab === "description" && (
            <p>
              This elegant jewellery piece is handcrafted using high-quality materials.
              Designed for weddings, parties, gifting, and daily luxury wear.  
              Hypoallergenic, skin-safe, long-lasting polish.
            </p>
          )}

          {activeTab === "specs" && (
            <ul>
              <li>Material: Gold Plated Premium Alloy</li>
              <li>Weight: {product.weight}</li>
              <li>Polish: Long-lasting, anti-tarnish</li>
              <li>Warranty: 6 Months Shine Warranty</li>
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
