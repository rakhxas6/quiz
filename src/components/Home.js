import React, { Fragment } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import "../styles/components/home.css";

const Home = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Quiz App - Home</title>
      </Helmet>
      <div id="home">
        <section>
          <div style={{ textAlign: "center" }}>
            <span className="mdi mdi-cube-outline cube"></span>
          </div>
          <h1>Quiz App</h1>

          <div className="play-button-container">
            <ul>
              <li>
                <Link className="playButton" to="/play/instructions">
                  Play
                </Link>
              </li>
            </ul>
          </div>

          <div className="auth-container">
            <Link className="auth-buttons"  id="login" to="/login">
              Login
            </Link>
            <Link className="auth-buttons" id="register" to="/register">
              Register
            </Link>
          </div>
        </section>
      </div>
    </Fragment>
  );
};

export default Home;
