import express from "express";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./routes/user.route"
import verificationRouter from "./routes/verify.route"
import connectDB  from "./db/connect";
import env from "dotenv";
env.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use('/api/v1/auth',userRouter);
app.use('/api/v1/verify',verificationRouter)

const port  = process.env.PORT || 3000;

const start = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGO_URI;
    if(!mongoURI){
      throw new Error("Mongo URI not found");
    }
    await connectDB(mongoURI);
      app.listen(port , () => {
      console.log(`Server listening on port ${port}`);
      console.log("DB connected");
    });
  } catch (error) {
    console.log(error);
  }
}

start();



