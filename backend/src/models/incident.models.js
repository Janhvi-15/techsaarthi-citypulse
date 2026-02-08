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
      address: {
        type: String,
        required: true
      },
      latitude: {
        type: Number,
        required: true
      },
      longitude: {
        type: Number,
        required: true
      }
    },

    image: {
      type: String
    },

    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    status: {
      type: String,
      default: "Open"
    },

    // Upvote/Downvote tracking
    upvotes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }],

    downvotes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }],

    upvoteCount: {
      type: Number,
      default: 0
    },

    downvoteCount: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

// Virtual for net votes (upvotes - downvotes)
incidentSchema.virtual("netVotes").get(function() {
  return this.upvoteCount - this.downvoteCount;
});

// Ensure virtuals are included in JSON
incidentSchema.set("toJSON", { virtuals: true });
incidentSchema.set("toObject", { virtuals: true });

export const Incident = mongoose.model("Incident", incidentSchema);