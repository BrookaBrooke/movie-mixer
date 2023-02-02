import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Collapse from "react-bootstrap/Collapse";
import "../index.css";

const Trivia = () => {
  const [numQuestions, setNumQuestions] = useState(1);
  const [openLimited, setOpenLimited] = useState(false);
  const [openEndless, setOpenEndless] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="trivia-background">
      <div className="row">
        <div className="offset-3 col-6">
          <div className="trivia-box d-flex flex-column justify-content-center align-items-center">
            <h1 className="text-center">Movie Trivia</h1>
            <h2 className="text-center">Choose Game Mode</h2>
            <div className="d-flex justify-content-center">
              <div className="trivia-endless-button">
                <button
                  type="button"
                  onClick={() => {
                    setOpenLimited(!openLimited);
                    setOpenEndless(false);
                  }}
                  aria-controls="limited-mode"
                  aria-expanded={openLimited}
                  className={
                    openLimited
                      ? "m-2 btn btn-danger"
                      : "m-2 btn btn-outline-danger"
                  }
                >
                  Limited Mode
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setOpenEndless(!openEndless);
                    setOpenLimited(false);
                  }}
                  aria-controls="endless-mode"
                  aria-expanded={openEndless}
                  className={
                    openEndless
                      ? "m-2 btn btn-danger"
                      : "m-2 btn btn-outline-danger"
                  }
                >
                  Endless Mode
                </button>
              </div>
            </div>
            <Collapse in={openLimited}>
              <div id="limited-mode" className="text-center">
                <p>
                  Enter a number of questions and see how many you can get
                  right!
                </p>
                <p className="small">
                  (The max amount of questions for hard difficulty is currently
                  42)
                </p>
              </div>
            </Collapse>
            <Collapse in={openEndless}>
              <div id="endless-mode" className="text-center">
                Answer as many questions as you can before getting three wrong!
              </div>
            </Collapse>

            <div id="number-questions" className="text-center">
              {openLimited && (
                <>
                  <label>Number of Questions: </label>
                  <input
                    type="number"
                    min="1"
                    className="text-center"
                    onChange={(e) => setNumQuestions(e.target.value)}
                    value={numQuestions}
                    placeholder="Enter number of questions"
                  />
                  <div className="trivia-buttons">
                    <button
                      type="button"
                      variant="primary"
                      size="lg"
                      className="m-2 btn btn-success button-glow"
                      onClick={() => {
                        if (numQuestions < 1) {
                          alert("Number of questions must be positive!");
                        } else {
                          navigate(
                            `/movie-mixer/trivia/limited/${numQuestions}/easy`
                          );
                        }
                      }}
                    >
                      Easy
                    </button>
                    <button
                      type="button"
                      variant="primary"
                      size="lg"
                      className="m-2 btn btn-warning button-glow"
                      onClick={() => {
                        if (numQuestions < 1) {
                          alert("Number of questions must be positive!");
                        } else {
                          navigate(
                            `/movie-mixer/trivia/limited/${numQuestions}/medium`
                          );
                        }
                      }}
                    >
                      Medium
                    </button>
                    <button
                      type="button"
                      variant="primary"
                      size="lg"
                      className="m-2 btn btn-danger button-glow"
                      onClick={() => {
                        if (numQuestions < 1) {
                          alert("Number of questions must be positive!");
                        } else if (numQuestions <= 42) {
                          navigate(
                            `/movie-mixer/trivia/limited/${numQuestions}/hard`
                          );
                        } else {
                          alert(
                            "max number of questions for hard difficulty is 42!"
                          );
                        }
                      }}
                    >
                      Hard
                    </button>
                  </div>
                </>
              )}
              {openEndless && (
                <>
                  <button
                    type="button"
                    variant="primary"
                    size="lg"
                    className="m-2 btn btn-success button-glow"
                    onClick={() => navigate(`/movie-mixer/trivia/endless/easy`)}
                  >
                    Easy
                  </button>
                  <button
                    type="button"
                    variant="primary"
                    size="lg"
                    className="m-2 btn btn-warning button-glow"
                    onClick={() =>
                      navigate(`/movie-mixer/trivia/endless/medium`)
                    }
                  >
                    Medium
                  </button>
                  <button
                    type="button"
                    variant="primary"
                    size="lg"
                    className="m-2 btn btn-danger button-glow"
                    onClick={() => navigate(`/movie-mixer/trivia/endless/hard`)}
                  >
                    Hard
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trivia;
