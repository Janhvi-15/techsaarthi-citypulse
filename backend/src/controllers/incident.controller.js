import { Incident } from "../models/incident.models.js";
import { StaffAssignment } from "../models/staffAssignment.models.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";

export const createIncident = async (req, res, next) => {
  try {
    const {
      title,
      category,
      description,
      address,
      latitude,
      longitude
    } = req.body;

    if (!title || !category || !address || !latitude || !longitude) {
      throw new ApiError(400, "Required fields missing");
    }

    // Check submission limit (3 incidents per user)
    if (req.user?._id) {
      const userIncidentCount = await Incident.countDocuments({
        reportedBy: req.user._id
      });

      if (userIncidentCount >= 3) {
        throw new ApiError(403, "You have reached the maximum limit of 3 incident reports. Please wait for your existing reports to be resolved.");
      }
    }

    const incident = await Incident.create({
      title,
      category,
      description,
      location: {
        address,
        latitude,
        longitude
      },
      image: req.file ? `/uploads/incidents/${req.file.filename}` : null,
      reportedBy: req.user?._id
    });

    res.status(201).json({
      success: true,
      message: "Incident reported successfully",
      data: incident,
      remainingSubmissions: 3 - (await Incident.countDocuments({ reportedBy: req.user?._id }))
    });
  } catch (error) {
    next(error);
  }
};

export const getAllIncidents = async (req, res, next) => {
  try {
    const incidents = await Incident.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: incidents
    });
  } catch (error) {
    next(error);
  }
};

// Upvote an incident - Twitter style
export const upvoteIncident = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user?._id;

    if (!userId) {
      throw new ApiError(401, "Authentication required");
    }

    const incident = await Incident.findById(id);
    
    if (!incident) {
      throw new ApiError(404, "Incident not found");
    }

    // Check if user already upvoted
    const hasUpvoted = incident.upvotes.includes(userId);
    const hasDownvoted = incident.downvotes.includes(userId);

    let updateOperation = {};

    if (hasUpvoted) {
      // Remove upvote (toggle off)
      updateOperation = {
        $pull: { upvotes: userId },
        $inc: { upvoteCount: -1 }
      };
    } else {
      // Add upvote
      updateOperation = {
        $addToSet: { upvotes: userId },
        $inc: { upvoteCount: 1 }
      };

      // Remove downvote if exists (Twitter-style: can't have both)
      if (hasDownvoted) {
        updateOperation.$pull = { downvotes: userId };
        if (!updateOperation.$inc) updateOperation.$inc = {};
        updateOperation.$inc.downvoteCount = -1;
      }
    }

    const updatedIncident = await Incident.findByIdAndUpdate(
      id,
      updateOperation,
      { new: true, runValidators: false }
    );

    res.status(200).json({
      success: true,
      message: hasUpvoted ? "Upvote removed" : "Upvoted successfully",
      data: {
        upvoteCount: updatedIncident.upvoteCount,
        downvoteCount: updatedIncident.downvoteCount,
        hasUpvoted: !hasUpvoted,
        hasDownvoted: false
      }
    });
  } catch (error) {
    next(error);
  }
};

