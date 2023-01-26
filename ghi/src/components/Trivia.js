import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Trivia = () => {
  const [numQuestions, setNumQuestions] = useState(1);
  const navigate = useNavigate();

  return (
    <div className="container my-5">
      <h1 className="text-center">Movie Trivia</h1>
      <h2 className="text-center">Choose Game Mode</h2>
      <Form>
        <div className="text-center">
          <div>
            <h3>
              <u>Limited Mode</u>
            </h3>
            <Form.Group controlId="numQuestions" className="col-sm-2 mx-auto">
              <Form.Label>Number of Questions: </Form.Label>
              <Form.Control
                type="number"
                min="1"
                onChange={(e) => setNumQuestions(e.target.value)}
                value={numQuestions}
                placeholder="Enter number of questions"
              />
            </Form.Group>
            <Button
              variant="primary"
              size="lg"
              className="m-2"
              onClick={() => {
                if (numQuestions < 1) {
                  alert("Number of questions must be positive!");
                } else {
                  navigate(`/trivia/limited/${numQuestions}/easy`);
                }
              }}
            >
              Easy
            </Button>
            <Button
              variant="primary"
              size="lg"
              className="m-2"
              onClick={() => {
                if (numQuestions < 1) {
                  alert("Number of questions must be positive!");
                } else {
                  navigate(`/trivia/limited/${numQuestions}/medium`);
                }
              }}
            >
              Medium
            </Button>
            <Button
              variant="primary"
              size="lg"
              className="m-2"
              onClick={() => {
                if (numQuestions < 1) {
                  alert("Number of questions must be positive!");
                } else if (numQuestions <= 42) {
                  navigate(`/trivia/limited/${numQuestions}/hard`);
                } else {
                  alert("max number of questions for hard difficulty is 42!");
                }
              }}
            >
              Hard
            </Button>
            <p>
              Enter a number of questions and see how many you can get right!
            </p>
            <p>
              (The max amount of questions for hard difficulty is currently 42)
            </p>
            <h3>
              <u>Endless Mode</u>
            </h3>
          </div>
          <Button
            variant="primary"
            size="lg"
            className="m-2"
            onClick={() => navigate(`/trivia/endless/easy`)}
          >
            Easy
          </Button>
          <Button
            variant="primary"
            size="lg"
            className="m-2"
            onClick={() => navigate(`/trivia/endless/medium`)}
          >
            Medium
          </Button>
          <Button
            variant="primary"
            size="lg"
            className="m-2"
            onClick={() => navigate(`/trivia/endless/hard`)}
          >
            Hard
          </Button>

          <p>Answer as many questions as you can before getting three wrong!</p>
        </div>
      </Form>
    </div>
  );
};

export default Trivia;
