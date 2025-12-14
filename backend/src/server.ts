import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";

import userRoutes from "./routes/userRoutes";
import metalRoutes from "./routes/metalRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import productRoutes from "./routes/productRoutes";
import popupUserRoutes from "./routes/popupRoutes";
import bannerRoutes from "./routes/bannerRoutes";
import footerRoutes from "./routes/footerRoutes";
import topProductRoutes from "./routes/topProductRoutes";



dotenv.config();
connectDB();

const app = express();
app.use(cors());

// FIX 413 ERROR — Increase payload size limit
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));
console.log("🔥 Registering /api/banners");


app.use("/api/users", userRoutes);
app.use("/api/metals", metalRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/popup-users", popupUserRoutes);
app.use("/api/banners", bannerRoutes);
app.use("/api/footer", footerRoutes);
app.use("/api/top-products", topProductRoutes);

app.get("/", (req, res) => {
  res.send("Backend running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
