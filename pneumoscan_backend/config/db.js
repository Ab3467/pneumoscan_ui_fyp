import mongoose from "mongoose";

export const isDbConnected = () => mongoose.connection.readyState === 1;

const connectDB = async () => {
  mongoose.set("bufferCommands", false);

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    console.warn(
      "Continuing without MongoDB. Auth/history features may be unavailable until DB is reachable."
    );
  }
};

export default connectDB;
