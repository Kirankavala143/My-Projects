import React, { useEffect, useState } from "react";
import "./Questionpage.css";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

const QuestionsPage = () => {
  const { contestId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [startTime, setStartTime] = useState(null);
  const [quizComplete, setQuizComplete] = useState(false);
  const [score, setScore] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await fetch(`http://localhost:5000/api/contests/${contestId}/questions`);
        if (!response.ok) {
          throw new Error("Failed to fetch questions");
        }
        const data = await response.json();

        if (data && Array.isArray(data.questions)) {
          setQuestions(data.questions);
          setStartTime(Date.now());
        } else {
          setQuestions([]);
          setError("Questions data is not in the expected format.");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchQuestions();
  }, [contestId]);

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleSubmit = () => {
    const endTime = Date.now();
    const totalTime = ((endTime - startTime) / 1000).toFixed(2);

    let correctAnswers = 0;
    questions.forEach((question, index) => {
      if (selectedOptions[index] === question.correctOption) {
        correctAnswers += 1;
      }
    });

    const userScore = (correctAnswers / questions.length) * 100;
    setScore(userScore);
    setAccuracy(userScore.toFixed(2));
    setQuizComplete(true);

    if (userScore > 75) {
      setPoints(10);
    } else if (userScore >= 50) {
      setPoints(5);
    } else if (userScore >= 35) {
      setPoints(3);
    } else {
      setPoints(0);
    }
  };

  const handleOptionChange = (optionIndex) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [currentQuestionIndex]: optionIndex,
    }));
  };

  if (loading) {
    return <div className="loading-message">Loading questions...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div className="questions-page">
      {!quizComplete ? (
        <>
          <div className="question-container">
            <h2>{questions[currentQuestionIndex].title}</h2>
          </div>
          <div className="options-container">
            {questions[currentQuestionIndex].options.map((option, index) => (
              <label key={index} className="option-item">
                <input
                  type="radio"
                  name={`question-${currentQuestionIndex}`}
                  value={index}
                  checked={selectedOptions[currentQuestionIndex] === index}
                  onChange={() => handleOptionChange(index)}
                />
                {option}
              </label>
            ))}
          </div>
          <div className="navigation-buttons">
            <button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className="nav-button"
            >
              Previous
            </button>
            {currentQuestionIndex < questions.length - 1 ? (
              <button onClick={handleNext} className="nav-button">
                Next
              </button>
            ) : (
              <button onClick={handleSubmit} className="submit-button">
                Submit
              </button>
            )}
          </div>
        </>
      ) : (
        <div className="results-container">
          <h2>Quiz Results</h2>
          <div className="circular-progress-container">
            <CircularProgress
              variant="determinate"
              value={accuracy}
              size={120}
              thickness={5}
              style={{ color: "#007bff" }}
            />
            <div className="accuracy-text">
              {accuracy}% Accuracy
            </div>
          </div>
          <p>Score: {score.toFixed(2)}%</p>
          {points > 0 ? (
            <p>Leaderboard Points: {points}</p>
          ) : (
            <p style={{ color: "red" }}>You have failed the quiz.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default QuestionsPage;
