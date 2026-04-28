import User from "../models/User.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { isDbConnected } from "../config/db.js";

// Email configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const ensureDbConnection = (res) => {
  if (!isDbConnected()) {
    res.status(503).json({
      message: "Database is not connected. Please check MongoDB and try again.",
    });
    return false;
  }
  return true;
};

const handleDbBufferingError = (error, res) => {
  if (
    error?.message?.includes("buffering timed out") ||
    error?.message?.includes("before initial connection is complete")
  ) {
    return res.status(503).json({
      message: "Database is not connected. Please check MongoDB and try again.",
    });
  }
  return null;
};

// Signup
export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!ensureDbConnection(res)) return;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ name, email, password });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    console.error("Signup error:", error);
    const dbErrorResponse = handleDbBufferingError(error, res);
    if (dbErrorResponse) return;
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!ensureDbConnection(res)) return;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    console.error("Login error:", error);
    const dbErrorResponse = handleDbBufferingError(error, res);
    if (dbErrorResponse) return;
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Forgot Password
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    if (!ensureDbConnection(res)) return;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes

    user.resetToken = resetToken;
    user.resetTokenExpiry = resetTokenExpiry;
    await user.save();

    // Create reset URL
    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

    // Try to send email, but don't fail if email credentials are not configured
    if (process.env.EMAIL_USER && process.env.EMAIL_USER !== "your-email@gmail.com") {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Password Reset Request",
        html: `
          <h2>Password Reset</h2>
          <p>You requested a password reset. Click the link below to reset your password:</p>
          <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; background-color: #0ea5e9; color: white; text-decoration: none; border-radius: 5px;">Reset Password</a>
          <p>This link will expire in 10 minutes.</p>
          <p>If you didn't request this, ignore this email.</p>
        `,
      };

      try {
        await transporter.sendMail(mailOptions);
        console.log("Password reset email sent to:", email);
      } catch (emailError) {
        console.error("Email sending error:", emailError.message);
        // Continue anyway - user can still use the reset link
      }
    } else {
      console.log("Email not configured. Reset link:", resetUrl);
    }

    res.status(200).json({ 
      message: "Password reset link sent. For testing, use this link: " + resetUrl,
      resetUrl: resetUrl 
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    const dbErrorResponse = handleDbBufferingError(error, res);
    if (dbErrorResponse) return;
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Reset Password
export const resetPassword = async (req, res) => {
  const { resetToken, password } = req.body;

  try {
    if (!ensureDbConnection(res)) return;

    const user = await User.findOne({
      resetToken,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ message: "Invalid or expired reset token" });

    user.password = password;
    user.resetToken = null;
    user.resetTokenExpiry = null;
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Reset password error:", error);
    const dbErrorResponse = handleDbBufferingError(error, res);
    if (dbErrorResponse) return;
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete Account
export const deleteAccount = async (req, res) => {
  const { userId } = req.body;

  try {
    if (!ensureDbConnection(res)) return;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    console.error("Delete account error:", error);
    const dbErrorResponse = handleDbBufferingError(error, res);
    if (dbErrorResponse) return;
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update Profile
export const updateProfile = async (req, res) => {
  const { name, email } = req.body;
  const userId = req.user.id || req.user._id;

  try {
    if (!ensureDbConnection(res)) return;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check if email is being changed and if it's already taken
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(400).json({ message: "Email already in use" });
    }

    if (name) user.name = name;
    if (email) user.email = email;

    await user.save();

    res.status(200).json({ 
      message: "Profile updated successfully",
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (error) {
    console.error("Update profile error:", error);
    const dbErrorResponse = handleDbBufferingError(error, res);
    if (dbErrorResponse) return;
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Change Password
export const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user.id || req.user._id;

  try {
    if (!ensureDbConnection(res)) return;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Verify current password
    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) return res.status(400).json({ message: "Current password is incorrect" });

    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Change password error:", error);
    const dbErrorResponse = handleDbBufferingError(error, res);
    if (dbErrorResponse) return;
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
