const express = require("express");
const Task = require("../models/Task");

const router = express.Router();

// List all tasks
router.get("/", async (req, res, next) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    next(error);
  }
});

// Create a task
router.post("/", async (req, res, next) => {
  try {
    const title = String(req.body.title || "").trim();
    if (!title) {
      return res.status(400).json({ message: "Task title is required" });
    }
    const task = await Task.create({ title });
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
});

// Update task completion
router.patch("/:id", async (req, res, next) => {
  try {
    if (typeof req.body.completed !== "boolean") {
      return res.status(400).json({ message: "completed must be true or false" });
    }
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { completed: req.body.completed },
      { new: true, runValidators: true }
    );
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (error) {
    next(error);
  }
});

// Delete a task
router.delete("/:id", async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
