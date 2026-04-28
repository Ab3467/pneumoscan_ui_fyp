import express from "express";
import { predict } from "../controllers/predictController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Protect the predict endpoint with authentication (optional: remove authMiddleware if you want public)
// router.post("/predict", authMiddleware, predict);
router.post("/predict", predict);

export default router;
