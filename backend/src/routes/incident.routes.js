import { Router } from "express";
import {
  createIncident,
  getAllIncidents
} from "../controllers/incident.controller.js";

const router = Router();

router.post("/", createIncident);
router.get("/", getAllIncidents);

export default router;
