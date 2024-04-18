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
const nodemailer_1 = __importDefault(require("nodemailer"));
const mailSender = (email, title, body) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contactEmailOptions = {
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.SMTP_FROM_EMAIL,
                pass: process.env.SMTP_FROM_PASSWORD,
            },
        };
        const transporter = nodemailer_1.default.createTransport(contactEmailOptions);
        // Send emails to users
        let info = yield transporter.sendMail({
            from: process.env.SMTP_FROM_EMAIL,
            to: email,
            subject: title,
            html: body,
        });
        console.log("Email info: ", info);
        return info;
    }
    catch (error) {
        console.log(error.message);
    }
});
exports.default = mailSender;
