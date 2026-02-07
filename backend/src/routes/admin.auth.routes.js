import { Router } from "express";
import { adminLogin } from "../controllers/admin.auth.controllers.js";

const router = Router();

// ADMIN LOGIN ONLY
router.post("/login", adminLogin);

export default router;
