import express from "express";

import { ApiError } from "./utils/ApiError.js";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS (if needed)
// app.use(cors());

// Routes
import incidentRouter from "./routes/incident.routes.js";
import authRouter from "./routes/auth.routes.js";
import staffAuthRouter from "./routes/staff.auth.routes.js";
import adminAuthRouter from "./routes/admin.auth.routes.js";

app.use("/api/v1/incidents", incidentRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/staff/auth", staffAuthRouter);
app.use("/api/v1/admin/auth", adminAuthRouter);


// Health check
app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "CityPulse Backend is ON 🚀",
    endpoints: {
      auth: "/api/auth",
      protected: "/api/protected"
    }
  });
});

// 404 Handler
app.use((req, res, next) => {
  next(new ApiError(404, `Route ${req.originalUrl} not found`));
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("🔥 ERROR:", err);

  // Handle JWT errors
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      success: false,
      message: "Invalid token"
    });
  }

  if (err.name === "TokenExpiredError") {
    return res.status(401).json({
      success: false,
      message: "Token expired"
    });
  }

  // Handle Mongoose validation errors
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({
      success: false,
      message: "Validation Error",
      errors
    });
  }

  // Handle Mongoose duplicate key error
  if (err.code === 11000) {
    return res.status(409).json({
      success: false,
      message: "Duplicate field value entered"
    });
  }

  // Default error response
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack })
  });
});

export default app;