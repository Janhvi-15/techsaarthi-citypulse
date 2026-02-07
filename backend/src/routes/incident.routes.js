import { Router } from "express";
import {
  createIncident,
  getAllIncidents
} from "../controllers/incident.controller.js";
import { upload } from "../middleware/upload.middleware.js";

const router = Router();

router.post(
  "/",
  upload.single("image"),
  createIncident
);

router.get("/", getAllIncidents);

export default router;
