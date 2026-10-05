import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    department: { type: String, default: "Roads" }, // Power/Water/Roads/Drainage
    role: { type: String, default: "field" }, // admin/field/citizen
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
