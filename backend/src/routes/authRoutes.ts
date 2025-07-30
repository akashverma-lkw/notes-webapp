import express from "express";
import { sendOTP, verifyOTP, getMe, googleLogin } from "../controllers/authController";
import { protect }  from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);
router.get("/me", protect, getMe);
router.post("/google", googleLogin); // POST /api/auth/google

export default router;
