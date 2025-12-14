import express from "express";
import { getFooter, updateFooter } from "../controller/footerController";
import auth from "../middleware/auth";

const router = express.Router();

// PUBLIC
router.get("/", getFooter);

// ADMIN
router.post("/update", auth, updateFooter);

export default router;
