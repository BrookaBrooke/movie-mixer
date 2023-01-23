import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Trivia = () => {
  const [numQuestions, setNumQuestions] = useState(1);
  return (
    <div className="container">
      <Link to={`/trivia/limited/${numQuestions}`}>
        <Button variant="primary" size="lg">
          Limited Mode
        </Button>
      </Link>
      <label htmlFor="numQuestions">
        Number of Questions (min: 1 max: 50):{" "}
      </label>
      <input
        type="number"
        min="1"
        max="50"
        onChange={(e) => setNumQuestions(e.target.value)}
        value={numQuestions}
      ></input>
      <Link to="/trivia/endless">
        <Button variant="primary" size="lg">
          Endless Mode
        </Button>
      </Link>
    </div>
  );
};

export default Trivia;
