import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "../styles/dragdropquiz.css";

// Inverted dictionary: Key = definition, Value = correct term
const correctMappings = {
  "A number that changes in an equation.": "Variable",
  "A fixed number that does not change.": "Constant",
  "A number that multiplies a variable.": "Coefficient",
  "A combination of numbers, variables, and operations.": "Expression",
  "A statement that two expressions are equal.": "Equation",
};

// Draggable terms
const initialDragOptions = [
  { id: "variable", text: "Variable" },
  { id: "constant", text: "Constant" },
  { id: "coefficient", text: "Coefficient" },
  { id: "expression", text: "Expression" },
  { id: "equation", text: "Equation" },
];

// Shuffle array (Fisher-Yates)
function shuffleArray(array) {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

export default function DragDropQuiz() {
  const navigate = useNavigate();

  // Shuffle the initial drag items
  const [dragOptions, setDragOptions] = useState(() =>
    shuffleArray(initialDragOptions)
  );

  // The item currently being dragged
  const [draggedItem, setDraggedItem] = useState(null);

  // Map from definition -> user’s chosen term
  const [matchedAnswers, setMatchedAnswers] = useState({});

  // Dropped item IDs (to prevent reuse, make them transparent)
  const [droppedItems, setDroppedItems] = useState([]);

  // Lesson progress (0 -> 5)
  const [lessonCount, setLessonCount] = useState(0);
  const totalLessons = 5;

  // Timer (35 seconds)
  const [timer, setTimer] = useState(35);
  // If timeUp = true, user can’t drag anymore
  const [timeUp, setTimeUp] = useState(false);

  // Count down the timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev > 0) return prev - 1;
        // Timer hits 0
        setTimeUp(true);
        clearInterval(interval);
        return 0;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Called when user starts dragging an item
  const handleDragStart = (item) => {
    if (timeUp) return; // If time’s up, do nothing
    setDraggedItem(item);
  };

  // Called when user drops an item onto a definition
  const handleDrop = (definition) => {
    if (!draggedItem || timeUp) return; // If no item or time’s up, do nothing

    // Increase lesson count
    if (lessonCount < totalLessons) {
      setLessonCount((prev) => prev + 1);
    }

    // Record user’s matched answer
    setMatchedAnswers((prev) => ({
      ...prev,
      [definition]: draggedItem.text,
    }));

    // Mark item as dropped so it can’t be reused
    setDroppedItems((prev) => [...prev, draggedItem.id]);
    setDraggedItem(null);
  };

  // Check correctness
  const isCorrectAnswer = (definition, term) => {
    return correctMappings[definition] === term;
  };

  // Count how many are correct
  const getCorrectCount = () => {
    let correctCount = 0;
    for (const definition in matchedAnswers) {
      const userTerm = matchedAnswers[definition];
      if (isCorrectAnswer(definition, userTerm)) {
        correctCount++;
      }
    }
    return correctCount;
  };

  // Generate underscores for lesson progress
  const underscores = [...Array(totalLessons)].map((_, idx) => {
    return idx < lessonCount ? (
      <span key={idx} className="purple-underscore">
        __
      </span>
    ) : (
      <span key={idx} className="white-underscore">
        __
      </span>
    );
  });

  // Convert lessonCount to 1.0 → 1.5
  const lessonValue = (1 + lessonCount * 0.1).toFixed(1);

  // Shuffle / Restart everything
  const handleShuffle = () => {
    setDragOptions(shuffleArray(initialDragOptions));
    setDroppedItems([]);
    setMatchedAnswers({});
    setLessonCount(0);
    setTimer(35);
    setTimeUp(false);
  };

  // If user has dropped all 5 items OR time is up, show final scoreboard
  const correctCount = getCorrectCount();
  const allDropped = droppedItems.length === 5;
  const quizDone = allDropped || timeUp;

  if (quizDone) {
    // Final scoreboard or time-up scoreboard
    return (
      <div className="quiz-container">
        {/* Header */}
        <div className="quiz-header">
          <button className="back-button" onClick={() => navigate("/")}>
            ←
          </button>
          <p className="quiz-title">Course Preview</p>
          <button className="question-button">?</button>
        </div>

        <div className="lesson-tracker">
          <div className="lesson-info">
            <p className="lesson-text">Lesson {lessonValue}</p>
            <div className="progress-underscores">{underscores}</div>
          </div>
          <div className="timer">
            <span className="phone-icon">📱</span> 00:
            {timer < 10 ? `0${timer}` : timer}
          </div>
        </div>

        <h2 className="match-title">Match the Algebraic Terms!</h2>

        <div className="time-up-section">
          {timeUp && !allDropped ? (
            <p className="time-up-msg">
              Time’s up! You matched <strong>{correctCount}</strong> of 5.
            </p>
          ) : (
            <p className="time-up-msg">
              You matched <strong>{correctCount}</strong> of 5. Well done!
            </p>
          )}
          <p className="time-up-msg">
            Please <strong>Shuffle</strong> to restart or <strong>Continue</strong> to go
            home.
          </p>
        </div>

        <div className="button-container">
          <button className="shuffle-button" onClick={handleShuffle}>
            🔄
          </button>
          <button className="continue-button" onClick={() => navigate("/")}>
            Continue →
          </button>
        </div>
      </div>
    );
  }

  // Otherwise, show the normal quiz UI
  return (
    <div className="quiz-container">
      {/* Header */}
      <div className="quiz-header">
        <button className="back-button" onClick={() => navigate("/")}>
          ←
        </button>
        <p className="quiz-title">Course Preview</p>
        <button className="question-button">?</button>
      </div>

      {/* Lesson & Timer */}
      <div className="lesson-tracker">
        <div className="lesson-info">
          <p className="lesson-text">Lesson {lessonValue}</p>
          <div className="progress-underscores">{underscores}</div>
        </div>
        <div className="timer">
          <span className="phone-icon">📱</span> 00:
          {timer < 10 ? `0${timer}` : timer}
        </div>
      </div>

      <h2 className="match-title">Match the Algebraic Terms!</h2>

      {/* Drop Zones */}
      <div className="drop-zones">
        {Object.entries(correctMappings).map(([definition, correctTerm], idx) => {
          const userAnswer = matchedAnswers[definition];
          const hasAnswer = userAnswer !== undefined;
          const correct = hasAnswer && isCorrectAnswer(definition, userAnswer);

          return (
            <div
              key={idx}
              className={`drop-zone ${hasAnswer ? (correct ? "correct" : "wrong") : ""}`}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(definition)}
            >
              {hasAnswer
                ? `${userAnswer} ${correct ? "✅" : "❌"}`
                : definition}
            </div>
          );
        })}
      </div>

      {/* Draggable Items */}
      <div className="draggable-section">
        <p className="instruction-text">
          Drag the correct algebraic term below to match its definition above.
        </p>
        <div className="draggable-items">
          {dragOptions.map((option) => {
            const hasBeenDropped = droppedItems.includes(option.id);
            return (
              <motion.div
                key={option.id}
                className={`draggable ${hasBeenDropped ? "transparent" : ""}`}
                draggable={!timeUp && !hasBeenDropped}
                onDragStart={() => handleDragStart(option)}
              >
                {option.text}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Buttons */}
      <div className="button-container">
        <button className="shuffle-button" onClick={handleShuffle}>
          🔄
        </button>
        <button className="continue-button" onClick={() => navigate("/")}>
          Continue →
        </button>
      </div>
    </div>
  );
}
