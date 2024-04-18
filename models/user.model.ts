import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import env from "dotenv";
env.config();

interface UserDocument extends Document {
  _id: any;
  first_name: string;
  last_name: string;
  password: string;
  email: string;
  verified: boolean;
  createJWT(): string; // Define the type for createJWT method
  comparePassword(candidatePassword: string): Promise<boolean>; // Define the type for comparePassword method
}

const userSchema = new mongoose.Schema<UserDocument>({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: [true, "Please enter the password"],
  },
  email: {
    type: String,
    required: [true, "Please enter the email"],
    unique: true,
    match: [
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      "please provide a valid email address",
    ],
  },
  verified: {
    type: Boolean,
    default: false,
  },
});

userSchema.methods.createJWT = function (this: UserDocument) {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error("JWT Secret is not defined");
  }
  const token = jwt.sign({ userId: this._id }, jwtSecret, {
    expiresIn: process.env.JWT_LIFETIME,
  });

  return token;
};

userSchema.methods.comparePassword = async function (
  this: UserDocument,
  candidatePassword: string
): Promise<boolean> {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

const User: mongoose.Model<UserDocument> = mongoose.model("User", userSchema);
export default User;
