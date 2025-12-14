"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controller/userController");
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express_1.default.Router();
// ================= PUBLIC =================
router.post("/signup", userController_1.signup);
router.post("/login", userController_1.login);
// ================= PRIVATE =================
router.get("/profile", auth_1.default, userController_1.getProfile);
router.put("/update", auth_1.default, userController_1.updateUser);
// 🔐 CHANGE PASSWORD (FIX)
router.post("/change-password", auth_1.default, userController_1.changePassword);
router.delete("/delete", auth_1.default, userController_1.deleteUser);
exports.default = router;
