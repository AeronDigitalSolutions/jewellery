import { Request, Response } from "express";
import Metal from "../models/metal";

// ADD METAL
export const addMetal = async (req: Request, res: Response) => {
  try {
    const { name, price, perGram } = req.body;

    if (!name || !price || !perGram) {
      return res.status(400).json({ msg: "All fields required" });
    }

    const exists = await Metal.findOne({ name });
    if (exists) return res.status(400).json({ msg: "Metal already exists" });

    const metal = await Metal.create({ name, price, perGram });
    res.json({ msg: "Metal added successfully", metal });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// GET ALL METALS
export const getMetals = async (req: Request, res: Response) => {
  try {
    const metals = await Metal.find().sort({ createdAt: -1 });
    res.json(metals);
  } catch (err) {
    res.status(500).json({ msg: "Could not fetch metals" });
  }
};

// UPDATE METAL
export const updateMetal = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, price, perGram } = req.body;

    const updated = await Metal.findByIdAndUpdate(
      id,
      { name, price, perGram },
      { new: true }
    );

    res.json({ msg: "Metal updated", metal: updated });
  } catch (err) {
    res.status(500).json({ msg: "Update failed" });
  }
};

// DELETE METAL
export const deleteMetal = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await Metal.findByIdAndDelete(id);
    res.json({ msg: "Metal deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Delete failed" });
  }
};
