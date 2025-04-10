const express = require("express");
const cors = require("cors");
const app = express();

// Load environment variables
require("dotenv").config();
const MONGO_URL = process.env.MONGO_URL;

// Enable CORS Middleware
app.use(cors({
  origin: "https://truesplits.netlify.app",  // Netlify frontend
  credentials: true
}));


// Middleware
app.use(express.json());
global.otpStore = {};

// Import and Use Routes
const auth = require("./routes/auth");
app.use("/api/auth", auth);

// Check if MongoDB URL exists
if (!MONGO_URL) {
  console.error(" MONGO_URL is missing! Check your .env file.");
  process.exit(1);
}

// Connect to MongoDB
const dbconnect = require("./config/database");
dbconnect();

// Start Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));

// Default Route
app.get("/", (req, res) => {
  res.send("Backend is running! ");
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(" Server Error:", err.message);
  res.status(500).json({ error: "Server error", details: err.message });
});
