"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const topProductController_1 = require("../controller/topProductController");
const router = express_1.default.Router();
router.get("/", topProductController_1.getTopProducts);
router.post("/assign", topProductController_1.assignTopProduct);
router.delete("/:slot", topProductController_1.removeTopProduct);
exports.default = router;
