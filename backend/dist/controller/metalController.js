"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMetal = exports.updateMetal = exports.getMetals = exports.addMetal = void 0;
const metal_1 = __importDefault(require("../models/metal"));
// ADD METAL
const addMetal = async (req, res) => {
    try {
        const { name, price, perGram } = req.body;
        if (!name || !price || !perGram) {
            return res.status(400).json({ msg: "All fields required" });
        }
        const exists = await metal_1.default.findOne({ name });
        if (exists)
            return res.status(400).json({ msg: "Metal already exists" });
        const metal = await metal_1.default.create({ name, price, perGram });
        res.json({ msg: "Metal added successfully", metal });
    }
    catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
};
exports.addMetal = addMetal;
// GET ALL METALS
const getMetals = async (req, res) => {
    try {
        const metals = await metal_1.default.find().sort({ createdAt: -1 });
        res.json(metals);
    }
    catch (err) {
        res.status(500).json({ msg: "Could not fetch metals" });
    }
};
exports.getMetals = getMetals;
// UPDATE METAL
const updateMetal = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, perGram } = req.body;
        const updated = await metal_1.default.findByIdAndUpdate(id, { name, price, perGram }, { new: true });
        res.json({ msg: "Metal updated", metal: updated });
    }
    catch (err) {
        res.status(500).json({ msg: "Update failed" });
    }
};
exports.updateMetal = updateMetal;
// DELETE METAL
const deleteMetal = async (req, res) => {
    try {
        const { id } = req.params;
        await metal_1.default.findByIdAndDelete(id);
        res.json({ msg: "Metal deleted" });
    }
    catch (err) {
        res.status(500).json({ msg: "Delete failed" });
    }
};
exports.deleteMetal = deleteMetal;
