import mongoose from "mongoose";
import Incident from "../models/Incident.js";

// GET /api/incidents/field/tasks/:staffId
export const getFieldTasks = async (req, res) => {
  try {
    const staffId = (req.params.staffId || "").trim();
    if (!mongoose.isValidObjectId(staffId)) {
      return res.status(400).json({ message: "Invalid staffId" });
    }

    const tasks = await Incident.find({
      assignedTo: staffId,
      status: { $ne: "Resolved" },
    }).sort({ createdAt: -1 });

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/incidents/:id/resolve
export const resolveIncident = async (req, res) => {
  try {
    const id = (req.params.id || "").trim();
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid incident id" });
    }

    const incident = await Incident.findById(id);
    if (!incident)
      return res.status(404).json({ message: "Incident not found" });

    incident.status = "Resolved";
    await incident.save();

    res.json(incident);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
