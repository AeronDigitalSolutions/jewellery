import mongoose from "mongoose";
import { Request, Response } from "express";
import Product from "../models/product";

/* ================= PRICE CALCULATOR ================= */
const calculateTotal = (
  metalPrice: number,
  weight: number,
  makingType: "PERCENT" | "AMOUNT",
  makingValue: number,
  wastageType: "PERCENT" | "AMOUNT",
  wastageValue: number
) => {
  const base = metalPrice * weight;

  const making =
    makingType === "PERCENT"
      ? (base * makingValue) / 100
      : makingValue;

  const wastage =
    wastageType === "PERCENT"
      ? (base * wastageValue) / 100
      : wastageValue;

  return Math.round(base + making + wastage);
};

/* ================= ADD PRODUCT ================= */
export const addProduct = async (req: Request, res: Response) => {
  try {
    const {
      name,
      category, // ObjectId (string from frontend)
      metalId,
      metalPrice,
      weight,
      makingType = "PERCENT",
      makingValue = 0,
      wastageType = "PERCENT",
      wastageValue = 0,
      description,
      specification,
      images,
    } = req.body;

    /* ===== VALIDATION ===== */

    if (!mongoose.Types.ObjectId.isValid(category)) {
      return res.status(400).json({ msg: "Invalid category ID" });
    }

    if (
      !name ||
      !category ||
      !metalId ||
      metalPrice === undefined ||
      weight === undefined ||
      !images ||
      images.length === 0
    ) {
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
    const totalPrice = calculateTotal(
      Number(metalPrice),
      Number(weight),
      makingType,
      Number(makingValue),
      wastageType,
      Number(wastageValue)
    );

    /* ===== CREATE ===== */
    const product = await Product.create({
      productId: "PROD" + Date.now(),
      name,

      // ✅ Explicit ObjectId cast
      category: new mongoose.Types.ObjectId(category),

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
  } catch (err: any) {
    console.error("ADD PRODUCT ERROR:", err);
    res.status(500).json({
      msg: "Server error",
      error: err.message,
    });
  }
};

/* ================= GET PRODUCTS (ALL / CATEGORY) ================= */
export const getProducts = async (req: Request, res: Response) => {
  try {
    const { category } = req.query;

    const filter: any = {};
    if (category && mongoose.Types.ObjectId.isValid(category as string)) {
      filter.category = category;
    }

    const products = await Product.find(filter)
      .populate("category", "name metalType")
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (err) {
    console.error("GET PRODUCTS ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

/* ================= GET PRODUCT BY ID ================= */
export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "category",
      "name metalType"
    );

    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    console.error("GET PRODUCT ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

/* ================= DELETE PRODUCT ================= */
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ msg: "Product not found" });
    }

    res.json({ msg: "Product deleted successfully" });
  } catch (err) {
    console.error("DELETE PRODUCT ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
};
