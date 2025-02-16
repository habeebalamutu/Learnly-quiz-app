import React, { useState } from "react";
import "../styles/Quizpage.css"; 

const QUESTIONS = [
  {
    id: 1,
    question: "What do plants need for photosynthesis?",
    options: [
      { id: "A", text: "Oxygen & Sugar" },
      { id: "B", text: "Sunlight, Water & Carbon Dioxide", correct: true },
      { id: "C", text: "Protein & Soil" },
    ],
    correctMsg: " Right! Plants need sunlight, water, and CO₂ to make food ✅.",
    wrongMsg: " Think again! Plants need these three main ingredients for photosynthesis ❗.",
  },
  {
    id: 2,
    question: "Which molecule is produced as food in photosynthesis?",
    options: [
      { id: "A", text: "Glucose", correct: true },
      { id: "B", text: "Protein" },
      { id: "C", text: "Fats" },
    ],
    correctMsg: " Right! Glucose is the primary product of photosynthesis ✅.",
    wrongMsg: " Think again! Plants store energy from photosynthesis in glucose ❗.",
  },
  {
    id: 3,
    question: "Which gas do plants absorb during photosynthesis?",
    options: [
      { id: "A", text: "Oxygen" },
      { id: "B", text: "Carbon Dioxide", correct: true },
      { id: "C", text: "Nitrogen" },
    ],
    correctMsg: " Right! Plants take in CO₂ from the atmosphere ✅.",
    wrongMsg: " Think again! Plants release oxygen, not use it as a product ❗.",
  },
  {
    id: 4,
    question: "Which part of the plant primarily conducts photosynthesis?",
    options: [
      { id: "A", text: "Roots" },
      { id: "B", text: "Leaves", correct: true },
      { id: "C", text: "Stem" },
    ],
    correctMsg: " Right! Leaves have chloroplasts that carry out photosynthesis ✅.",
    wrongMsg: " Think again! Leaves are the main site of photosynthesis ❗.",
  },
  {
    id: 5,
    question: "What is the main product of photosynthesis used by plants?",
    options: [
      { id: "A", text: "Glucose", correct: true },
      { id: "B", text: "Oxygen" },
      { id: "C", text: "Carbon Dioxide" },
    ],
    correctMsg: " Right! Plants use glucose as their primary source of energy ✅.",
    wrongMsg: " Think again! Plants release oxygen, not use it as a product ❗.",
  },
];

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [feedbackMsg, setFeedbackMsg] = useState("");
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);


  const handleBack = () => {
    window.history.back();
  };


  const handleSelect = (option) => {
    if (selectedAnswer) return; 

    setSelectedAnswer(option.id);
    if (option.correct) {
      setIsCorrect(true);
      setScore((prev) => prev + 6);
      setFeedbackMsg(QUESTIONS[currentQuestion].correctMsg);
    } else {
      setIsCorrect(false);
      setFeedbackMsg(QUESTIONS[currentQuestion].wrongMsg);
    }
  };


  const handleContinue = () => {
    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
      setFeedbackMsg("");
    } else {
      setQuizFinished(true);
    }
  };

  if (quizFinished) {

    return (
      <div className="quiz-container">
        <div className="quiz-header">
          <button className="circle-back-button" onClick={handleBack}>
            ←
          </button>
        </div>
        <div className="score-bar">
          <p className="goal-points">Goal: 30 points</p>
          <p className="current-points">Current Points: {score}</p>
        </div>
        <p className="question-indicator left-align">Quiz Finished!</p>
        <h3 className="question-text">Your total score: {score} points.</h3>
      </div>
    );
  }

  const questionData = QUESTIONS[currentQuestion];
  const questionNumber = currentQuestion + 1;

  return (
    <div className="quiz-container">
    
      <div className="quiz-header">
        <button className="circle-back-button" onClick={handleBack}>
          ←
        </button>
      </div>


      <div className="score-bar">
        <p className="goal-points">Goal: 30 points</p>
        <p className="current-points">Current Points: {score}</p>
      </div>


      <p className="question-indicator left-align">Question {questionNumber}</p>
      <h3 className="question-text">{questionData.question}</h3>

      <div className="options-container">
        {questionData.options.map((option) => {
          const isSelected = selectedAnswer === option.id;
          const optionClass = isSelected
            ? isCorrect && option.correct
              ? "correct"
              : !isCorrect && option.id === selectedAnswer
              ? "wrong"
              : ""
            : "";

          return (
            <div
              key={option.id}
              className={`option ${optionClass}`}
              onClick={() => handleSelect(option)}
            >
              <span className="option-label">{option.id}</span> {option.text}
            </div>
          );
        })}
      </div>

 
      {feedbackMsg && (
        <div className={`feedback-msg ${isCorrect ? "correct" : "wrong"}`}>
          {feedbackMsg}
        </div>
      )}

    
      <button
        className="continue-button"
        onClick={handleContinue}
        disabled={!selectedAnswer}
      >
        Continue →
      </button>
    </div>
  );
}
