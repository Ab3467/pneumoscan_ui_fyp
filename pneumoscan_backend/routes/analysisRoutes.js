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
    const userId = req.user?._id || req.user?.id;

    console.log("Analysis history request user:", req.user, "Authorization:", req.headers.authorization);

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: Missing user ID." });
    }

    const analysis = new Analysis({
      user: userId,
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
    const userId = req.user?._id || req.user?.id;
    console.log("Fetch history request user:", req.user, "Authorization:", req.headers.authorization);
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: Missing user ID." });
    }

    const history = await Analysis.find({ user: userId }).sort({ createdAt: -1 });
    res.json(history);
  } catch (error) {
    console.error("Error fetching analysis history:", error);
    res.status(500).json({ message: "Server error while fetching history" });
  }
});

// @desc    Delete a specific analysis record
// @route   DELETE /api/analysis/:id
// @access  Private
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const userId = req.user?._id || req.user?.id;
    const analysisId = req.params.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: Missing user ID." });
    }

    const analysis = await Analysis.findById(analysisId);
    if (!analysis) {
      return res.status(404).json({ message: "Analysis record not found." });
    }

    if (analysis.user.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this record." });
    }

    await analysis.deleteOne();
    res.status(200).json({ message: "Analysis record deleted successfully.", id: analysisId });
  } catch (error) {
    console.error("Error deleting analysis record:", error);
    res.status(500).json({ message: "Server error while deleting analysis history" });
  }
});

export default router;
