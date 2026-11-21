const express = require("express");
const mongoose = require("mongoose");
const taskRoutes = require("./routes/tasks");

const app = express();
const PORT = Number(process.env.PORT || 5000);
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    service: "backend",
    database: mongoose.connection.readyState === 1 ? "connected" : "disconnected"
  });
});

app.use("/api/tasks", taskRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((error, req, res, next) => {
  console.error(error);
  if (error.name === "CastError" || error.name === "ValidationError") {
    return res.status(400).json({ message: error.message });
  }
  res.status(500).json({ message: "Internal server error" });
});

async function start() {
  if (!MONGO_URI) {
    throw new Error("MONGO_URI environment variable is required");
  }

  await mongoose.connect(MONGO_URI, {
    serverSelectionTimeoutMS: 10000
  });
  console.log("Connected to MongoDB");

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Backend API listening on port ${PORT}`);
  });
}

start().catch((error) => {
  console.error("Failed to start backend:", error.message);
  process.exit(1);
});