// Downvote an incident - Twitter style
export const downvoteIncident = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user?._id;

    if (!userId) {
      throw new ApiError(401, "Authentication required");
    }

    const incident = await Incident.findById(id);
    
    if (!incident) {
      throw new ApiError(404, "Incident not found");
    }

    // Check if user already downvoted
    const hasUpvoted = incident.upvotes.includes(userId);
    const hasDownvoted = incident.downvotes.includes(userId);

    let updateOperation = {};

    if (hasDownvoted) {
      // Remove downvote (toggle off)
      updateOperation = {
        $pull: { downvotes: userId },
        $inc: { downvoteCount: -1 }
      };
    } else {
      // Add downvote
      updateOperation = {
        $addToSet: { downvotes: userId },
        $inc: { downvoteCount: 1 }
      };

      // Remove upvote if exists (Twitter-style: can't have both)
      if (hasUpvoted) {
        updateOperation.$pull = { upvotes: userId };
        if (!updateOperation.$inc) updateOperation.$inc = {};
        updateOperation.$inc.upvoteCount = -1;
      }
    }

    const updatedIncident = await Incident.findByIdAndUpdate(
      id,
      updateOperation,
      { new: true, runValidators: false }
    );

    res.status(200).json({
      success: true,
      message: hasDownvoted ? "Downvote removed" : "Downvoted successfully",
      data: {
        upvoteCount: updatedIncident.upvoteCount,
        downvoteCount: updatedIncident.downvoteCount,
        hasUpvoted: false,
        hasDownvoted: !hasDownvoted
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get user's vote status for an incident
export const getVoteStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user?._id;

    if (!userId) {
      return res.status(200).json({
        success: true,
        data: {
          hasUpvoted: false,
          hasDownvoted: false
        }
      });
    }

    const incident = await Incident.findById(id);
    
    if (!incident) {
      throw new ApiError(404, "Incident not found");
    }

    res.status(200).json({
      success: true,
      data: {
        hasUpvoted: incident.upvotes.includes(userId),
        hasDownvoted: incident.downvotes.includes(userId),
        upvoteCount: incident.upvoteCount,
        downvoteCount: incident.downvoteCount
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get user's submission count and remaining submissions
export const getUserSubmissionCount = async (req, res, next) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      throw new ApiError(401, "Authentication required");
    }

    const count = await Incident.countDocuments({
      reportedBy: userId
    });

    res.status(200).json({
      success: true,
      data: {
        totalSubmissions: count,
        remainingSubmissions: Math.max(0, 3 - count),
        limit: 3,
        canSubmit: count < 3
      }
    });
  } catch (error) {
    next(error);
  }
};

// ============================================
// STAFF ASSIGNMENT - NO AUTH REQUIRED
// ============================================

export const assignStaffToIncident = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { staffId, priority, notes } = req.body;

    console.log("🔥 Assign Staff Request:", { id, staffId, priority });

    if (!staffId) {
      return res.status(400).json({
        success: false,
        message: "staffId is required"
      });
    }

    // Check staff exists and has staff role
    const staff = await User.findById(staffId);
    if (!staff || staff.role !== "staff") {
      return res.status(404).json({
        success: false,
        message: "Valid staff not found"
      });
    }

    // Find incident
    const incident = await Incident.findById(id);
    if (!incident) {
      return res.status(404).json({
        success: false,
        message: "Incident not found"
      });
    }

    // Check if already assigned to prevent duplicate assignments
    const existingAssignment = await StaffAssignment.findOne({
      incidentId: id,
      assignmentStatus: { $in: ["Assigned", "In Progress"] }
    });

    if (existingAssignment) {
      return res.status(400).json({
        success: false,
        message: "This incident is already assigned to a staff member"
      });
    }

    // Create staff assignment record
    const staffAssignment = await StaffAssignment.create({
      incidentId: id,
      staffId: staffId,
      title: incident.title,
      address: incident.location.address,
      priority: priority || "Medium",
      category: incident.category,
      assignedBy: req.user?._id || null, // Optional - can be null if no auth
      notes: notes || ""
    });

    // Update incident with assigned staff and change status
    incident.assignedStaff = staffId;
    incident.status = "Pending";
    await incident.save();

    // Populate staff details for response
    await staffAssignment.populate("staffId", "name email");
    
    console.log("✅ Staff Assigned Successfully:", staffAssignment._id);

    return res.status(200).json({
      success: true,
      message: "Staff assigned successfully",
      data: {
        incident: incident,
        assignment: staffAssignment
      }
    });
  } catch (error) {
    console.error("❌ Assign Staff Error:", error);
    next(error);
  }
};

// Get all assignments for a specific staff member - NO AUTH
export const getStaffAssignments = async (req, res, next) => {
  try {
    const { staffId } = req.params;
    const { status } = req.query;

    const filter = { staffId };
    
    if (status) {
      filter.assignmentStatus = status;
    }

    const assignments = await StaffAssignment.find(filter)
      .populate("incidentId")
      .populate("staffId", "name email")
      .populate("assignedBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: assignments.length,
      data: assignments
    });
  } catch (error) {
    next(error);
  }
};

// Update assignment status - NO AUTH
export const updateAssignmentStatus = async (req, res, next) => {
  try {
    const { assignmentId } = req.params;
    const { status, notes } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required"
      });
    }

    const assignment = await StaffAssignment.findById(assignmentId);
    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: "Assignment not found"
      });
    }

    assignment.assignmentStatus = status;
    if (notes) {
      assignment.notes = notes;
    }

    // Set completion time if status is Completed
    if (status === "Completed") {
      assignment.completedAt = new Date();
      
      // Update incident status as well
      await Incident.findByIdAndUpdate(assignment.incidentId, {
        status: "Resolved"
      });
    }

    await assignment.save();

    res.status(200).json({
      success: true,
      message: "Assignment status updated successfully",
      data: assignment
    });
  } catch (error) {
    next(error);
  }
};

// Get all assignments - NO AUTH
export const getAllAssignments = async (req, res, next) => {
  try {
    const { status, priority } = req.query;
    
    const filter = {};
    if (status) filter.assignmentStatus = status;
    if (priority) filter.priority = priority;

    const assignments = await StaffAssignment.find(filter)
      .populate("incidentId")
      .populate("staffId", "name email")
      .populate("assignedBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: assignments.length,
      data: assignments
    });
  } catch (error) {
    next(error);
  }
};