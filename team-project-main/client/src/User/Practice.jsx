import React, { useEffect, useState } from "react";
import './Practice.css';
import { Link } from "react-router-dom";

const Practice = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/questions/api/questions")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch questions");
        }
        return response.json();
      })
      .then((data) => {
        setQuestions(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading questions...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="practice-container">
    
      <h1 className="practice-title">Practice Questions</h1>
      <ul>
      <div className="flex-div">
        {questions.length > 0 ? (
          questions.map((question) => (
            <div key={question._id} className="question-box">
              <div className="question-details">
                <h3 className="question-title">{question.title}</h3>
                <p className="question-description">{question.description}</p>
                <p className="question-date">
                  Created At: {new Date(question.createdAt).toLocaleDateString()}
                </p>
                {/* <div className="test-cases">
                  <h4>Test Cases:</h4>
                  <ul>
                    {question.testCases.map((testCase, index) => (
                      <li key={index} className="test-case-item">{testCase}</li>
                    ))}
                  </ul>
                </div> */}
              </div>
             <Link className="view-button" to = {`editor/${question._id}` } asChild> <button >View</button></Link>
            </div>
          )) 
        ) : (
          <p>No questions available</p>
        )}
        </div>
      </ul>
     
    </div>
  );
};

export default Practice;
