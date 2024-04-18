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
exports.authCtrl = exports.signin = exports.signup = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const { first_name, last_name, password, email } = req.body;
        const existingUser = yield user_model_1.default.findOne({ email });
        if (existingUser) {
            return res.status(200).json({ message: "User already exists" });
        }
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashedPassword = yield bcrypt_1.default.hash(password, salt);
        const user = yield user_model_1.default.create({
            first_name,
            last_name,
            password: hashedPassword,
            email,
        });
        const token = user.createJWT();
        res.status(201).json({ success: true, user, token });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.signup = signup;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield user_model_1.default.findOne({ email });
        if (!user) {
            res.status(404).json({ message: "User not found" });
        }
        const ispasswordMatch = yield (user === null || user === void 0 ? void 0 : user.comparePassword(password));
        if (!ispasswordMatch) {
            res.status(401).json({ message: "Invalid credentials" });
        }
        const token = user === null || user === void 0 ? void 0 : user.createJWT();
        res.status(200).json({ success: true, user, token });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.signin = signin;
const authCtrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const user = yield user_model_1.default.findById({ _id: (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId });
        if (!user) {
            res.status(200).send({ message: "user not found", success: false });
        }
        res
            .status(200)
            .send({
            data: { name: user === null || user === void 0 ? void 0 : user.first_name, email: user === null || user === void 0 ? void 0 : user.email },
            success: true,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.authCtrl = authCtrl;
