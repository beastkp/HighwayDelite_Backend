import otpGenerator from "otp-generator";
import UserOTP from "../models/userOTP.model";
import User from "../models/user.model";
import { Request, Response } from "express";
import bcrypt from "bcrypt";

export const sendOTP = async (req: Request, res: Response) => {
  const { email } = req.body;

  const checkUser = await User.findOne({ email });

  if (checkUser?.verified) {
    return res.status(400).json({ message: "User already verified" });
  }
  let otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });

  const createOTP = await UserOTP.create({
    email,
    otp,
  });
  res.status(200).json({ success: true, createOTP});
};

export const getOTP = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;
    const checkUser = await UserOTP.findOne({ email });

    if (checkUser?.otp === otp) {
        const user = await User.findOneAndUpdate({ email }, {verified: true});
        if(!user){
            return res.status(400).json({ message: "User not found" });
        }
        return res.status(200).send({ success: true, message: "OTP verified" });
    }
    return res.status(400).json({ success: false, message: "Invalid OTP" });
  } catch (error) {}
};
