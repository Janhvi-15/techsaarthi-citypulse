import mongoose from "mongoose";
import dns from "dns";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URL || process.env.MONGODB_URI;

    if (!uri) {
      throw new Error("MONGODB_URL (or MONGODB_URI) missing in .env");
    }

    await mongoose.connect(uri);

    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB error:", err.message);
    process.exit(1);
  }
};

export default connectDB;
