import express from "express";
import Analysis from "../models/Analysis.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// @desc    Add new analysis result to history
// @route   POST /api/analysis
// @access  Private
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { label, confidence, imageUrl, heatmapUrl } = req.body;

    const analysis = new Analysis({
      user: req.user._id,
      label,
      confidence,
      imageUrl,
      heatmapUrl,
    });

    const savedAnalysis = await analysis.save();
    res.status(201).json(savedAnalysis);
  } catch (error) {
    console.error("Error saving analysis:", error);
    res.status(500).json({ message: "Server error while saving analysis history" });
  }
});

// @desc    Get user's analysis history
// @route   GET /api/analysis
// @access  Private
router.get("/", authMiddleware, async (req, res) => {
  try {
    const history = await Analysis.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(history);
  } catch (error) {
    console.error("Error fetching analysis history:", error);
    res.status(500).json({ message: "Server error while fetching history" });
  }
});

export default router;
