import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("🔐 Auth Middleware - Authorization header:", authHeader ? "EXISTS" : "MISSING");
  
  const token = authHeader?.split(" ")[1]; // Bearer <token>

  if (!token) {
    console.error("🔐 Auth error: No token provided");
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    console.log("🔐 Verifying token with JWT_SECRET...");
    console.log("🔐 Token (first 50 chars):", token.substring(0, 50) + "...");
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("🔐 Token verified successfully. Decoded:", decoded);
    
    const userId = decoded.id || decoded._id || decoded.userId || decoded.sub;
    if (!userId) {
      console.error("🔐 Auth middleware: token decoded without user id:", decoded);
      return res.status(401).json({ message: "Invalid token payload." });
    }
    req.user = { _id: userId, id: userId };
    next();
  } catch (error) {
    console.error("🔐 Auth middleware JWT error:", error.message);
    console.error("🔐 JWT_SECRET in use:", process.env.JWT_SECRET ? "SET" : "NOT SET");
    return res.status(401).json({ message: "Invalid token." });
  }
};

export default authMiddleware;
