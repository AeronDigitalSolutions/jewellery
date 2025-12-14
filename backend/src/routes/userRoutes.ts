import express from "express";
import {
  signup,
  login,
  getProfile,
  updateUser,
  deleteUser,
  changePassword,
} from "../controller/userController";
import auth from "../middleware/auth";

const router = express.Router();

// ================= PUBLIC =================
router.post("/signup", signup);
router.post("/login", login);

// ================= PRIVATE =================
router.get("/profile", auth, getProfile);
router.put("/update", auth, updateUser);

// 🔐 CHANGE PASSWORD (FIX)
router.post("/change-password", auth, changePassword);

router.delete("/delete", auth, deleteUser);

export default router;
