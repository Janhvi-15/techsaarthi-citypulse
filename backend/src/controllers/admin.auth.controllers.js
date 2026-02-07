import { User } from "../models/user.models.js";
import asyncHandler from "../utils/async-handler.js";
import { ApiError } from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

/**
 * ADMIN LOGIN
 */
export const adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const admin = await User.findOne({ email, role: "admin" });
  if (!admin) {
    throw new ApiError(404, "Admin not found");
  }

  const isPasswordValid = await admin.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid credentials");
  }

  const accessToken = admin.generateAccessToken();

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        user: {
          _id: admin._id,
          name: admin.name,
          email: admin.email,
          role: admin.role
        },
        accessToken
      },
      "Admin login successful"
    )
  );
});
