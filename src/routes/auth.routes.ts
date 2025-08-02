import { Router } from "express"
import AuthController from "../controllers/auth.controller"

const router = Router();
const authController = new AuthController();

// API routes
router.post("/signIn", authController.signIn)
router.post("/signUp", authController.signUp)
router.post("/logout", authController.logout)

export default router;