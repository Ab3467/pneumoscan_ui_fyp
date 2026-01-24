import multer from "multer";
import axios from "axios";
import fs from "fs";
import path from "path";

// Configure multer to store file in memory (or temp disk if you prefer)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
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
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded." });
    }

    try {
      // Forward the image buffer to the Python inference service
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

      const { label, confidence } = pythonResponse.data;
      res.status(200).json({ label, confidence });
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
