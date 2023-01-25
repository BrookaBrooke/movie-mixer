import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import he from "he";

const TriviaLimited = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answerCheck, setAnswerCheck] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [questionNum, setQuestionNum] = useState(1);
  const [usedQuestions, setUsedQuestions] = useState([]);
  const [newNumQuestions, setNewNumQuestions] = useState(1);
  const { numQuestions, difficulty } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuestions();
  }, [numQuestions]);

  const fetchQuestions = async () => {
    try {
      const response = await fetch(
        `https://opentdb.com/api.php?amount=${numQuestions}&category=11&difficulty=${difficulty}`
      );
      const { results } = await response.json();
      const newQuestions = results.filter(
        (question) =>
          !usedQuestions.map((q) => q.question).includes(question.question)
      );

      newQuestions.forEach((question) => {
        const { correct_answer, incorrect_answers } = question;
        const answers = [correct_answer, ...incorrect_answers];
        answers.sort(() => Math.random() - 0.5);
        question.answers = answers;
      });

      setUsedQuestions((prevQuestions) => {
        setQuestions(
          newQuestions.map((question) => ({
            ...question,
            question: he.decode(question.question),
            correct_answer: he.decode(question.correct_answer),
            incorrect_answers: question.incorrect_answers.map((answer) =>
              he.decode(answer)
            ),
            answers: question.answers.map((answer) => he.decode(answer)),
          }))
        );
        return [...prevQuestions, ...newQuestions];
      });
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAnswerClick = (answer) => {
    if (answer === correct_answer) {
      setScore((s) => {
        setAnswerCheck("Correct!");
        setShowModal(true);
        return s + 1;
      });
    } else {
      setAnswerCheck(`Wrong! the correct answer was ${correct_answer}`);
      setShowModal(true);
    }

    if (questionNum >= numQuestions) {
      setScore((s) => {
        setGameOver(true);
        setShowModal(true);
        return s;
      });
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setQuestionNum((n) => n + 1);
    } else {
      fetchQuestions();
      setCurrentQuestionIndex(0);
      setQuestionNum((n) => n + 1);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const { question, correct_answer, answers } = currentQuestion;

  return (
    <div className="container">
      <h1 className="text-center my-3">Movie Trivia</h1>
      <div className="card">
        {gameOver ? (
          <>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
              <Modal.Header closeButton>
                <Modal.Title>{answerCheck}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>Game Over!</p>
                <p>
                  Final score: {score}/{numQuestions}
                </p>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  onClick={() => {
                    navigate(`/trivia/limited/${newNumQuestions}`);
                    window.location.reload();
                  }}
                >
                  Play Again
                </Button>

                <Form.Group controlId="numQuestions">
                  <Form.Label>Number of Questions</Form.Label>
                  <Form.Control
                    type="number"
                    min="1"
                    onChange={(e) => setNewNumQuestions(e.target.value)}
                    value={newNumQuestions}
                    placeholder="Enter number of questions"
                  />
                </Form.Group>
                <Button onClick={() => navigate(`/trivia`)}>Trivia Home</Button>
              </Modal.Footer>
            </Modal>
            <Form.Group controlId="numQuestions">
              <Form.Label>Number of Questions</Form.Label>
              <Form.Control
                type="number"
                min="1"
                onChange={(e) => setNewNumQuestions(e.target.value)}
                value={newNumQuestions}
                placeholder="Enter number of questions"
              />
            </Form.Group>
            <Button
              onClick={() => {
                navigate(`/trivia/limited/${newNumQuestions}`);
                window.location.reload();
              }}
            >
              Play Again
            </Button>

            <Button onClick={() => navigate(`/trivia`)}>Trivia Home</Button>
          </>
        ) : (
          <>
            <div className="card-header">
              <h2>
                {questionNum}. {question}
              </h2>
            </div>
            <div className="card-body">
              {answers.map((answer, index) => (
                <button
                  key={index}
                  className="btn btn-primary m-2"
                  onClick={() => handleAnswerClick(answer)}
                >
                  {answer}
                </button>
              ))}
            </div>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
              <Modal.Header closeButton>
                <Modal.Title>{answerCheck}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Current score: {score}/{numQuestions}
              </Modal.Body>
              <Modal.Footer></Modal.Footer>
            </Modal>
          </>
        )}
      </div>
    </div>
  );
};
export default TriviaLimited;
