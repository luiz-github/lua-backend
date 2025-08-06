import { Router } from "express"
import AuthController from "../controllers/auth.controller"

const router = Router();
const authController = new AuthController();

// API routes
router.post("/signIn", authController.signInUserController)
router.post("/signUp", authController.signUpUserController)

export default router;