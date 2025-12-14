import express from "express";
import { addMetal, getMetals, updateMetal, deleteMetal } from "../controller/metalController";

const router = express.Router();

router.post("/add", addMetal);
router.get("/", getMetals);
router.put("/:id", updateMetal);
router.delete("/:id", deleteMetal);

export default router;
