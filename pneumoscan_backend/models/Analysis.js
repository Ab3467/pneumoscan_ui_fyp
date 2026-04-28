import mongoose from "mongoose";

const analysisSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    label: {
      type: String,
      required: true,
      enum: ["NORMAL", "PNEUMONIA"],
    },
    confidence: {
      type: Number,
      required: true,
    },
    imageUrl: {
      type: String, // Store as Base64 for now as per simplicity plan
      required: true,
    },
    heatmapUrl: {
      type: String, // Store as Base64
      required: false,
    },
    status: {
      type: String,
      default: "completed",
    },
  },
  { timestamps: true }
);

const Analysis = mongoose.model("Analysis", analysisSchema);
export default Analysis;
