import { Router } from "express";
import {
  registerStaff,
  loginStaff
} from "../controllers/staff.auth.controllers.js";

const router = Router();

router.post("/register", registerStaff);
router.post("/login", loginStaff);

export default router;
