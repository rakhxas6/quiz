import "@mdi/font/css/materialdesignicons.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home.js";
import Quizinstructions from "./components/quiz/Quizinstructions.js";
import QuizSummary from "./components/quiz/QuizSummary.js";
import Play from "./components/quiz/Play.js";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact Component={Home} />
        <Route path="/play/instructions" exact Component={Quizinstructions} />
        <Route path="/play/quiz" exact Component={Play} />
        <Route path="/play/quizSummary" exact Component={QuizSummary} />
      </Routes>
    </Router>
  );
}

export default App;
