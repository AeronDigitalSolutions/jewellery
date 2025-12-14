"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPopupUsers = exports.deletePopupUser = exports.addPopupUser = void 0;
const popupUser_1 = __importDefault(require("../models/popupUser"));
const addPopupUser = async (req, res) => {
    try {
        const { name, email, phone } = req.body;
        if (!name || !email || !phone) {
            return res.status(400).json({ msg: "All fields required" });
        }
        const user = await popupUser_1.default.create({ name, email, phone });
        res.json({ msg: "Saved", user });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
};
exports.addPopupUser = addPopupUser;
const deletePopupUser = async (req, res) => {
    try {
        const { id } = req.params;
        await popupUser_1.default.findByIdAndDelete(id);
        res.json({ msg: "User deleted successfully" });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Delete failed" });
    }
};
exports.deletePopupUser = deletePopupUser;
const getPopupUsers = async (_req, res) => {
    const users = await popupUser_1.default.find().sort({ createdAt: -1 });
    res.json(users);
};
exports.getPopupUsers = getPopupUsers;
