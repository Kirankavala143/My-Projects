import express from "express";
import Contest from "../models/Contest.js";
import mongoose from "mongoose";

const router = express.Router();

router.post("/add", async (req, res) => {
  const { title, startTime, description, category, questions } = req.body;

  if (!title || !startTime || !description || !category) {
    return res.status(400).json({ message: "Missing required fields: title, startTime, description, category" });
  }

  if (!questions || !Array.isArray(questions) || questions.length < 1) {
    return res.status(400).json({ message: "At least one question is required" });
  }

  const contest = new Contest({
    title,
    startTime,
    description,
    category,
    questions,
    isActive: true,
  });

  try {
    await contest.save();
    res.status(201).json(contest);
  } catch (error) {
    res.status(400).json({ message: "Failed to create contest", error });
  }
});

router.get("/", async (req, res) => {
  try {
    const contests = await Contest.find();
    res.json(contests);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve contests", error });
  }
});

router.get("/:id/questions", async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid contest ID format" });
    }

    const contest = await Contest.findById(id);

    if (!contest) {
      return res.status(404).json({ message: "Contest not found" });
    }

    res.json({ questions: contest.questions });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve questions", error });
  }
});

router.patch("/:id/add-questions", async (req, res) => {
  const { id } = req.params;
  const { questions } = req.body;

  if (!questions || !Array.isArray(questions) || questions.length < 1) {
    return res.status(400).json({ message: "At least one question is required" });
  }

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid contest ID format" });
    }

    const contest = await Contest.findById(id);

    if (!contest) {
      return res.status(404).json({ message: "Contest not found" });
    }

    contest.questions.push(...questions);

    await contest.save();
    res.json(contest);
  } catch (error) {
    res.status(400).json({ message: "Failed to add questions", error });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid contest ID format" });
    }

    const contest = await Contest.findById(id);

    if (!contest) {
      return res.status(404).json({ message: "Contest not found" });
    }

    res.json(contest);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve contest", error });
  }
});

export default router;
