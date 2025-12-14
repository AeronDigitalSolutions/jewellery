import { Request, Response } from "express";
import TopProduct from "../models/topProduct";

// GET ALL TOP PRODUCTS
export const getTopProducts = async (_req: Request, res: Response) => {
  const data = await TopProduct.find()
    .populate("productId")
    .sort({ slot: 1 });

  res.json(data);
};

// ASSIGN / UPDATE SLOT
export const assignTopProduct = async (req: Request, res: Response) => {
  const { slot, productId } = req.body;

  if (!slot || !productId) {
    return res.status(400).json({ msg: "Slot & product required" });
  }

  const updated = await TopProduct.findOneAndUpdate(
    { slot },
    { productId },
    { upsert: true, new: true }
  ).populate("productId");

  res.json({ msg: "Top product assigned", updated });
};

// REMOVE SLOT
export const removeTopProduct = async (req: Request, res: Response) => {
  await TopProduct.findOneAndDelete({ slot: Number(req.params.slot) });
  res.json({ msg: "Top product removed" });
};
