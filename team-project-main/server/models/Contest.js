import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  options: { type: [String], required: true }, 
  correctOption: { type: Number, required: true },
});

const ContestSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  questions: [QuestionSchema],
  isActive: {
    type: Boolean,
    default: true,
  },
});

const Contest = mongoose.model("Contest", ContestSchema);

export default Contest;
