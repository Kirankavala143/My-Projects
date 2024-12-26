const express = require('express');
const Question = require('../models/Question');
const router = express.Router();

router.post('/api/questions', async (req, res) => {
  const { title, description, testCases } = req.body;

  try {
    const newQuestion = new Question({
      title,
      description,
      testCases,
    });

    await newQuestion.save();
    res.status(201).json({ message: 'Question created successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating question' });
  }
});

module.exports = router;
