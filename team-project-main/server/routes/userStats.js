import express from "express";
import UserStats from "../models/UserStats.js";
import nodemailer from "nodemailer";

const router = express.Router();

router.post("/api/user/stats", async (req, res) => {
  try {
    const { userId, score, accuracy, points, rank, solvedQuestions, streak, recentActivity, recentContests } = req.body;

    if (!userId || score === undefined || accuracy === undefined || points === undefined) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userStats = await UserStats.findOneAndUpdate(
      { userId }, // Search by userId
      {
        $push: { quizStats: { score, accuracy, points, date: new Date() } },
        rank,
        solvedQuestions,
        streak,
        recentActivity,
        recentContests,
        lastActiveDate: new Date(),
      },
      { upsert: true, new: true } 
    );

    return res.status(200).json({ message: "Stats saved successfully", userStats });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

router.get("/api/user/stats/:userId", async (req, res) => {
  try {
    const userStats = await UserStats.findOne({ userId: req.params.userId });
    
    if (!userStats) {
      return res.json({ message: "User stats not found" });
    }

    return res.status(200).json({ userStats });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

router.post("/api/user/streak/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const userStats = await UserStats.findOne({ userId });

    if (!userStats) {
      return res.status(404).json({ message: "User stats not found" });
    }

    const today = new Date();
    const lastActive = new Date(userStats.lastActiveDate);
    const diffDays = Math.ceil((today - lastActive) / (1000 * 3600 * 24));

    let streak = userStats.streak;

    if (diffDays >= 7) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "raghuvarmakalidindi12345@gmail.com",
          pass: "raghu@123",
        },
      });

      const mailOptions = {
        from: "",
        to: userStats.userId.email,
        subject: "Reminder: Inactivity Detected",
        text: `You haven't participated in any activities for 7 days. Please log in to keep your streak!`,
      };

      await transporter.sendMail(mailOptions);

      userStats.notifications.push({
        message: "You haven't participated in 7 days. An email reminder has been sent.",
      });
    }

    if (diffDays === 1) {
      streak += 1;
    } else if (diffDays > 1) {
      streak = 1;
    }

    userStats.streak = streak;
    userStats.lastActiveDate = today;
    await userStats.save();

    res.json({ streak, lastActiveDate: userStats.lastActiveDate });
  } catch (err) {
    console.error("Error updating streak:", err);
    res.status(500).json({ message: "Error updating streak." });
  }
});

export default router;