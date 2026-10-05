import mongoose from "mongoose";

const incidentSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    dept: String, // Power/Water/Roads/Drainage
    priority: String, // Critical/High/Medium/Low
    status: { type: String, default: "Open" }, // Open/In Progress/On Hold/Resolved
    locationText: String,
    coords: { lat: Number, lng: Number },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    updates: [
      {
        status: String,
        notes: String,
        updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        updatedAt: Date,
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.model("Incident", incidentSchema);
