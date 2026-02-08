import { Router } from "express";
import {
  createIncident,
  getAllIncidents,
  upvoteIncident,
  downvoteIncident,
  getVoteStatus,
  getUserSubmissionCount,
  assignStaffToIncident,
  getStaffAssignments,
  updateAssignmentStatus,
  getAllAssignments
} from "../controllers/incident.controller.js";

import { upload } from "../middleware/upload.middleware.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

// Public routes
router.get("/", getAllIncidents);

// Create incident
router.post(
  "/",
  verifyJWT,
  upload.single("image"),
  createIncident
);

// Votes
router.post("/:id/upvote", verifyJWT, upvoteIncident);
router.post("/:id/downvote", verifyJWT, downvoteIncident);
router.get("/:id/vote-status", getVoteStatus);

// User submission count
router.get("/user/submission-count", verifyJWT, getUserSubmissionCount);

// ============================================
// STAFF ASSIGNMENT ROUTES - NO AUTH REQUIRED
// ============================================

// Assign staff to incident - PUBLIC (No authentication)
router.patch("/:id/assign", assignStaffToIncident);

// Get all assignments for a specific staff member - PUBLIC
router.get("/assignments/staff/:staffId", getStaffAssignments);

// Get all assignments - PUBLIC
router.get("/assignments", getAllAssignments);

// Update assignment status - PUBLIC
router.patch("/assignments/:assignmentId/status", updateAssignmentStatus);

export default router;