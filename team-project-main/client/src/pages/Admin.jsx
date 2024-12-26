import React, { useState, useEffect } from 'react';
import { FaFileUpload } from "react-icons/fa";
import { PiStudent } from "react-icons/pi";
import { IoHomeOutline } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import { get, post } from '../services/Api';
import './Admin.css';
import ContestUpload from '../Admin/Contestupload';
import ThirdYears from '../Admin/ThirdYear';
import FourthYears from '../Admin/FourthYears';

const Admin = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [testCases, setTestCases] = useState([{ input: "", expectedOutput: "" }]);
  const [currentDate, setCurrentDate] = useState("");
  const [selectedSection, setSelectedSection] = useState("createQuestion");
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const today = new Date();
    const formattedDate = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
    setCurrentDate(formattedDate);

    const fetchUsers = async () => {
      try {
        const response = await get('/api/admin/getuser');
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Failed to fetch users.");
      }
    };
    fetchUsers();
  }, []);


  const handleTestCaseChange = (index, field, value) => {
    const updatedTestCases = [...testCases];
    updatedTestCases[index][field] = value;
    setTestCases(updatedTestCases);
  };


  const handleAddTestCase = () => {
    setTestCases([...testCases, { input: "", expectedOutput: "" }]);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!title || !description || testCases.some(tc => !tc.input || !tc.expectedOutput)) {
      alert("Please fill in all fields and test cases.");
      return;
    }

    const questionData = { title, description, testCases };

    try {
      const response = await post('/api/questions', questionData);
      alert('Question created successfully!');
      setTitle("");
      setDescription("");
      setTestCases([{ input: "", expectedOutput: "" }]);
      setError("");
    } catch (error) {
      console.error("Error creating question:", error);
      setError("Error creating question: " + (error.response?.data?.error || error.message));
    }
  };


  const handleLogout = () => {
    setSelectedSection("logout");
  };

  return (
    <div className="container">
      <div className="sidebar">
        <ul>
          <li>
            <img src="/logo.jpeg" className="icon" alt="Free Code Logo" />
            <h2 className="label">Free Code</h2>
          </li>
          <li onClick={() => setSelectedSection("home")}>
            <IoHomeOutline className='icon' />
            <div className="label">Home Page</div>
          </li>
          <li onClick={() => setSelectedSection("thirdYears")}>
            <PiStudent className='icon' />
            <div className="label">3rd Years</div>
          </li>
          <li onClick={() => setSelectedSection("fourthYears")}>
            <PiStudent className='icon' />
            <div className="label">4th Years</div>
          </li>
          <li onClick={() => setSelectedSection("contestUpload")}>
            <FaFileUpload className='icon' />
            <div className="label">Upload Contest</div>
          </li>
          <li onClick={handleLogout}>
            <IoIosLogOut className='icon' />
            <div className="label">Logout</div>
          </li>
        </ul>
      </div>
      <div className="content">
        <div className="header-left">
          <h3 className='admin'>Welcome Admin</h3>
          <p>{currentDate}</p>
          <div className="profile-pic"></div>
        </div>

        {selectedSection === "thirdYears" ? (
          <ThirdYears />
        ) : selectedSection === "fourthYears" ? (
          <FourthYears />
        ) : selectedSection === "contestUpload" ? (
          <ContestUpload />
        ) : selectedSection === "logout" ? (
          <p>You have logged out successfully.</p>
        ) : (
          <div className="create-question-form">
            <h3>Create a New Question</h3>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Title:</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Description:</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
              </div>

              <div className="form-group">
                <label>Test Cases:</label>
                {testCases.map((testCase, index) => (
                  <div key={index} className="test-case">
                    <input
                      type="text"
                      placeholder="Input"
                      value={testCase.input}
                      onChange={(e) => handleTestCaseChange(index, 'input', e.target.value)}
                      required
                    />
                    <input
                      type="text"
                      placeholder="Expected Output"
                      value={testCase.expectedOutput}
                      onChange={(e) => handleTestCaseChange(index, 'expectedOutput', e.target.value)}
                      required
                    />
                  </div>
                ))}
                <button type="button" onClick={handleAddTestCase}>
                  Add Another Test Case
                </button>
              </div>

              <button type="submit">Create Question</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
