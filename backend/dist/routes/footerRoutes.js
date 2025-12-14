"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const footerController_1 = require("../controller/footerController");
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express_1.default.Router();
// PUBLIC
router.get("/", footerController_1.getFooter);
// ADMIN
router.post("/update", auth_1.default, footerController_1.updateFooter);
exports.default = router;
