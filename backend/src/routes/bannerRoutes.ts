import express from "express";
import {
  addBanner,
  getBanners,
  updateBanner,
  deleteBanner
} from "../controller/bannerController";
console.log("✅ bannerRoutes loaded");

const router = express.Router();

router.post("/add", addBanner);
router.get("/all", getBanners);
router.put("/:id", updateBanner);
router.delete("/:id", deleteBanner);

export default router;
