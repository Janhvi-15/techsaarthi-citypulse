import { User } from "../models/user.models.js";
import asyncHandler from "../utils/async-handler.js";
import { ApiError } from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

/**
 * REGISTER STAFF
 */
export const registerStaff = asyncHandler(async (req, res) => {
  const { name, email, password, workCategory, workLocation } = req.body;

  if (!name || !email || !password || !workCategory || !workLocation) {
    throw new ApiError(400, "All fields are required");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }

  const staff = await User.create({
    name,
    email,
    password,
    role: "staff",
    workCategory,
    workLocation
  });

  return res.status(201).json(
    new ApiResponse(
      201,
      {
        _id: staff._id,
        name: staff.name,
        email: staff.email,
        role: staff.role,
        workCategory: staff.workCategory,
        workLocation: staff.workLocation
      },
      "Staff registered successfully"
    )
  );
});

/**
 * LOGIN STAFF
 */
export const loginStaff = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const staff = await User.findOne({ email, role: "staff" });
  if (!staff) {
    throw new ApiError(404, "Staff not found");
  }

  const isPasswordValid = await staff.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid credentials");
  }

  const accessToken = staff.generateAccessToken();

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        user: {
          _id: staff._id,
          name: staff.name,
          email: staff.email,
          role: staff.role,
          workCategory: staff.workCategory,
          workLocation: staff.workLocation
        },
        accessToken
      },
      "Staff login successful"
    )
  );
});
