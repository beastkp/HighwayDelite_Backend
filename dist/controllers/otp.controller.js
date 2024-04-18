"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOTP = exports.sendOTP = void 0;
const otp_generator_1 = __importDefault(require("otp-generator"));
const userOTP_model_1 = __importDefault(require("../models/userOTP.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const sendOTP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const checkUser = yield user_model_1.default.findOne({ email });
    if (checkUser === null || checkUser === void 0 ? void 0 : checkUser.verified) {
        return res.status(400).json({ message: "User already verified" });
    }
    let otp = otp_generator_1.default.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
    });
    const createOTP = yield userOTP_model_1.default.create({
        email,
        otp,
    });
    res.status(200).json({ success: true, createOTP });
});
exports.sendOTP = sendOTP;
const getOTP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, otp } = req.body;
        const checkUser = yield userOTP_model_1.default.findOne({ email });
        if ((checkUser === null || checkUser === void 0 ? void 0 : checkUser.otp) === otp) {
            const user = yield user_model_1.default.findOneAndUpdate({ email }, { verified: true });
            if (!user) {
                return res.status(400).json({ message: "User not found" });
            }
            return res.status(200).send({ success: true, message: "OTP verified" });
        }
        return res.status(400).json({ success: false, message: "Invalid OTP" });
    }
    catch (error) { }
});
exports.getOTP = getOTP;
