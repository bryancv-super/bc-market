import { Router } from "express";
import * as authController from "../controllers/auth.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/me", authenticate, authController.me);
router.patch("/me", authenticate, authController.updateMe);
router.patch("/password", authenticate, authController.changePassword);

export default router;
