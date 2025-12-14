"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.getCategories = exports.addCategory = void 0;
const category_1 = __importDefault(require("../models/category"));
const addCategory = async (req, res) => {
    try {
        const { name, image, metalType } = req.body;
        if (!name || !image || !metalType) {
            return res.status(400).json({ msg: "All fields required" });
        }
        const categoryId = "CAT" + Math.floor(Math.random() * 100000);
        const category = await category_1.default.create({
            name,
            image,
            metalType, // ✅ SAVE
            categoryId,
        });
        res.json({ msg: "Category added", category });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Server error" });
    }
};
exports.addCategory = addCategory;
const getCategories = async (_req, res) => {
    const categories = await category_1.default.find().sort({ createdAt: -1 });
    res.json(categories);
};
exports.getCategories = getCategories;
const updateCategory = async (req, res) => {
    try {
        const updated = await category_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ msg: "Category updated", updated });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
};
exports.updateCategory = updateCategory;
const deleteCategory = async (req, res) => {
    try {
        await category_1.default.findByIdAndDelete(req.params.id);
        res.json({ msg: "Category deleted" });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
};
exports.deleteCategory = deleteCategory;
