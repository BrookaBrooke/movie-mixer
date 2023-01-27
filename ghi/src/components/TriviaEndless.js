import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import CloseButton from "react-bootstrap/CloseButton";
import he from "he";

const TriviaEndless = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answerCheck, setAnswerCheck] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [numWrong, setNumWrong] = useState(0);
  const [usedQuestions, setUsedQuestions] = useState([]);
  const [hardWon, setHardWon] = useState(false);
  const { difficulty } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuestions();
  }, []);

  function shuffle(array) {
    let n = array.length,
      i,
      j;

    while (n) {
      j = Math.floor(Math.random() * n--);
      i = array[n];
      array[n] = array[j];
      array[j] = i;
    }

    return array;
  }

  const fetchQuestions = async () => {
    try {
      const response = await fetch(
        `https://opentdb.com/api.php?amount=42&category=11&difficulty=${difficulty}`
      );
      const { results } = await response.json();
      const newQuestions = results.filter(
        (question) =>
          !usedQuestions.map((q) => q.question).includes(question.question)
      );

      newQuestions.forEach((question) => {
        const { correct_answer, incorrect_answers } = question;
        const answers = [correct_answer, ...incorrect_answers];
        shuffle(answers);
        question.answers = answers;
      });

      setUsedQuestions((prevQuestions) => {
        setQuestions(
          shuffle(newQuestions).map((question) => ({
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
        if (difficulty === "easy") {
          return s + 100;
        } else if (difficulty === "medium") {
          return s + 300;
        } else if (difficulty === "hard") {
          return s + 500;
        }
      });
    } else {
      setAnswerCheck(`Wrong! the correct answer was ${correct_answer}`);
      setNumWrong((n) => n + 1);
      if (numWrong === 2) {
        setGameOver(true);
      }
      setShowModal(true);
    }
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (difficulty === "hard") {
      setHardWon(true);
      setGameOver(true);
      setShowModal(true);
    } else {
      fetchQuestions();
      setCurrentQuestionIndex(0);
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
    <div className="trivia-background">
      <div className="row">
        <div className="offset-3 col-6">
          <div className="card trivia-box">
            <h1 className="text-center p-3">Movie Trivia</h1>
            {gameOver ? (
              <>
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                  <div className="trivia-modal">
                    <Modal.Header>
                      <Modal.Title>{answerCheck}</Modal.Title>
                      <CloseButton
                        onClick={() => setShowModal(false)}
                        variant="white"
                      />
                    </Modal.Header>
                    <Modal.Body>
                      <p>Game Over!</p>
                      {hardWon ? (
                        <p>
                          Contragulations! You made through all the hard
                          questions!
                        </p>
                      ) : (
                        <></>
                      )}
                      <p>Final score: {score}</p>
                    </Modal.Body>
                    <Modal.Footer>
                      <button
                        type="button"
                        className="btn btn-danger m-2"
                        onClick={() => window.location.reload()}
                      >
                        Play Again
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary m-2"
                        onClick={() => navigate("/trivia")}
                      >
                        Trivia Home
                      </button>
                    </Modal.Footer>
                  </div>
                </Modal>
                <button
                  type="button"
                  style={{ width: "auto" }}
                  className="btn btn-danger m-2 text-center d-flex align-self-center mx-auto"
                  onClick={() => window.location.reload()}
                >
                  Play Again
                </button>

                <button
                  type="button"
                  style={{ width: "auto" }}
                  className="btn btn-secondary m-2 text-center d-flex align-self-center mx-auto"
                  onClick={() => navigate("/trivia")}
                >
                  Trivia Home
                </button>
              </>
            ) : (
              <>
                <div className="card-header">
                  <h2>{question}</h2>
                </div>
                <div className="card-body">
                  {answers.map((answer, index) => (
                    <button
                      type="button"
                      key={index}
                      className="btn btn-danger m-2"
                      onClick={() => handleAnswerClick(answer)}
                    >
                      {answer}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => navigate("/trivia")}
                >
                  Quit to main page
                </button>
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                  <div className="trivia-modal">
                    <Modal.Header>
                      <Modal.Title>{answerCheck}</Modal.Title>
                      <CloseButton
                        onClick={() => setShowModal(false)}
                        variant="white"
                      />
                    </Modal.Header>
                    <Modal.Body>
                      Current score: {score} Lives Left: {3 - numWrong}
                    </Modal.Body>
                    <Modal.Footer>
                      <button
                        type="button"
                        onClick={() => setShowModal(false)}
                        variant="white"
                        className="btn btn-danger"
                      >
                        Next Question
                      </button>
                    </Modal.Footer>
                  </div>
                </Modal>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default TriviaEndless;
