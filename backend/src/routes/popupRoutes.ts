import express from "express";
import {
  addPopupUser,
  getPopupUsers,
  deletePopupUser,
} from "../controller/popupUserController";

const router = express.Router();

router.post("/add", addPopupUser);
router.get("/all", getPopupUsers);
router.delete("/:id", deletePopupUser);   // ✅ ADD THIS

export default router;
