import User from "../models/user.model";
import UserOTP from "../models/userOTP.model";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import nodemailer, { Transporter } from "nodemailer";

interface CustomRequest extends Request {
  user?:any;
}

export const signup = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const { first_name, last_name, password, email } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(200).json({ message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      first_name,
      last_name,
      password: hashedPassword,
      email,
    });
    const token = user.createJWT();
    res.status(201).json({success:true, user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    const ispasswordMatch = await user?.comparePassword(password);
    if (!ispasswordMatch) {
      res.status(401).json({ message: "Invalid credentials" });
    }

    const token = user?.createJWT();
    res.status(200).json({ success:true,user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const authCtrl = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const user = await User.findById({ _id: req.user?.userId });
    if (!user) {
      res.status(200).send({ message: "user not found", success: false });
    }
    res
      .status(200)
      .send({
        data: { name: user?.first_name, email: user?.email },
        success: true,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
