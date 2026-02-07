import { Router } from "express";
import {
  registerUser,
  loginUser,
  getCurrentUser
} from "../controllers/auth.controllers.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

// PUBLIC
router.post("/register", registerUser);
router.post("/login", loginUser);

// PROTECTED
router.get("/me", verifyJWT, getCurrentUser);

export default router;
