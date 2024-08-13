import React, { Component, Fragment } from "react";
import withRouter from "../WithRouter";
import { Helmet } from "react-helmet";
import M from "materialize-css";

import "../../styles/components/play.css";
import questions from "../../questions.json";
import isEmpty from "../../utils/is-empty";
import correctNotification from "../../assets/correct-answer.mp3";
import wrongNotification from "../../assets/wrong-answer.mp3";
import buttonNotification from "../../assets/button-sound.mp3";
import classNames from "classnames";

class Play extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions,
      currentQuestion: {},
      nextQuestion: {},
      previousQuestion: {},
      answer: "",
      numberOfQuestions: 0,
      numberOfAnswerQuestions: 0,
      currentQuestionIndex: 0,
      score: 0,
      correctAnswer: 0,
      wrongAnswer: 0,
      hints: 5,
      fiftyfifty: 2,
      nextBtnDisabled: false,
      previousBtnDisabled: true,
      usedFiftyFifty: false,
      previousRandomNumbers: [],
      time: {},
    };
    this.interval = null;
  }

  componentDidMount() {
    const { questions, currentQuestion, nextQuestion, previousQuestion } =
      this.state;
    this.displayQuestions(
      questions,
      currentQuestion,
      nextQuestion,
      previousQuestion
    );
    this.startTimer();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  displayQuestions = (
    questions = this.state.questions,
    currentQuestion,
    nextQuestion,
    previousQuestion
  ) => {
    let { currentQuestionIndex } = this.state;
    if (!isEmpty(this.state.questions)) {
      questions = this.state.questions;
      currentQuestion = questions[currentQuestionIndex];
      nextQuestion = questions[currentQuestionIndex + 1];
      previousQuestion = questions[currentQuestionIndex - 1];
      const answer = currentQuestion.answer;
      this.setState(
        {
          currentQuestion,
          nextQuestion,
          previousQuestion,
          numberOfQuestions: questions.length,
          answer,
          previousRandomNumbers: [],
        },
        () => {
          this.showOptions();
          this.handleDisabledButton();
        }
      );
    }
  };

  handleOptionClick = (e) => {
    if (e.target.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
      setTimeout(() => {
        document.getElementById("correctSound").play();
      }, 500);
      this.correctAnswer();
    } else {
      setTimeout(() => {
        document.getElementById("wrongSound").play();
      }, 500);
      this.wrongAnswer();
    }
  };

  handleNextButtonClick = () => {
    this.playButtonSound();
    if (this.state.nextQuestion !== undefined) {
      this.setState(
        (prevState) => ({
          currentQuestionIndex: prevState.currentQuestionIndex + 1,
        }),
        () => {
          this.displayQuestions(
            this.state.state,
            this.state.currentQuestion,
            this.state.nextQuestion,
            this.state.previousQuestion
          );
        }
      );
    }
  };

  handlePreviousButtonClick = () => {
    this.playButtonSound();
    if (this.state.previousQuestion !== undefined) {
      this.setState(
        (prevState) => ({
          currentQuestionIndex: prevState.currentQuestionIndex - 1,
        }),
        () => {
          this.displayQuestions(
            this.state.state,
            this.state.currentQuestion,
            this.state.nextQuestion,
            this.state.previousQuestion
          );
        }
      );
    }
  };

  handleQuitButtonClick = () => {
    this.playButtonSound();

    if (window.confirm("Are you sure you want to Quit?")) {
      this.props.navigate("/");
    }
  };

  handleButtonClick = (e) => {
    switch (e.target.id) {
      case "nextBtn":
        this.handleNextButtonClick();
        break;
      case "prevBtn":
        this.handlePreviousButtonClick();
        break;
      case "quitBtn":
        this.handleQuitButtonClick();
        break;
      default:
        break;
    }
    this.playButtonSound();
  };

  playButtonSound = () => {
    document.getElementById("buttonSound").play();
  };

  correctAnswer = () => {
    M.toast({
      html: `Correct answer`,
      classes: "toast-valid",
      displayLength: 1500,
    });
    this.setState(
      (prevState) => ({
        score: prevState.score + 1,
        correctAnswer: prevState.correctAnswer + 1,
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
        numberOfAnswerQuestions: prevState.numberOfAnswerQuestions + 1,
      }),
      () => {
        if (this.state.nextQuestion === undefined) {
          this.endGame();
        } else {
          this.displayQuestions(
            this.state.questions,
            this.state.currentQuestion,
            this.state.nextQuestion,
            this.state.previousQuestion
          );
        }
      }
    );
  };

  wrongAnswer = () => {
    navigator.vibrate(1000);
    M.toast({
      html: `InCorrect answer!`,
      classes: "toast-invalid",
      displayLength: 1500,
    });
    this.setState(
      (prevState) => ({
        wrongAnswer: prevState.wrongAnswer + 1,
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
        numberOfAnswerQuestions: prevState.numberOfAnswerQuestions + 1,
      }),
      () => {
        if (this.state.nextQuestion === undefined) {
          this.endGame();
        } else {
          this.displayQuestions(
            this.state.questions,
            this.state.currentQuestion,
            this.state.nextQuestion,
            this.state.previousQuestion
          );
        }
      }
    );
  };

  showOptions = () => {
    const options = Array.from(document.querySelectorAll(".option"));

    options.forEach((option) => {
      option.style.visibility = "visible";
    });

    this.setState({
      usedFiftyFifty: false,
    });
  };

  handleHints = () => {
    if (this.state.hints > 0) {
      const options = Array.from(document.querySelectorAll(".option"));
      let indexOfAnswer;

      options.forEach((option, index) => {
        if (
          option.innerHTML.toLowerCase() === this.state.answer.toLowerCase()
        ) {
          indexOfAnswer = index;
        }
      });

      while (true) {
        const randomIndex = Math.floor(Math.random() * options.length);
        if (
          randomIndex !== indexOfAnswer &&
          !this.state.previousRandomNumbers.includes(randomIndex)
        ) {
          options[randomIndex].style.visibility = "hidden";
          this.setState((prevState) => ({
            hints: prevState.hints - 1,
            previousRandomNumbers:
              prevState.previousRandomNumbers.concat(randomIndex),
          }));
          break;
        }
        if (this.state.previousRandomNumbers.length >= options.length - 1)
          break;
      }
    }
  };

  handleFiftyFifty = () => {
    if (this.state.fiftyfifty > 0 && this.state.usedFiftyFifty === false) {
      const options = document.querySelectorAll(".option");
      const randomNumbers = [];
      let indexOfAnswer;

      options.forEach((option, index) => {
        if (
          option.innerHTML.toLowerCase() === this.state.answer.toLowerCase()
        ) {
          indexOfAnswer = index;
        }
      });

      let count = 0;
      do {
        const randomIndex = Math.floor(Math.random() * options.length);
        if (
          !randomNumbers.includes(randomIndex) &&
          randomIndex !== indexOfAnswer
        ) {
          randomNumbers.push(randomIndex);
          count++;
        }
      } while (count < 2);

      // Hide or disable the options based on the randomNumbers array
      options.forEach((option, index) => {
        if (randomNumbers.includes(index)) {
          option.style.visibility = "hidden";
        }
      });

      this.setState((prevState) => ({
        fiftyfifty: prevState.fiftyfifty - 1,
        usedFiftyFifty: true,
      }));
    }
  };

  startTimer = () => {
    const countDownTime = Date.now() + 900000;
    this.interval = setInterval(() => {
      const now = new Date();
      const distance = countDownTime - now;

      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      if (distance < 0) {
        clearInterval(this.interval);
        this.setState(
          {
            time: {
              minutes: 0,
              seconds: 0,
            },
          },
          () => {
            this.endGame();
          }
        );
      } else {
        this.setState({
          time: {
            minutes,
            seconds,
          },
        });
      }
    }, 1000);
  };

  handleDisabledButton = () => {
    if (
      this.state.previousQuestion === undefined ||
      this.state.currentQuestionIndex === 0
    ) {
      this.setState({
        previousBtnDisabled: true,
      });
    } else {
      this.setState({
        previousBtnDisabled: false,
      });
    }
    if (
      this.state.nextQuestion === undefined ||
      this.state.currentQuestionIndex + 1 === this.state.numberOfQuestions
    ) {
      this.setState({
        nextBtnDisabled: true,
      });
    } else {
      this.setState({
        nextBtnDisabled: false,
      });
    }
  };

  endGame = () => {
    alert("Quiz has ended!");
    const { state } = this;
    const playerStats = {
      score: state.score,
      numberOfQuestions: state.numberOfQuestions,
      numberOfAnswerQuestions: state.numberOfAnswerQuestions,
      correctAnswer: state.correctAnswer,
      wrongAnswer: state.wrongAnswer,
      fiftyfiftyUsed: 2 - state.fiftyfifty,
      hintsUsed: 5 - state.hints,
    };
    // console.log(playerStats);
    setTimeout(() => {
      this.props.navigate("/play/quizSummary", { state: playerStats });
    }, 1000);
  };

  render() {
    // console.log(questions)
    const {
      hints,
      currentQuestion,
      currentQuestionIndex,
      numberOfQuestions,
      fiftyfifty,
      time,
    } = this.state;
    return (
      <Fragment>
        <Helmet>
          <title>Quiz Page</title>
        </Helmet>
        <Fragment>
          <audio id="correctSound" src={correctNotification}></audio>
          <audio id="wrongSound" src={wrongNotification}></audio>
          <audio id="buttonSound" src={buttonNotification}></audio>
        </Fragment>
        <div className="questions">
          <h3>Quiz Mode</h3>
          <div className="lifeline-container">
            <p>
              <span
                onClick={this.handleFiftyFifty}
                className="mdi mdi-set-center mdi-24px lifeline-icon"
              >
                <span className="lifeline">{fiftyfifty}</span>
              </span>
            </p>
            <p>
              <span
                onClick={this.handleHints}
                className="mdi mdi-lightbulb-on-outline mdi-24px lifeline-icon"
              >
                <span className="lifeline">{hints}</span>
              </span>
            </p>
          </div>
          <div className="timer-container">
            <p>
              <span className="left" style={{ float: "left" }}>
                {currentQuestionIndex + 1} of {numberOfQuestions}
              </span>
              <span className="right">
                {time.minutes}:{time.seconds}
                <span className="mdi mdi-clock-outline mdi-24px"></span>
              </span>
            </p>
          </div>
          <h5>{currentQuestion.question}</h5>
          <div className="options-container">
            <p onClick={this.handleOptionClick} className="option">
              {currentQuestion.optionA}
            </p>
            <p onClick={this.handleOptionClick} className="option">
              {currentQuestion.optionB}
            </p>
          </div>
          <div className="options-container">
            <p onClick={this.handleOptionClick} className="option">
              {currentQuestion.optionC}
            </p>
            <p onClick={this.handleOptionClick} className="option">
              {currentQuestion.optionD}
            </p>
          </div>
          <div className="button-container">
            <button
              className={classNames("", {
                disable: this.state.previousBtnDisabled,
              })}
              id="prevBtn"
              onClick={this.handleButtonClick}
            >
              Previous
            </button>
            <button
              className={classNames("", {
                disable: this.state.nextBtnDisabled,
              })}
              id="nextBtn"
              onClick={this.handleButtonClick}
            >
              Next
            </button>
            <button id="quitBtn" onClick={this.handleButtonClick}>
              Quit
            </button>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default withRouter(Play);
