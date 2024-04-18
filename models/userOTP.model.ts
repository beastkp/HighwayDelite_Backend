import mongoose from "mongoose";
import mailSender from "../utils/mailSender";
import bcrypt from "bcrypt";

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 600,
  },
});

async function sendVerificationEmail(email: string, otp: string) {
  try {
    const mailResponse = await mailSender(
      email,
      "Verification Email",
      `<h1>Please confirm your OTP</h1>
       <p>Here is your OTP code: ${otp}</p>`
    );
    console.log("Email sent successfully: ", mailResponse);
  } catch (error) {
    console.log("Error occurred while sending email: ", error);
    throw error;
  }
}

otpSchema.pre("save", async function (next) {
    console.log("New Doc Saved to db");
    if(this.isNew){
        
        await sendVerificationEmail(this.email, this.otp);
    }
    next();

})

const UserOTP = mongoose.model("UserOTP", otpSchema);
export default UserOTP;
