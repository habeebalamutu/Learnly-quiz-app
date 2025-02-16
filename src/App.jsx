import React from "react";
  
import { Routes, Route } from "react-router-dom";
  
import Home from "./pages/Home";
  
import Quiz from "./pages/Quiz";
  
import DragDropQuiz from "./pages/DragDropQuiz";
  

  

  
import { DndProvider } from "react-dnd";
  
import { TouchBackend } from "react-dnd-touch-backend";
  

  
function App() {
  
  return (
  

  
    <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
  
      <Routes>
  
        <Route path="/" element={<Home />} />
  
        <Route path="/objective-quiz" element={<Quiz />} />
  
        <Route path="/drag-drop-quiz" element={<DragDropQuiz />} />
  
      </Routes>
  
    </DndProvider>
  
  );
  
}
  

  
export default App;
  
  