"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const metalRoutes_1 = __importDefault(require("./routes/metalRoutes"));
const categoryRoutes_1 = __importDefault(require("./routes/categoryRoutes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const popupRoutes_1 = __importDefault(require("./routes/popupRoutes"));
const bannerRoutes_1 = __importDefault(require("./routes/bannerRoutes"));
const footerRoutes_1 = __importDefault(require("./routes/footerRoutes"));
const topProductRoutes_1 = __importDefault(require("./routes/topProductRoutes"));
dotenv_1.default.config();
(0, db_1.default)();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
// FIX 413 ERROR — Increase payload size limit
app.use(express_1.default.json({ limit: "100mb" }));
app.use(express_1.default.urlencoded({ extended: true, limit: "100mb" }));
console.log("🔥 Registering /api/banners");
app.use("/api/users", userRoutes_1.default);
app.use("/api/metals", metalRoutes_1.default);
app.use("/api/categories", categoryRoutes_1.default);
app.use("/api/products", productRoutes_1.default);
app.use("/api/popup-users", popupRoutes_1.default);
app.use("/api/banners", bannerRoutes_1.default);
app.use("/api/footer", footerRoutes_1.default);
app.use("/api/top-products", topProductRoutes_1.default);
app.get("/", (req, res) => {
    res.send("Backend running...");
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
