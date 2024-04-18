import express from "express";
import { signup,signin, authCtrl } from "../controllers/user.controller";
import auth from "../middleware/authorization";
const router = express.Router();

router.route('/signup').post(signup);
router.route('/signin').post(signin);
router.route('/getUserData').get(auth,authCtrl);

export default router;