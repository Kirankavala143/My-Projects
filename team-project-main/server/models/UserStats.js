import mongoose from "mongoose";

const quizStatsSchema = new mongoose.Schema({
  score: { type: Number, required: true },
  accuracy: { type: Number, required: true },
  points: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});


const userStatsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  rank: { type: String, required: true },
  solvedQuestions: { type: Number, default: 0 },
  recentActivity: { type: Array, default: [] },
  streak: { type: Number, default: 0 },
  recentContests: { type: Array, default: [] },
  quizStats: [quizStatsSchema],

  lastActiveDate: { type: Date, default: Date.now },
  
  notifications: [
    {
      message: { type: String },
      dateSent: { type: Date, default: Date.now },
    },
  ],
});

export default mongoose.model("UserStats", userStatsSchema);
