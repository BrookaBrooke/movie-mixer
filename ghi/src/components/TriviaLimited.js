import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import he from "he";

const TriviaLimited = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answerCheck, setAnswerCheck] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const { numQuestions } = useParams();

  useEffect(() => {
    const fetchQuestions = async () => {
      if (numQuestions !== undefined && !isNaN(numQuestions)) {
        try {
          const response = await fetch(
            `https://opentdb.com/api.php?amount=${numQuestions}&category=11`
          );
          const { results } = await response.json();
          setQuestions(
            results.map((question) => ({
              ...question,
              question: he.decode(question.question),
              correct_answer: he.decode(question.correct_answer),
              incorrect_answers: question.incorrect_answers.map((answer) =>
                he.decode(answer)
              ),
            }))
          );

          setLoading(false);
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchQuestions();
  }, [numQuestions]);

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
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setScore((s) => {
        setGameOver(true);
        setShowModal(true);
        return s;
      });
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
  const { question, correct_answer, incorrect_answers } = currentQuestion;

  const answers = [correct_answer, ...incorrect_answers];
  answers.sort(() => Math.random() - 0.5);

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
                  Final score: {score}/{questions.length}
                </p>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={() => window.location.reload()}>
                  Play Again
                </Button>
              </Modal.Footer>
            </Modal>
            <Button onClick={() => window.location.reload()}>Play Again</Button>
          </>
        ) : (
          <>
            <div className="card-header">
              <h2>{question}</h2>
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
                Current score: {score}/{questions.length}
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
