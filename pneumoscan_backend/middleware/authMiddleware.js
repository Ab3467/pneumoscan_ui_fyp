import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id || decoded._id || decoded.userId || decoded.sub;
    if (!userId) {
      console.error("Auth middleware: token decoded without user id:", decoded);
      return res.status(401).json({ message: "Invalid token payload." });
    }
    req.user = { _id: userId, id: userId };
    next();
  } catch (error) {
    console.error("Auth middleware error:", error.message);
    return res.status(401).json({ message: "Invalid token." });
  }
};

export default authMiddleware;
