import { Incident } from "../models/incident.models.js";
import { ApiError } from "../utils/ApiError.js";

export const createIncident = async (req, res, next) => {
  try {
    const { title, category, description, location } = req.body;

    if (!title || !category || !location) {
      throw new ApiError(400, "Required fields missing");
    }

    const incident = await Incident.create({
      title,
      category,
      description,
      location,
      image: req.file ? `/uploads/incidents/${req.file.filename}` : null,
      reportedBy: req.user?._id // if auth middleware exists
    });

    res.status(201).json({
      success: true,
      message: "Incident reported successfully",
      data: incident
    });
  } catch (error) {
    next(error);
  }
};

export const getAllIncidents = async (req, res, next) => {
  try {
    const incidents = await Incident.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data: incidents
    });
  } catch (error) {
    next(error);
  }
};
