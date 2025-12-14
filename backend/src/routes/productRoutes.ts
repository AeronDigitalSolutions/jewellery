import express from "express";
import {
  addProduct,
  getProducts,
  getProductById,
  deleteProduct,
} from "../controller/productController";

const router = express.Router();

router.post("/add", addProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);   // ✅ ADD THIS
router.delete("/:id", deleteProduct);

export default router;
