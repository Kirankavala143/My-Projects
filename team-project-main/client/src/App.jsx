import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import Profile from "./User/Profile";
import Practice from "./User/Practice";
import Leader from "./User/Leader";
import Dashboard from "./User/Dashboard";
import ProfileUpdate from "./User/ProfileEdit";
import EditorComponent from "./User/Compiler";
import ContestList from "./User/ContestList";
import QuestionsPage from "./User/Questionpage";
import ProfileStats from "./User/ProfileStats";
import AdminL from "./Layouts/AdminL";
import UserL from "./Layouts/UserL";

export default function App() {
  return (
    <Router>
      <Toaster />
      <Routes>
        <Route path="/user" element={<UserL />}>
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="profile/edit/:id" element={<ProfileUpdate />} />
          <Route path="practice" element={<Practice />} />
          <Route path="practice/editor/:id" element={<EditorComponent />} />
          <Route path="leaderboard" element={<Leader />} />
          <Route path="profileStats/:id" element={<ProfileStats />} />
          <Route path="contests" element={<ContestList />} />
          <Route
            path="contests/:contestId/questions"
            element={<QuestionsPage />}
          />
        </Route>
        <Route path="/admin" element={<AdminL />}>
          <Route index element={<Admin />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route
          path="*"
          element={
            <h2 style={{ textAlign: "center" }}>404 - Page Not Found</h2>
          }
        />
      </Routes>
    </Router>
  );
}
