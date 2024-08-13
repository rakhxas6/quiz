import React, { Fragment } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import "../../styles/components/quizinstructions.css";

import image1 from "../../assets/img/2.png"
import image2 from "../../assets/img/selectingOptions.png"

const Quizinstructions = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Quiz Instructions - Quiz App</title>
      </Helmet>
      <div className="instructions container">
        <h1>How to Play the Game?</h1>
        <p>Ensure you read this guide from start to finish.</p>
        <ul className="browser-default" id="main-list">
          <li>
            The game has a duration of 15 minutes and ends as soon as your time
            elapses.{" "}
          </li>
          <li>Each game consists of 15 questions.</li>
          <li>
            Every Question consists of 4 options.
            <img src={image1} alt="4 options available" />
          </li>
          <li>
            Select the option which best answer the question by clicking on it.
            <img src={image2} alt="selecting the options." />
          </li>
          <li>
            Each game has 2 lines namely:
            <ul id="sublist">
              <li>2 50-50 chances</li>
              <li>5 hints</li>
            </ul>
          </li>
          <li>
            Selecting a 50-50 lifeline by clicking the instructions
            <span className="mdi mdi-set-center mdi-24px lifeline-icon"></span>
            Will remove 2 wrong answers, leaving the correct answer and one
            wrong answer
            <img src={image1} alt="50-50" />
          </li>
          <li>
            Using a hint by Clicking the icon
            <span className="mdi mdi-lightbulb mdi-24px lifeline-icon"></span>
            Will remove one wrong answer leaving two wrong answers ans one
            correct answer . You can use as many hints as possible in single
            question.
            <img src={image2} alt="hints" />
          </li>

          <li>
            Feel free to quit from the game any time.In that case your score
            will be revealed.
          </li>
          <li>The timer starts as soon as the game loads.</li>
          <li>Let's do this if you got what it takes</li>
        </ul>
        <div>
          <span className="left">
            <Link to="/">No take me back</Link>
          </span>
          <span className="right">
            <Link to="/play/quiz">Ok let's do this</Link>
          </span>
        </div>
      </div>
    </Fragment>
  );
};

export default Quizinstructions;
