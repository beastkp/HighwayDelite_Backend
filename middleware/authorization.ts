import JWT,{JwtPayload} from "jsonwebtoken";
import User from "../models/user.model";
import env from "dotenv";
env.config();

interface CustomRequest extends Request {
    user: { userId: string };
}

const auth = async (req: any, res: any, next: any) : Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const token = authHeader.split(" ")[1];

  try {
    const payload = JWT.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    req.user = {userId: payload.userId};
    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;