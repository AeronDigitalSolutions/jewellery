"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bannerController_1 = require("../controller/bannerController");
console.log("✅ bannerRoutes loaded");
const router = express_1.default.Router();
router.post("/add", bannerController_1.addBanner);
router.get("/all", bannerController_1.getBanners);
router.put("/:id", bannerController_1.updateBanner);
router.delete("/:id", bannerController_1.deleteBanner);
exports.default = router;
