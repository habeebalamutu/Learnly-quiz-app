import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "../styles/DragDropQuiz.css";


const initialDragOptions = [
  { id: "variable", text: "Variable" },
  { id: "constant", text: "Constant" },
  { id: "coefficient", text: "Coefficient" },
  { id: "expression", text: "Expression" },
  { id: "equation", text: "Equation" },
];

const correctMappings = {
  Variable: "A number that changes in an equation.",
  Constant: "A fixed number that does not change.",
  Coefficient: "A number that multiplies a variable.",
  Expression: "A combination of numbers, variables, and operations.",
  Equation: "A statement that two expressions are equal.",
};


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


  const [dragOptions, setDragOptions] = useState(() =>
    shuffleArray(initialDragOptions)
  );


  const [draggedItem, setDraggedItem] = useState(null);


  const [matchedAnswers, setMatchedAnswers] = useState({});

  const [droppedItems, setDroppedItems] = useState([]);


  const [lessonCount, setLessonCount] = useState(0);
  const totalLessons = 5;


  const [timer, setTimer] = useState(20);


  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev > 0) return prev - 1;
        clearInterval(interval);
        return 0;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);


  const handleDragStart = (item) => {
    setDraggedItem(item);
  };


  const handleDrop = (definition) => {
    if (!draggedItem) return;

   
    if (lessonCount < totalLessons) {
      setLessonCount((prev) => prev + 1);
    }

    setMatchedAnswers((prev) => ({
      ...prev,
      [definition]: draggedItem.text,
    }));

    setDroppedItems((prev) => [...prev, draggedItem.id]);


    setDraggedItem(null);
  };


  const isCorrectAnswer = (definition, text) => {
    return correctMappings[text] === definition;
  };

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

  const lessonValue = (1 + lessonCount * 0.1).toFixed(1); // 0→5 => 1.0→1.5


  const handleShuffle = () => {
    setDragOptions(shuffleArray(initialDragOptions));
    setDroppedItems([]);
    setMatchedAnswers({});

  };

  return (
    <div className="quiz-container">
    
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

      <div className="drop-zones">
        {Object.entries(correctMappings).map(([text, definition], index) => {
          const userAnswer = matchedAnswers[definition];
          const hasAnswer = userAnswer !== undefined;
          const correct = hasAnswer && isCorrectAnswer(definition, userAnswer);

          return (
            <div
              key={index}
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
                draggable
                onDragStart={() => handleDragStart(option)}
              >
                {option.text}
              </motion.div>
            );
          })}
        </div>
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

