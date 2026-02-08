import { ApiError } from "../utils/ApiError.js";

// Middleware to verify admin role
export const verifyAdmin = async (req, res, next) => {
  try {
    // Check if user exists and has admin role
    if (!req.user) {
      throw new ApiError(401, "Authentication required");
    }

    if (req.user.role !== "admin") {
      throw new ApiError(403, "Access denied. Admin privileges required.");
    }

    next();
  } catch (error) {
    next(error);
  }
};

// Middleware to verify staff role
export const verifyStaff = async (req, res, next) => {
  try {
    if (!req.user) {
      throw new ApiError(401, "Authentication required");
    }

    if (req.user.role !== "staff") {
      throw new ApiError(403, "Access denied. Staff privileges required.");
    }

    next();
  } catch (error) {
    next(error);
  }
};