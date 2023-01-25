import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

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
              onClick={() => navigate(`/trivia/limited/${numQuestions}`)}
            >
              Limited Mode
            </Button>
            <p>
              Enter a number of questions and see how many you can get right!
            </p>
          </div>
          <Link to="/trivia/endless">
            <Button variant="primary" size="lg" className="m-2">
              Endless Mode
            </Button>
          </Link>
          <p>Answer as many questions as you can before getting three wrong!</p>
        </div>
      </Form>
    </div>
  );
};

export default Trivia;
