import React, { useEffect, useState } from "react";
import "./ProfileStats.css";
import { useParams } from "react-router-dom";

const ProfileStats = () => {
  const [stats, setStats] = useState({
    rank: "N/A",
    solvedQuestions: 0,
    recentActivity: [],
    streak: 0,
    recentContests: [],
    lastActiveDate: null,
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [contests, setContests] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `http://localhost:5000/api/stats/api/user/stats/${id}`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch stats. Status: ${response.status}`);
        }

        const data = await response.json();

        const fetchedStats = {
          rank: data.rank || "N/A",
          solvedQuestions: data.solvedQuestions || 0,
          recentActivity: data.recentActivity || [],
          streak: data.streak || 0,
          recentContests: data.recentContests || [],
          lastActiveDate: data.lastActiveDate || null,
        };

        setStats(fetchedStats);

        const contestResponse = await fetch("http://localhost:5000/api/contests");
        const contestData = await contestResponse.json();
        setContests(contestData);
      } catch (err) {
        console.error("Error fetching stats:", err.message);
        setError(err.message || "Something went wrong while fetching stats.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [id]);

  const daysSinceLastActivity = stats.lastActiveDate
    ? Math.ceil((new Date() - new Date(stats.lastActiveDate)) / (1000 * 3600 * 24))
    : null;

  return (
    <div className="profile-stats p-4 bg-white rounded shadow-md">
      <h2 className="text-lg font-bold mb-4">Profile Overview</h2>

      {loading ? (
        <div className="loading-spinner">
          <p>Loading...</p>
        </div>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="stats-section">
          <div className="stat-item mb-4">
            <h3 className="text-md font-bold">Rank</h3>
            <p>{stats.rank}</p>
          </div>

          <div className="stat-item mb-4">
            <h3 className="text-md font-bold">Questions Solved</h3>
            <p>{stats.solvedQuestions}</p>
          </div>

          <div className="stat-item mb-4">
            <h3 className="text-md font-bold">Streak</h3>
            <p>{stats.streak} days</p>
          </div>

          <div className="stat-item mb-4">
            <h3 className="text-md font-bold">Last Active</h3>
            {stats.lastActiveDate ? (
              <p>{new Date(stats.lastActiveDate).toLocaleDateString()}</p>
            ) : (
              <p>No activity recorded.</p>
            )}
            {daysSinceLastActivity && daysSinceLastActivity >= 7 && (
              <p className="text-red-500">You haven't participated for {daysSinceLastActivity} days. Please log in to keep your streak!</p>
            )}
          </div>

          <div className="stat-item mb-4">
            <h3 className="text-md font-bold">Recent Activity</h3>
            {stats.recentActivity.length > 0 ? (
              <ul>
                {stats.recentActivity.map((activity, index) => (
                  <li key={index}>{activity}</li>
                ))}
              </ul>
            ) : (
              <p>No recent activity available.</p>
            )}
          </div>

          <div className="stat-item mb-4">
            <h3 className="text-md font-bold">Recent Contests</h3>
            {contests.length > 0 ? (
              <ul>
                {contests.map((contest, index) => (
                  <li key={index}>{contest.title}</li>
                ))}
              </ul>
            ) : (
              <p>No recent contests available.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileStats;
