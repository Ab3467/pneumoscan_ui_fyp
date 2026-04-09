import multer from "multer";
import axios from "axios";
import fs from "fs";
import path from "path";

// Configure multer to store file in memory (or temp disk if you prefer)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB limit (increased from 10MB)
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only JPEG and PNG images are allowed."), false);
    }
  },
});

export const predict = [
  upload.single("image"),
  async (req, res) => {
    console.log("=== PREDICTION REQUEST RECEIVED ===");
    console.log("File:", req.file ? "YES" : "NO");
    console.log("Filename:", req.file?.originalname);
    console.log("Mimetype:", req.file?.mimetype);
    
    if (!req.file) {
      console.log("ERROR: No image uploaded");
      return res.status(400).json({ message: "No image uploaded." });
    }

    try {
      console.log("Forwarding request to Python service...");
      const formData = new FormData();
      formData.append("file", new Blob([req.file.buffer]), req.file.originalname);

      console.log("Forwarding request to Python service...");
      const pythonResponse = await axios.post(
        `${process.env.INFERENCE_SERVICE_URL}/predict`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Python response:", pythonResponse.data);

      const { label, confidence, validator_label, validator_confidence } = pythonResponse.data;
      const responsePayload = { label, confidence };
      if (validator_label !== undefined) responsePayload.validator_label = validator_label;
      if (validator_confidence !== undefined) responsePayload.validator_confidence = validator_confidence;
      res.status(200).json(responsePayload);
    } catch (error) {
      console.error("Prediction error:", error.toJSON ? error.toJSON() : error.message);
      if (error.response) {
        console.error("Python service responded with:", error.response.status, error.response.data);
        return res
          .status(error.response.status)
          .json({ message: error.response.data.detail || "Prediction failed." });
      }
      res.status(500).json({ message: "Internal server error." });
    }
  },
];
