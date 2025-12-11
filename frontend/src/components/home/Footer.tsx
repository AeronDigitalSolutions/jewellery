import styles from "@/style/home/footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>

      {/* LEFT SECTION */}
      <div className={styles.left}>
        <h2 className={styles.logo}>Jwellery</h2>
        <p className={styles.desc}>
          Your trusted partner for premium jewellery collections.  
          We craft elegance with passion and deliver timeless beauty.
        </p>
      </div>

      {/* CENTER LINKS */}
      <div className={styles.center}>
        <h3 className={styles.heading}>Quick Links</h3>

        <ul className={styles.links}>
          <li>Home</li>
          <li>About Us</li>
          <li>Categories</li>
          <li>Top Products</li>
          <li>Contact</li>
          <li>Terms & Conditions</li>
        </ul>
      </div>

      {/* RIGHT CONTACT DETAILS */}
      <div className={styles.right}>
        <h3 className={styles.heading}>Contact Us</h3>

        <p className={styles.info}>📍 123 Gold Street, Jaipur, India</p>
        <p className={styles.info}>📞 +91 98765 43210</p>
        <p className={styles.info}>📧 support@jwellery.com</p>
      </div>

    </footer>
  );
}
