import { Request, Response } from "express";
import Banner from "../models/banner";

export const addBanner = async (req: Request, res: Response) => {
  try {
    const { image } = req.body;
    if (!image) return res.status(400).json({ msg: "Image required" });

    const banner = await Banner.create({ image });
    res.json({ msg: "Banner added", banner });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

export const getBanners = async (_: Request, res: Response) => {
  const banners = await Banner.find().sort({ createdAt: -1 });
  res.json(banners);
};

export const updateBanner = async (req: Request, res: Response) => {
  const { image } = req.body;
  await Banner.findByIdAndUpdate(req.params.id, { image });
  res.json({ msg: "Banner updated" });
};

export const deleteBanner = async (req: Request, res: Response) => {
  await Banner.findByIdAndDelete(req.params.id);
  res.json({ msg: "Banner deleted" });
};
