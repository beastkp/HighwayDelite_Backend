"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const authorization_1 = __importDefault(require("../middleware/authorization"));
const router = express_1.default.Router();
router.route('/signup').post(user_controller_1.signup);
router.route('/signin').post(user_controller_1.signin);
router.route('/getUserData').get(authorization_1.default, user_controller_1.authCtrl);
exports.default = router;
