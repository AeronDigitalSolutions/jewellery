"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const metalController_1 = require("../controller/metalController");
const router = express_1.default.Router();
router.post("/add", metalController_1.addMetal);
router.get("/", metalController_1.getMetals);
router.put("/:id", metalController_1.updateMetal);
router.delete("/:id", metalController_1.deleteMetal);
exports.default = router;
