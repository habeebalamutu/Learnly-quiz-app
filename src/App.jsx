// App.js
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import DragDropQuiz from "./pages/DragDropQuiz"; //  <-- Import it here

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/objective-quiz" element={<Quiz />} />
      <Route path="/drag-drop-quiz" element={<DragDropQuiz />} />
    </Routes>
  );
}

export default App;
