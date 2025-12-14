"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.getProductById = exports.getProducts = exports.addProduct = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const product_1 = __importDefault(require("../models/product"));
/* ================= PRICE CALCULATOR ================= */
const calculateTotal = (metalPrice, weight, makingType, makingValue, wastageType, wastageValue) => {
    const base = metalPrice * weight;
    const making = makingType === "PERCENT"
        ? (base * makingValue) / 100
        : makingValue;
    const wastage = wastageType === "PERCENT"
        ? (base * wastageValue) / 100
        : wastageValue;
    return Math.round(base + making + wastage);
};
/* ================= ADD PRODUCT ================= */
const addProduct = async (req, res) => {
    try {
        const { name, category, // ObjectId (string from frontend)
        metalId, metalPrice, weight, makingType = "PERCENT", makingValue = 0, wastageType = "PERCENT", wastageValue = 0, description, specification, images, } = req.body;
        /* ===== VALIDATION ===== */
        if (!mongoose_1.default.Types.ObjectId.isValid(category)) {
            return res.status(400).json({ msg: "Invalid category ID" });
        }
        if (!name ||
            !category ||
            !metalId ||
            metalPrice === undefined ||
            weight === undefined ||
            !images ||
            images.length === 0) {
            return res.status(400).json({
                msg: "All required fields missing!",
                received: {
                    name,
                    category,
                    metalId,
                    metalPrice,
                    weight,
                    imagesCount: images?.length,
                },
            });
        }
        /* ===== PRICE ===== */
        const totalPrice = calculateTotal(Number(metalPrice), Number(weight), makingType, Number(makingValue), wastageType, Number(wastageValue));
        /* ===== CREATE ===== */
        const product = await product_1.default.create({
            productId: "PROD" + Date.now(),
            name,
            // ✅ Explicit ObjectId cast
            category: new mongoose_1.default.Types.ObjectId(category),
            metalId,
            metalPrice: Number(metalPrice),
            weight: Number(weight),
            makingType,
            makingValue: Number(makingValue),
            wastageType,
            wastageValue: Number(wastageValue),
            totalPrice,
            description,
            specification,
            images,
        });
        res.status(201).json(product);
    }
    catch (err) {
        console.error("ADD PRODUCT ERROR:", err);
        res.status(500).json({
            msg: "Server error",
            error: err.message,
        });
    }
};
exports.addProduct = addProduct;
/* ================= GET PRODUCTS (ALL / CATEGORY) ================= */
const getProducts = async (req, res) => {
    try {
        const { category } = req.query;
        const filter = {};
        if (category && mongoose_1.default.Types.ObjectId.isValid(category)) {
            filter.category = category;
        }
        const products = await product_1.default.find(filter)
            .populate("category", "name metalType")
            .sort({ createdAt: -1 });
        res.json(products);
    }
    catch (err) {
        console.error("GET PRODUCTS ERROR:", err);
        res.status(500).json({ msg: "Server error" });
    }
};
exports.getProducts = getProducts;
/* ================= GET PRODUCT BY ID ================= */
const getProductById = async (req, res) => {
    try {
        const product = await product_1.default.findById(req.params.id).populate("category", "name metalType");
        if (!product) {
            return res.status(404).json({ msg: "Product not found" });
        }
        res.json(product);
    }
    catch (err) {
        console.error("GET PRODUCT ERROR:", err);
        res.status(500).json({ msg: "Server error" });
    }
};
exports.getProductById = getProductById;
/* ================= DELETE PRODUCT ================= */
const deleteProduct = async (req, res) => {
    try {
        const deleted = await product_1.default.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ msg: "Product not found" });
        }
        res.json({ msg: "Product deleted successfully" });
    }
    catch (err) {
        console.error("DELETE PRODUCT ERROR:", err);
        res.status(500).json({ msg: "Server error" });
    }
};
exports.deleteProduct = deleteProduct;
