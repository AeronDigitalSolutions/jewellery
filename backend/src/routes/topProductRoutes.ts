import express from "express";
import {
  getTopProducts,
  assignTopProduct,
  removeTopProduct,
} from "../controller/topProductController";

const router = express.Router();

router.get("/", getTopProducts);
router.post("/assign", assignTopProduct);
router.delete("/:slot", removeTopProduct);

export default router;
