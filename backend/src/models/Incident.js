import mongoose from "mongoose";

const incidentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    location: { type: String, required: true },
    dept: { type: String, required: true },
    priority: { type: String, default: "Medium" },

    status: {
      type: String,
      enum: ["Pending", "Resolved"],
      default: "Pending",
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Incident", incidentSchema);
