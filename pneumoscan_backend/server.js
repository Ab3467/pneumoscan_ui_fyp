import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use("/api/auth", authRoutes);
import predictRoutes from "./routes/predictRoutes.js";
import analysisRoutes from "./routes/analysisRoutes.js";
app.use("/api", predictRoutes);
app.use("/api/analysis", analysisRoutes);

// Add root route to show backend is working
app.get("/", (req, res) => {
  res.json({
    message: "PneumoScan Backend API is running!",
    status: "active",
    endpoints: {
      predict: "/api/predict",
      auth: "/api/auth"
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
