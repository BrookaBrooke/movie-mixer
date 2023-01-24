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
            <Form.Group controlId="numQuestions">
              <Form.Label>Number of Questions</Form.Label>
              <Form.Control
                as="input"
                htmlSize="5"
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
          </div>
          <Link to="/trivia/endless">
            <Button variant="primary" size="lg" className="m-2">
              Endless Mode
            </Button>
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default Trivia;
