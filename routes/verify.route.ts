import express from "express";
import {getOTP, sendOTP}  from "../controllers/otp.controller";
import auth from "../middleware/authorization";
const router = express.Router();

router.route("/").post(auth,sendOTP);
router.route("/otp").post(auth,getOTP)

export default router;