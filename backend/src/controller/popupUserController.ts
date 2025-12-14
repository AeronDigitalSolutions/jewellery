import { Request, Response } from "express";
import PopupUser from "../models/popupUser";

export const addPopupUser = async (req: Request, res: Response) => {
  try {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ msg: "All fields required" });
    }

    const user = await PopupUser.create({ name, email, phone });
    res.json({ msg: "Saved", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};



export const deletePopupUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await PopupUser.findByIdAndDelete(id);

    res.json({ msg: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Delete failed" });
  }
};


export const getPopupUsers = async (_req: Request, res: Response) => {
  const users = await PopupUser.find().sort({ createdAt: -1 });
  res.json(users);
};
