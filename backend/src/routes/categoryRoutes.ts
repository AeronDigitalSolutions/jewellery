import express from "express";
import {
  addCategory,
  getCategories,
  updateCategory,
  deleteCategory
} from "../controller/categoryController";

const router = express.Router();

router.get("/", getCategories);               // GET all
router.post("/add", addCategory);             // ADD
router.put("/:id", updateCategory);           // UPDATE
router.delete("/:id", deleteCategory);        // DELETE

export default router;
