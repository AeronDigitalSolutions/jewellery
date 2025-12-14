"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBanner = exports.updateBanner = exports.getBanners = exports.addBanner = void 0;
const banner_1 = __importDefault(require("../models/banner"));
const addBanner = async (req, res) => {
    try {
        const { image } = req.body;
        if (!image)
            return res.status(400).json({ msg: "Image required" });
        const banner = await banner_1.default.create({ image });
        res.json({ msg: "Banner added", banner });
    }
    catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
};
exports.addBanner = addBanner;
const getBanners = async (_, res) => {
    const banners = await banner_1.default.find().sort({ createdAt: -1 });
    res.json(banners);
};
exports.getBanners = getBanners;
const updateBanner = async (req, res) => {
    const { image } = req.body;
    await banner_1.default.findByIdAndUpdate(req.params.id, { image });
    res.json({ msg: "Banner updated" });
};
exports.updateBanner = updateBanner;
const deleteBanner = async (req, res) => {
    await banner_1.default.findByIdAndDelete(req.params.id);
    res.json({ msg: "Banner deleted" });
};
exports.deleteBanner = deleteBanner;
