import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Collapse from "react-bootstrap/Collapse";
import "../index.css";

const Trivia = () => {
  const [numQuestions, setNumQuestions] = useState(1);
  const [openLimited, setOpenLimited] = useState(false);
  const [openEndless, setOpenEndless] = useState(false);
  const [limitedButton, setLimitedButton] = useState(
    "m-2 btn btn-outline-danger"
  );
  const [endlessButton, setEndlessButton] = useState(
    "m-2 btn btn-outline-danger"
  );
  const navigate = useNavigate();

  return (
    <div className="login-background">
      <div className="row">
        <div className="offset-3 col-6">
          <div className="login-box">
            <h1 className="text-center">Movie Trivia</h1>
            <h2 className="text-center">Choose Game Mode</h2>
            <div className="mx-auto" style={{ width: "290px" }}>
              <div>
                <button
                  type="button"
                  onClick={() => {
                    setOpenLimited(!openLimited);
                    setOpenEndless(false);
                    setLimitedButton("m-2 btn btn-danger");
                    setEndlessButton("m-2 btn btn-outline-danger");
                  }}
                  aria-controls="limited-mode"
                  aria-expanded={openLimited}
                  className={limitedButton}
                >
                  Limited Mode
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setOpenEndless(!openEndless);
                    setOpenLimited(false);
                    setLimitedButton("m-2 btn btn-outline-danger");
                    setEndlessButton("m-2 btn btn-danger");
                  }}
                  aria-controls="endless-mode"
                  aria-expanded={openEndless}
                  className={endlessButton}
                >
                  Endless Mode
                </button>
              </div>
            </div>
            <Collapse in={openLimited}>
              <div id="limited-mode" className="text-center">
                Enter a number of questions and see how many you can get right!
                (The max amount of questions for hard difficulty is currently
                42)
              </div>
            </Collapse>
            <Collapse in={openEndless}>
              <div id="endless-mode" className="text-center">
                Answer as many questions as you can before getting three wrong!
              </div>
            </Collapse>

            <div className="text-center">
              {openLimited && (
                <>
                  <label>Number of Questions: </label>
                  <input
                    type="number"
                    min="1"
                    onChange={(e) => setNumQuestions(e.target.value)}
                    value={numQuestions}
                    placeholder="Enter number of questions"
                  />

                  <button
                    type="button"
                    variant="primary"
                    size="lg"
                    className="m-2 btn btn-success button-glow"
                    onClick={() => {
                      if (numQuestions < 1) {
                        alert("Number of questions must be positive!");
                      } else {
                        navigate(`/trivia/limited/${numQuestions}/easy`);
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
                        navigate(`/trivia/limited/${numQuestions}/medium`);
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
                        navigate(`/trivia/limited/${numQuestions}/hard`);
                      } else {
                        alert(
                          "max number of questions for hard difficulty is 42!"
                        );
                      }
                    }}
                  >
                    Hard
                  </button>
                </>
              )}
              {openEndless && (
                <>
                  <button
                    type="button"
                    variant="primary"
                    size="lg"
                    className="m-2 btn btn-success button-glow"
                    onClick={() => navigate(`/trivia/endless/easy`)}
                  >
                    Easy
                  </button>
                  <button
                    type="button"
                    variant="primary"
                    size="lg"
                    className="m-2 btn btn-warning button-glow"
                    onClick={() => navigate(`/trivia/endless/medium`)}
                  >
                    Medium
                  </button>
                  <button
                    type="button"
                    variant="primary"
                    size="lg"
                    className="m-2 btn btn-danger button-glow"
                    onClick={() => navigate(`/trivia/endless/hard`)}
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
