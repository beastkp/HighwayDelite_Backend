"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const otp_controller_1 = require("../controllers/otp.controller");
const authorization_1 = __importDefault(require("../middleware/authorization"));
const router = express_1.default.Router();
router.route("/").post(authorization_1.default, otp_controller_1.sendOTP);
router.route("/otp").post(authorization_1.default, otp_controller_1.getOTP);
exports.default = router;
