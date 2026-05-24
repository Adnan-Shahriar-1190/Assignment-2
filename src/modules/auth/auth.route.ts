import { Router } from "express";
import { authController } from "./auth.controller";
import validateUserRole from "../../middleware/validateUser";

const router = Router();

router.post("/signup", validateUserRole, authController.signUpUser);
router.post("/login", authController.logInUser);

export const authRoute = router;
