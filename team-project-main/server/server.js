import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import path from 'path';
import DbCon from './utlis/db.js';
import AuthRoutes from './routes/Auth.js';
import QuestionRoutes from './routes/Question.js';
import AdminRoutes from './models/AdminRoutes.js';
import ContestRoutes from './routes/contestRoutes.js';
import UserStats from './models/UserStats.js';
import UserStatsRoutes from './routes/userStats.js';
import jwt from "jsonwebtoken";
import UserModel from './models/user.js';

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

DbCon();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/profileImages/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

app.use('/uploads', express.static(path.join(path.resolve(), 'uploads')));

app.use('/api/auth', AuthRoutes);
app.use('/api/questions', QuestionRoutes);
app.use('/api/admin', AdminRoutes);
app.use('/api/contests', ContestRoutes);
app.use('/api/stats', UserStatsRoutes);


app.get('/api/findProfile', async (req, res) => {
  try {
    const token = req.cookies?.token; 
    if (!token) {
      return res.status(403).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userData = await UserModel.findOne({ _id: decoded.userId }); 

    if (!userData) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(userData);
  } catch (error) {
    console.error('Error retrieving profile:', error.message);
    res.status(500).json({ message: 'Error retrieving profile', error: error.message });
  }
});

app.put('/api/updateProfile', async (req, res) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(403).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { name, phone, email, gender, address, department, domain } = req.body;

    const updatedData = await UserModel.findOneAndUpdate(
      { _id: decoded.userId },
      { name, phone, email, gender, address, department, domain }, 
      { new: true } 
    );

    if (!updatedData) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(updatedData);
  } catch (error) {
    console.error('Error updating profile:', error.message);
    res.status(500).json({ message: 'Error updating profile', error: error.message });
  }
});


app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
