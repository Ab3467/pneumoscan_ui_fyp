import multer from "multer";
import axios from "axios";
import fs from "fs";
import path from "path";
import FormData from "form-data";

// Configure multer to store file in memory
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB limit
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
      console.log("Forwarding request to Python service at:", process.env.INFERENCE_SERVICE_URL);
      
      // Create FormData for axios (using form-data package for Node.js)
      const formData = new FormData();
      formData.append("file", req.file.buffer, {
        filename: req.file.originalname,
        contentType: req.file.mimetype
      });

      const pythonResponse = await axios.post(
        `${process.env.INFERENCE_SERVICE_URL}/predict`,
        formData,
        {
          headers: formData.getHeaders(),
          timeout: 30000, // 30 second timeout
        }
      );
      console.log("Python response received:", pythonResponse.data);

      const { label, confidence, heatmap, is_chest_xray, message, chest_confidence } = pythonResponse.data;

      // Handle invalid images (not chest X-rays)
      if (is_chest_xray === false) {
        console.log("INVALID IMAGE: Not a chest X-ray");
        return res.status(400).json({
          message: message || "The uploaded image does not appear to be a chest X-ray. Please upload a proper chest X-ray image.",
          isValidChestXray: false,
          chestConfidence: chest_confidence
        });
      }

      // Valid chest X-ray - proceed with pneumonia analysis
      const responsePayload = {
        label,
        confidence,
        isValidChestXray: true,
        chestConfidence: chest_confidence
      };

      if (heatmap) responsePayload.heatmap = heatmap;

      res.status(200).json(responsePayload);
    } catch (error) {
      console.error("Prediction error:", error.message);
      if (error.response) {
        console.error("Python service error:", error.response.status, error.response.data);
        return res
          .status(error.response.status || 500)
          .json({ message: error.response.data?.detail || "Prediction failed." });
      }
      res.status(500).json({ message: error.message || "Internal server error." });
    }
  },
];
