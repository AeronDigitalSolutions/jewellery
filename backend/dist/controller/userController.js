"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = exports.deleteUser = exports.updateUser = exports.getProfile = exports.login = exports.signup = void 0;
const user_1 = __importDefault(require("../models/user"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// =========================
// REGISTER USER
// =========================
const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const exists = await user_1.default.findOne({ email });
        if (exists)
            return res.status(400).json({ msg: "Email already registered" });
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const user = await user_1.default.create({
            name,
            email,
            password: hashedPassword
        });
        return res.json({ msg: "Signup successful", user });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Server Error" });
    }
};
exports.signup = signup;
// =========================
// LOGIN USER
// =========================
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await user_1.default.findOne({ email });
        if (!user)
            return res.status(400).json({ msg: "User not found" });
        const match = await bcryptjs_1.default.compare(password, user.password);
        if (!match)
            return res.status(400).json({ msg: "Invalid password" });
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET || "secret", { expiresIn: "7d" });
        return res.json({ msg: "Login successful", token, user });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Server Error" });
    }
};
exports.login = login;
// =========================
// GET USER PROFILE
// =========================
const getProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await user_1.default.findById(userId).select("-password");
        if (!user)
            return res.status(404).json({ msg: "User not found" });
        return res.json(user);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Server Error" });
    }
};
exports.getProfile = getProfile;
// =========================
// UPDATE USER PROFILE
// =========================
const updateUser = async (req, res) => {
    try {
        const userId = req.user.id;
        const updated = await user_1.default.findByIdAndUpdate(userId, req.body, {
            new: true
        }).select("-password");
        return res.json({ msg: "Profile updated", user: updated });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Server Error" });
    }
};
exports.updateUser = updateUser;
// =========================
// DELETE USER
// =========================
const deleteUser = async (req, res) => {
    try {
        const userId = req.user.id;
        await user_1.default.findByIdAndDelete(userId);
        return res.json({ msg: "User deleted successfully" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Server Error" });
    }
};
exports.deleteUser = deleteUser;
const changePassword = async (req, res) => {
    try {
        const { oldPass, newPass } = req.body;
        const userId = req.user.id;
        if (!oldPass || !newPass) {
            return res.status(400).json({ msg: "All fields are required" });
        }
        const user = await user_1.default.findById(userId);
        if (!user)
            return res.status(404).json({ msg: "User not found" });
        const match = await bcryptjs_1.default.compare(oldPass, user.password);
        if (!match) {
            return res.status(400).json({ msg: "Old password is incorrect" });
        }
        user.password = await bcryptjs_1.default.hash(newPass, 10);
        await user.save();
        return res.json({ msg: "Password updated successfully" });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Server Error" });
    }
};
exports.changePassword = changePassword;
