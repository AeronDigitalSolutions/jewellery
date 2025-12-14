import { Request, Response } from "express";
import User from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// =========================
// REGISTER USER
// =========================
export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ msg: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    return res.json({ msg: "Signup successful", user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server Error" });
  }
};

// =========================
// LOGIN USER
// =========================
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ msg: "Invalid password" });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "7d" }
    );

    return res.json({ msg: "Login successful", token, user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server Error" });
  }
};

// =========================
// GET USER PROFILE
// =========================
export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;

    const user = await User.findById(userId).select("-password");

    if (!user) return res.status(404).json({ msg: "User not found" });

    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server Error" });
  }
};

// =========================
// UPDATE USER PROFILE
// =========================
export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;

    const updated = await User.findByIdAndUpdate(userId, req.body, {
      new: true
    }).select("-password");

    return res.json({ msg: "Profile updated", user: updated });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server Error" });
  }
};





// =========================
// DELETE USER
// =========================
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;

    await User.findByIdAndDelete(userId);

    return res.json({ msg: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server Error" });
  }
};
export const changePassword = async (req: Request, res: Response) => {
  try {
    const { oldPass, newPass } = req.body;
    const userId = (req as any).user.id;

    if (!oldPass || !newPass) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: "User not found" });

    const match = await bcrypt.compare(oldPass, user.password);
    if (!match) {
      return res.status(400).json({ msg: "Old password is incorrect" });
    }

    user.password = await bcrypt.hash(newPass, 10);
    await user.save();

    return res.json({ msg: "Password updated successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server Error" });
  }
};
