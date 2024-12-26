import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './thirdYear.css'; 
import { IoMdContact } from "react-icons/io";

const FourthYears = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();


  const getUser = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/getuser");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const users = await response.json();
      setData(users);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };


  const handleExplore = (userId) => {
    navigate(`/user/profileStats/${userId}`);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="third-years-container">
      <h3>Fourth Year Students</h3>
      <ul>
        {data.length > 0 ? (
          data.map((student) => (
            <li key={student._id}> {/* Use unique keys */}
              <span className="student-profile">
                <IoMdContact className="contacticon" />
                <span className="student-name">{student.name}</span>
              </span>
              <span className="student-points">{student.points} 0 </span>
              <button
                className="explore-btn"
                onClick={() => handleExplore(student._id)}
              >
                Explore
              </button>
            </li>
          ))
        ) : (
          <li>No students found</li>
        )}
      </ul>
    </div>
  );
};

export default FourthYears;
