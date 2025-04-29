const express = require("express");
const cors = require("cors");
const app = express();

// Load environment variables
require("dotenv").config();
const MONGO_URL = process.env.MONGO_URL;

// Enable CORS Middleware
app.use(
  cors({
    origin: ["http://localhost:3000", "https://truesplits.netlify.app"],
    credentials: true,
  })
);

app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// Middleware
app.use(express.json());
global.otpStore = {};

// Import and Use Routes
const authRoutes = require("./routes/auth");
const friendRoutes = require("./routes/friends");
const groupRoutes = require("./routes/groups");
const userRoutes = require("./routes/user")

app.use("/api/auth", authRoutes);
app.use("/api/friends", friendRoutes);
app.use("/api/groups", groupRoutes);
app.use('/api', userRoutes);


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
