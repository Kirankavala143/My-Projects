import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ContestList.css";

const ContestList = () => {
  const [contests, setContests] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContests() {
      try {
        const response = await fetch("http://localhost:5000/api/contests");
        console.log()
        if (!response.ok) {
          throw new Error("Failed to fetch contests");
        }
        const data = await response.json();
        setContests(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchContests();
  }, []);

  if (loading) {
    return <div>Loading contests...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  const biweeklyContests = contests.filter(
    (contest) => contest.category === "Biweekly"
  );
  const monthlyContests = contests.filter(
    (contest) => contest.category === "Monthly"
  );
  const dailyContests = contests.filter(
    (contest) => contest.category === "Daily"
  );

  return (
    <div>
      {biweeklyContests.length > 0 && (
        <div className="contest-category-section">
          <h2>Biweekly Battles</h2>
          <div className="contest-card-container">
            {biweeklyContests.map((contest) => (
              <Link
                key={contest._id}
                to={`/user/contests/${contest._id}/questions`}
                className="contest-card"
              >
                <div className="card-content">
                  <h2 className="contest-title">{contest.title}</h2>
                  <p className="contest-description">{contest.description}</p>
                  <p className="contest-timing">
                    Starts at: {new Date(contest.startTime).toLocaleString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {monthlyContests.length > 0 && (
        <div className="contest-category-section">
          <h2>Monthly Masters</h2>
          <div className="contest-card-container">
            {monthlyContests.map((contest) => (
              <Link
                key={contest._id}
                to={`/user/contests/${contest._id}/questions`}
                className="contest-card"
              >
                <div className="card-content">
                  <h2 className="contest-title">{contest.title}</h2>
                  <p className="contest-description">{contest.description}</p>
                  <p className="contest-timing">
                    Starts at: {new Date(contest.startTime).toLocaleString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {dailyContests.length > 0 && (
        <div className="contest-category-section">
          <h2>Daily Contests</h2>
          <div className="contest-card-container">
            {dailyContests.map((contest) => (
              <Link
                key={contest._id}
                to={`/user/contests/${contest._id}/questions`}
                className="contest-card"
              >
                <div className="card-content">
                  <h2 className="contest-title">{contest.title}</h2>
                  <p className="contest-description">{contest.description}</p>
                  <p className="contest-timing">
                    Starts at: {new Date(contest.startTime).toLocaleString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {biweeklyContests.length === 0 &&
        monthlyContests.length === 0 &&
        dailyContests.length === 0 && (
          <p className="no-contests">No active contests at the moment.</p>
        )}
    </div>
  );
};

export default ContestList;
