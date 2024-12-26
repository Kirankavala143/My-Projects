import express from "express";
import Question from "../models/Question.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { title, description, testCases } = req.body;

  if (!title || !description || !testCases || !testCases.length) {
    return res
      .status(400)
      .json({ error: "Title, description, and test cases are required" });
  }

  try {
    const newQuestion = new Question({ title, description, testCases });
    await newQuestion.save();
    res.status(201).json({ message: "Question created successfully" });
  } catch (error) {
    console.error("Error saving question:", error);
    res.status(500).json({ error: "Failed to create question" });
  }
});

router.get('/api/questions', async (req, res) => {
    try {
      const questions = await Question.find();
      res.json(questions);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
      console.log(error)
    }
  });

  router.get('/api/question/1/:id', async (req, res) => {
    try {
      const questions = await Question.findOne({_id : req.params.id});
      console.log(questions)
      res.json(questions);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
      console.log(error)
    }
  });
  

export default router;
