"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const categoryController_1 = require("../controller/categoryController");
const router = express_1.default.Router();
router.get("/", categoryController_1.getCategories); // GET all
router.post("/add", categoryController_1.addCategory); // ADD
router.put("/:id", categoryController_1.updateCategory); // UPDATE
router.delete("/:id", categoryController_1.deleteCategory); // DELETE
exports.default = router;
