import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useLocation } from "react-router-dom";
import "../../styles/components/quizSummary.css";

const QuizSummary = () => {
  const [quizState, setQuizState] = useState({
    score: 0,
    numberOfQuestions: 0,
    numberOfAnswerQuestions: 0,
    correctAnswer: 0,
    wrongAnswer: 0,
    fiftyfiftyUsed: 0,
    hintsUsed: 0,
  });

  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      setQuizState({
        score: (location.state.score / location.state.numberOfQuestions) * 100,
        numberOfQuestions: location.state.numberOfQuestions,
        numberOfAnswerQuestions: location.state.numberOfAnswerQuestions,
        correctAnswer: location.state.correctAnswer,
        wrongAnswer: location.state.wrongAnswer,
        fiftyfiftyUsed: location.state.fiftyfiftyUsed,
        hintsUsed: location.state.hintsUsed,
      });
    }
  }, [location.state]);

  const { score } = quizState;

  let remark;
  if (score <= 30) {
    remark = "You need more Practice!";
  } else if (score > 30 && score <= 50) {
    remark = "Better luck next time!";
  } else if (score <= 70 && score > 50) {
    remark = "You can do Better!";
  } else if (score >= 71 && score <= 84) {
    remark = "You did Great!";
  } else {
    remark = "You are an absolute Genius!";
  }

  const stats = location.state ? (
    <div className="quiz-summary">
      <div className="center">
        <span className="mdi mdi-check-circle-outline success-icon"></span>
      </div>
      <h1>Quiz has Ended!</h1>
      <div className="container stats">
        <h4>{remark}</h4>
        <h2>Your Score: {quizState.score.toFixed(0)}&#37;</h2>
        <span className="left stat">Total number of Questions:</span>
        <span className="right">{quizState.numberOfQuestions}</span> <br />
        <span className="left stat">Number of Answered Questions:</span>
        <span className="right">{quizState.numberOfAnswerQuestions}</span>{" "}
        <br />
        <span className="left stat">Correct Answers:</span>
        <span className="right">{quizState.correctAnswer}</span> <br />
        <span className="left stat">Wrong Answers:</span>
        <span className="right">{quizState.wrongAnswer}</span> <br />
        <span className="left stat">Fifty-Fifty Used:</span>
        <span className="right">{quizState.fiftyfiftyUsed}</span> <br />
        <span className="left stat">Hints Used:</span>
        <span className="right">{quizState.hintsUsed}</span>
      </div>
      <div className="button">
        <ul>
          <li>
            <Link to={"/"}>Back to Home</Link>
          </li>
          <li>
            <Link to={"/play/quiz"}>Play Again!</Link>
          </li>
        </ul>
      </div>
    </div>
  ) : (
    <section>
      <h1 className="no-stats"> No Statistics Available</h1>
      <ul>
        <li>
          <Link to={"/"}>Back to Home</Link>
        </li>
        <li>
          <Link to={"/play/quiz"}>Take a Quiz!</Link>
        </li>
      </ul>
    </section>
  );

  return (
    <div>
      <Helmet>
        <title>Quiz App - Summary</title>
      </Helmet>
      <div className="quiz-summary">{stats}</div>
    </div>
  );
};

export default QuizSummary;
