import { Incident } from "../models/incident.models.js";
import asyncHandler from "../utils/async-handler.js";
import { ApiError } from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

/**
 * POST /api/v1/incidents
 * Citizen reports an incident
 */
export const createIncident = asyncHandler(async (req, res) => {
  const { title, category, description, location } = req.body;

  if (!title || !category || !location) {
    throw new ApiError(400, "Title, category and location are required");
  }

  const incident = await Incident.create({
    title,
    category,
    description,
    location,
    reportedBy: req.user?._id // works even without login
  });

  return res.status(201).json(
    new ApiResponse(201, incident, "Incident reported successfully")
  );
});

/**
 * GET /api/v1/incidents
 * Public dashboard
 */
export const getAllIncidents = asyncHandler(async (req, res) => {
  const incidents = await Incident.find().sort({ createdAt: -1 });

  return res.status(200).json(
    new ApiResponse(200, incidents, "Incidents fetched successfully")
  );
});
