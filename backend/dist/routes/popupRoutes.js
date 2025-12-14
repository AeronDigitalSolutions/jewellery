"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const popupUserController_1 = require("../controller/popupUserController");
const router = express_1.default.Router();
router.post("/add", popupUserController_1.addPopupUser);
router.get("/all", popupUserController_1.getPopupUsers);
router.delete("/:id", popupUserController_1.deletePopupUser); // ✅ ADD THIS
exports.default = router;
