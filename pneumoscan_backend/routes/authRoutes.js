import express from "express";
import { signup, login, forgotPassword, resetPassword, deleteAccount } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.delete("/delete-account", deleteAccount);

export default router;
