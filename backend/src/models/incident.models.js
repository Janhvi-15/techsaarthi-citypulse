import mongoose from "mongoose";

const incidentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    category: {
      type: String,
      enum: [
        "Road Damage",
        "Water Leakage",
        "Garbage Overflow",
        "Street Light Issue",
        "Drainage Problem",
        "Public Toilet Issue",
        "Electricity Issue",
        "Footpath Issue",
        "Traffic Signal Issue"
      ],
      required: true
    },

    description: {
      type: String,
      trim: true
    },

    location: {
      type: String,
      required: true,
      trim: true
    },

    image: {
      type: String // store file path or URL
    },

    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

export const Incident = mongoose.model("Incident", incidentSchema);
