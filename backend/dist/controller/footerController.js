"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFooter = exports.getFooter = void 0;
const footer_1 = __importDefault(require("../models/footer"));
// GET FOOTER (PUBLIC)
const getFooter = async (_req, res) => {
    const footer = await footer_1.default.findOne().sort({ createdAt: -1 });
    res.json(footer);
};
exports.getFooter = getFooter;
// UPDATE / CREATE FOOTER (ADMIN)
const updateFooter = async (req, res) => {
    try {
        const { address, phone, email } = req.body;
        if (!address || !phone || !email) {
            return res.status(400).json({ msg: "All fields required" });
        }
        let footer = await footer_1.default.findOne();
        if (footer) {
            footer.address = address;
            footer.phone = phone;
            footer.email = email;
            await footer.save();
        }
        else {
            footer = await footer_1.default.create({ address, phone, email });
        }
        res.json({ msg: "Footer updated", footer });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
};
exports.updateFooter = updateFooter;
