import express from "express";
import {
  checkAuth,
  loginUser,
  logoutUser,
  registerUser,
} from "../../controllers/auth/authController.js";
import { protectRoute } from "../../middleware/protectRoute.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/check-auth", protectRoute, checkAuth);
export default router;
