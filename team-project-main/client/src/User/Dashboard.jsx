import React, { useEffect, useState } from 'react';
import { get } from '../services/Api'; 

const Dashboard = () => {
  const [submittedQuestions, setSubmittedQuestions] = useState([]);

  useEffect(() => {
    const fetchSubmittedQuestions = async () => {
      try {
        const response = await get('/api/questions'); 
        const allQuestions = response.data;

        const submitted = allQuestions.filter(q => q.submitted === true);
        setSubmittedQuestions(submitted);
      } catch (error) {
        console.log("Error fetching submitted questions", error);
      }
    };

    fetchSubmittedQuestions();
  }, []);

  return (
    <div className="dashboard-container">
      <h2>Submitted Questions</h2>
      {submittedQuestions.length > 0 ? (
        <ul>
          {submittedQuestions.map(question => (
            <li key={question.id}>{question.text}</li>
          ))}
        </ul>
      ) : (
        <p>No questions submitted yet.</p>
      )}
    </div>
  );
};

export default Dashboard;
