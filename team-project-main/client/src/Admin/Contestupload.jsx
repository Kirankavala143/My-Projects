import React, { useState } from "react";
import "./Contestupload.css";

const ContestUpload = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [startTime, setStartTime] = useState("");
  const [questions, setQuestions] = useState([
    { title: "", options: ["", "", "", ""], correctOption: 0 }
  ]);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/contests/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, startTime, category, questions }),
      });

      if (response.ok) {
        setSuccessMessage("Contest added successfully!");
        setTitle("");
        setDescription("");
        setCategory("");
        setStartTime("");
        setQuestions([{ title: "", options: ["", "", "", ""], correctOption: 0 }]);
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        const errorText = await response.text();
        console.error("Failed to add contest:", errorText);
        alert("Failed to add contest.");
      }
    } catch (error) {
      console.error("Error adding contest:", error);
      alert("An error occurred while adding the contest.");
    }
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    if (field === "options") {
      updatedQuestions[index].options[value.index] = value.text;
    } else {
      updatedQuestions[index][field] = value;
    }
    setQuestions(updatedQuestions);
  };

  const addQuestionField = () => {
    setQuestions([
      ...questions,
      { title: "", options: ["", "", "", ""], correctOption: 0 }
    ]);
  };

  const removeQuestionField = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h3>Upload New Contest</h3>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>

        <div>
          <label>Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Start Time</label>
          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Questions</label>
          {questions.map((question, index) => (
            <div key={index} style={{ marginBottom: "20px" }}>
              <input
                type="text"
                placeholder={`Question Title ${index + 1}`}
                value={question.title}
                onChange={(e) =>
                  handleQuestionChange(index, "title", e.target.value)
                }
                required
              />
              <h4>Options</h4>
              {question.options.map((option, optionIndex) => (
                <input
                  key={optionIndex}
                  type="text"
                  placeholder={`Option ${optionIndex + 1}`}
                  value={option}
                  onChange={(e) =>
                    handleQuestionChange(index, "options", {
                      index: optionIndex,
                      text: e.target.value,
                    })
                  }
                  required
                />
              ))}
              <label>
                Correct Option:
                <select
                  value={question.correctOption}
                  onChange={(e) =>
                    handleQuestionChange(index, "correctOption", parseInt(e.target.value))
                  }
                >
                  {question.options.map((_, optionIndex) => (
                    <option key={optionIndex} value={optionIndex}>
                      Option {optionIndex + 1}
                    </option>
                  ))}
                </select>
              </label>
              <button
                type="button"
                onClick={() => removeQuestionField(index)}
                style={{ marginLeft: "10px", color: "red" }}
              >
                Remove Question
              </button>
            </div>
          ))}
          <button type="button" onClick={addQuestionField}>
            Add Question
          </button>
        </div>

        <button type="submit">Add Contest</button>
      </form>
    </div>
  );
};

export default ContestUpload;
