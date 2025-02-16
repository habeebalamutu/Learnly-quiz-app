import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1 className="home-title">Learnly Quiz App</h1>
      <p className="home-subtitle">Select the type of quiz you want to play:</p>

      <div className="quiz-options">
        <button
          className="quiz-button"
          onClick={() => navigate("/objective-quiz")}
        >
          Objective Questions
        </button>
        <button
          className="quiz-button"
          onClick={() => navigate("/drag-drop-quiz")}
        >
          Drag & Drop Questions
        </button>
      </div>
    </div>
  );
};

export default Home;
