import { Request, Response } from "express";
import Category from "../models/category";

export const addCategory = async (req: Request, res: Response) => {
  try {
    const { name, image, metalType } = req.body;

    if (!name || !image || !metalType) {
      return res.status(400).json({ msg: "All fields required" });
    }

    const categoryId = "CAT" + Math.floor(Math.random() * 100000);

    const category = await Category.create({
      name,
      image,
      metalType, // ✅ SAVE
      categoryId,
    });

    res.json({ msg: "Category added", category });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
};


export const getCategories = async (_req: Request, res: Response) => {
  const categories = await Category.find().sort({ createdAt: -1 });
  res.json(categories);
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const updated = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({ msg: "Category updated", updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ msg: "Category deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};
