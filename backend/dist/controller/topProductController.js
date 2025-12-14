"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeTopProduct = exports.assignTopProduct = exports.getTopProducts = void 0;
const topProduct_1 = __importDefault(require("../models/topProduct"));
// GET ALL TOP PRODUCTS
const getTopProducts = async (_req, res) => {
    const data = await topProduct_1.default.find()
        .populate("productId")
        .sort({ slot: 1 });
    res.json(data);
};
exports.getTopProducts = getTopProducts;
// ASSIGN / UPDATE SLOT
const assignTopProduct = async (req, res) => {
    const { slot, productId } = req.body;
    if (!slot || !productId) {
        return res.status(400).json({ msg: "Slot & product required" });
    }
    const updated = await topProduct_1.default.findOneAndUpdate({ slot }, { productId }, { upsert: true, new: true }).populate("productId");
    res.json({ msg: "Top product assigned", updated });
};
exports.assignTopProduct = assignTopProduct;
// REMOVE SLOT
const removeTopProduct = async (req, res) => {
    await topProduct_1.default.findOneAndDelete({ slot: Number(req.params.slot) });
    res.json({ msg: "Top product removed" });
};
exports.removeTopProduct = removeTopProduct;
