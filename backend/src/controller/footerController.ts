import { Request, Response } from "express";
import Footer from "../models/footer";

// GET FOOTER (PUBLIC)
export const getFooter = async (_req: Request, res: Response) => {
  const footer = await Footer.findOne().sort({ createdAt: -1 });
  res.json(footer);
};

// UPDATE / CREATE FOOTER (ADMIN)
export const updateFooter = async (req: Request, res: Response) => {
  try {
    const { address, phone, email } = req.body;

    if (!address || !phone || !email) {
      return res.status(400).json({ msg: "All fields required" });
    }

    let footer = await Footer.findOne();

    if (footer) {
      footer.address = address;
      footer.phone = phone;
      footer.email = email;
      await footer.save();
    } else {
      footer = await Footer.create({ address, phone, email });
    }

    res.json({ msg: "Footer updated", footer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};
