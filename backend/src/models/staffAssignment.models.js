import mongoose from "mongoose";

const staffAssignmentSchema = new mongoose.Schema(
  {
    incidentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Incident",
      required: true
    },

    staffId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    staffEmail: {
      type: String,
      trim: true,
      lowercase: true
      // Not required - will be auto-populated
    },

    title: {
      type: String,
      required: true,
      trim: true
    },

    address: {
      type: String,
      required: true,
      trim: true
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High", "Critical"],
      default: "Medium"
    },

    category: {
      type: String,
      required: true
    },

    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    assignmentStatus: {
      type: String,
      enum: ["Assigned", "In Progress", "Completed", "Cancelled"],
      default: "Assigned"
    },

    assignedAt: {
      type: Date,
      default: Date.now
    },

    completedAt: {
      type: Date
    },

    notes: {
      type: String,
      trim: true
    }
  },
  { timestamps: true }
);

// Auto-populate staffEmail before saving
staffAssignmentSchema.pre('save', async function() {
  // When using async function, don't use next parameter or call it
  if (this.isNew && this.staffId && !this.staffEmail) {
    try {
      const User = mongoose.model('User');
      const staff = await User.findById(this.staffId).select('email');
      if (staff && staff.email) {
        this.staffEmail = staff.email;
      }
    } catch (error) {
      console.error('Error auto-populating staffEmail:', error);
      // Don't throw - allow save to continue even if email lookup fails
    }
  }
  // No next() call needed with async function
});

// Indexes for faster queries
staffAssignmentSchema.index({ staffId: 1, assignmentStatus: 1 });
staffAssignmentSchema.index({ staffEmail: 1, assignmentStatus: 1 });
staffAssignmentSchema.index({ incidentId: 1 });

export const StaffAssignment = mongoose.model("StaffAssignment", staffAssignmentSchema);