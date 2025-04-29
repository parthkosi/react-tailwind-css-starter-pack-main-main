const jwt = require("jsonwebtoken");
const JWT_SECRET = "jwt";

// Middleware to check if the user is authenticated
const authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", ""); // Retrieve token from the request header

  if (!token) {
    return res
      .status(403)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    // Verify token and extract user ID
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(400).json({ message: "Invalid token" });
  }
};

module.exports = authenticateJWT;
