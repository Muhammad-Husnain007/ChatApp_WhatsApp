import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { sendMessage } from "../controllers/message.controller.js";

const router = Router();

router.route("/send/:chatId").post(sendMessage)

export default router