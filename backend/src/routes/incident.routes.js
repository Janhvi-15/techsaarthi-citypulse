import express from "express";
import {
  getFieldTasks,
  resolveIncident,
} from "../controllers/incident.controller.js";

const router = express.Router();

router.get("/field/tasks/:staffId", getFieldTasks);
router.post("/:id/resolve", resolveIncident);

export default router;
