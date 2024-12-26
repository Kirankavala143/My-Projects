import React, { useState, useEffect } from "react";
import MonacoEditor from "@monaco-editor/react";
import "./compiler.css";
import { useParams } from "react-router-dom";

function EditorComponent() {
  const [code, setCode] = useState("// write your code here");
  const [output, setOutput] = useState([]);
  const [showCongrats, setShowCongrats] = useState(false);
  const [showSampleTest, setShowSampleTest] = useState(false);
  const [compilerError, setCompilerError] = useState(null);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [language, setLanguage] = useState("python");
  const [problem, setProblem] = useState({
    title: "Loading...",
    description: "",
    sampleInput: "", 
    testCases: [],
  });

  const { id } = useParams();

  async function fetchProblemData() {
    try {
      const response = await fetch(
        `http://localhost:5000/api/questions/api/question/1/${id}`,
        {
          credentials: "include",
        }
      );
      const data = await response.json();
      if (data.testCases && data.testCases.length > 0) {
        setProblem({
          title: data.title,
          description: data.description,
          sampleInput: data.sampleInput || "",
          testCases: data.testCases,
        });
      }
    } catch (error) {
      console.error("Error fetching problem data:", error);
    }
  }

  useEffect(() => {
    fetchProblemData();
  }, [id]);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs}h : ${mins}m : ${secs}s`;
  };

  useEffect(() => {
    let timerInterval = null;
    if (isTimerRunning && timer > 0) {
      timerInterval = setInterval(
        () => setTimer((prevTime) => prevTime - 1),
        1000
      );
    } else if (timer === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(timerInterval);
  }, [isTimerRunning, timer]);

  const startTimer = () => {
    if (timer === 0) {
      setTimer(3600);
    }
    setIsTimerRunning(true);
  };


  const handleRun = async () => {
    startTimer();
    setShowSampleTest(false);
    setCompilerError(null);
    try {
      const response = await fetch("http://127.0.0.1:8000/execute/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code_input: {
            code,
            language,
            input_data: problem.sampleInput,
          },
          question_id: id,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (data.test_results && data.test_results.length > 0) {
        const firstTestResult = data.test_results[0];
        setShowSampleTest(firstTestResult.test_passed);
        setCompilerError(
          !firstTestResult.test_passed
            ? "Sample test case failed! Check your logic."
            : null
        );
        setOutput([firstTestResult]);
      } else {
        setOutput([{ error: "No output returned from the execution." }]);
      }
    } catch (error) {
      setCompilerError(`Error executing code: ${error.message}`);
      setOutput([{ error: `Error executing code: ${error.message}` }]);
    }
  };

  const handleSubmit = async () => {
    startTimer();
    setCompilerError(null);
    try {
      const response = await fetch("http://127.0.0.1:8000/execute/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code_input: {
            code,
            language,
            input_data: problem.testCases.map(tc => tc.input),
          },
          question_id: id,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (data.test_results) {
        setOutput(data.test_results);
        const allTestsPassed = data.test_results.every(test => test.test_passed);
        setShowCongrats(allTestsPassed);
        setCompilerError(!allTestsPassed ? "One or more test cases failed." : null);
      } else {
        setOutput([{ error: "No test results returned from the execution." }]);
      }
    } catch (error) {
      setCompilerError(`Error submitting code: ${error.message}`);
      setOutput([{ error: `Error submitting code: ${error.message}` }]);
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Free Code</h1>
      </header>

      <div className="main-content">
        <div className="left-panel">
          <h2>{problem.title}</h2>
          <p>{problem.description}</p>
          <p>
            <strong>Input Format:</strong> {problem.inputFormat || "N/A"}
          </p>
          <p>
            <strong>Expected Output:</strong> {problem.expectedOutput || "N/A"}
          </p>
        </div>

        <div className="right-panel">
          <div className="language-selection">
            <label htmlFor="language">Select Language: </label>
            <select
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="c">C</option>
            </select>
          </div>

          <MonacoEditor
            className="monaco"
            language={language}
            theme="vs-dark"
            value={code}
            onChange={(newValue) => setCode(newValue || code)}
          />

          <div className="timer">
            <h3>{formatTime(timer)}</h3>
          </div>

          <div className="btn-div">
            <button className="run-btn" onClick={handleRun}>
              Run Code
            </button>
            <button className="submit-btn" onClick={handleSubmit}>
              Submit Code
            </button>
          </div>

          {showCongrats && (
            <div className="congrats">
              <h2>Congratulations! All Test Cases Passed!</h2>
            </div>
          )}
          {showSampleTest && (
            <div className="sample">
              <h3>Sample Test Case Passed</h3>
            </div>
          )}
          {compilerError && (
            <div className="error">
              <h3>{compilerError}</h3>
            </div>
          )}

          <div className="output-section">
            <h3>Output:</h3>
            {output.length > 0 ? (
              output.map((result, index) => (
                <div
                  key={index}
                  className={`output-result ${
                    result.test_passed ? "pass" : "fail"
                  }`}
                >
                  <p>
                    <strong>Test Case {index + 1}:</strong>
                  </p>
                  <p>
                    <strong>Input:</strong>{" "}
                    {result.input || problem.sampleInput}
                  </p>
                  <p>
                    <strong>Expected Output:</strong>{" "}
                    {result.expected_output || "N/A"}
                  </p>
                  <p>
                    <strong>User Output:</strong>{" "}
                    {result.user_output || "Error"}
                  </p>
                  {result.error && (
                    <p className="error-msg">
                      <strong>Error:</strong> {result.error}
                    </p>
                  )}
                  <p>
                    <strong>Result:</strong>{" "}
                    {result.test_passed ? "Passed" : "Failed"}
                  </p>
                </div>
              ))
            ) : (
              <p>No output available yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditorComponent;
