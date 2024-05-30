import React, { useState, useEffect } from "react";
import Timer from "./components/timer";
import Round from "./components/round";
import Question from "./components/question_window";
import Multiplier from "./components/multiplier";
import HomeBtn from "../HomeBtn";
import BackBtn from "../BackBtn";

import { useLocation } from "react-router-dom";

const calculatePoints = (timeLeft) => {
  if (timeLeft >= 9) return 500;
  if (timeLeft >= 8) return 450;
  if (timeLeft >= 7) return 400;
  if (timeLeft >= 6) return 350;
  if (timeLeft >= 5) return 300;
  if (timeLeft >= 4) return 250;
  if (timeLeft >= 3) return 200;
  if (timeLeft >= 2) return 150;
  if (timeLeft >= 1) return 100;
  return 50;
};

const SPPlay = () => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [isAnswered, setIsAnswered] = useState(false);
  const [countdown, setCountdown] = useState(3); // 3-second countdown state
  const [answerState, setAnswerState] = useState(null); // State to handle correct/incorrect answer

  const location = useLocation();
  const category = location.state.category;

  const fetchQuestions = async () => {
    const url = `https://the-trivia-api.com/v2/questions?limit=1&categories=${category}`;
    const headers = {
      "X-API-Key": "Q6qDHeKAdmG77q5Eg7dSWAQT4",
    };

    try {
      const response = await fetch(url, { headers: headers });
      const data = await response.json();
      setCurrentQuestion(data[0]);
    } catch (error) {
      console.error("Error fetching trivia questions:", error);
    }
  };

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      fetchQuestions();
    }
  }, [countdown]);

  const handleAnswer = (answer) => {
    if (isAnswered) return;
    setIsAnswered(true);

    if (answer === currentQuestion.correctAnswer) {
      const points = calculatePoints(timeLeft);
      setScore(score + points);
      setAnswerState("correct");
    } else {
      setAnswerState("incorrect");
    }

    setTimeout(() => {
      setIsAnswered(false);
      setTimeLeft(15);
      setAnswerState(null);
      fetchQuestions();
    }, 2000);
  };

  return (
    <section className="flex flex-col items-center justify-center h-screen p-4 ">
      {countdown > 0 ? (
        <div className="text-6xl text-white">
          <h1>Game starting in {countdown}...</h1>
        </div>
      ) : (
        <div className="relative bg-cyan-600 border border-cyan-800 bg-opacity-90 shadow-xl rounded-xl p-10 max-w-4xl w-full">
          <Timer
            timeLeft={timeLeft}
            setTimeLeft={setTimeLeft}
            isAnswered={isAnswered}
          />

          <div className="flex justify-between items-center mb-5 p-3 bg-cyan-800 rounded-xl">
            <Round />
            <Multiplier />
          </div>

          {/* Make sure API call is made before referencing the object */}
          {/* {currentQuestion && <p>{currentQuestion.difficulty}</p>} */}

          <div className="p-5 bg-cyan-800 rounded-xl flex justify-center min-h-80">
            {currentQuestion && (
              <Question
                question={currentQuestion.question.text}
                options={currentQuestion.incorrectAnswers}
                correctAnswer={currentQuestion.correctAnswer}
                handleAnswer={handleAnswer}
                answerState={answerState}
              />
            )}
          </div>
          <div className=" absolute -top-5 -right-5">
            <HomeBtn />
          </div>
          <div className=" absolute -top-5 -left-5">
            <BackBtn />
          </div>

          {/* <div className="text-white text-xl mt-4">Score: {score}</div> */}
        </div>
      )}
    </section>
  );
};

export default SPPlay;
