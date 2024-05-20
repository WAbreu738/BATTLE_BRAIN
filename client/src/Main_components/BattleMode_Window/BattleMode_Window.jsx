import React, { useState, useEffect } from "react";
import Timer from "./components/timer";
import Round from "./components/round";
import Question from "./components/question_window";
import Multiplier from "./components/multiplier";

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

const BattleMode = () => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [isAnswered, setIsAnswered] = useState(false);
  const [countdown, setCountdown] = useState(3); // 3-second countdown state
  const [answerState, setAnswerState] = useState(null); // State to handle correct/incorrect answer

  const fetchQuestions = async () => {
    const url = "https://the-trivia-api.com/v2/questions?limit=1&categories=science";
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
      setTimeLeft(10);
      setAnswerState(null);
      fetchQuestions();
    }, 2000);
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen p-4 bg-black">
      {countdown > 0 ? (
        <div className="text-6xl text-white">
          <h1>Game starting in {countdown}...</h1>
        </div>
      ) : (
        <div className="bg-purple-900 bg-opacity-80 shadow-lg rounded-lg p-10 max-w-4xl w-full">
          <div className="flex justify-between">
            <Round />
            <Timer timeLeft={timeLeft} setTimeLeft={setTimeLeft} isAnswered={isAnswered} />
            <Multiplier />
          </div>

          <div>
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

          <div className="text-white text-xl mt-4">Score: {score}</div>
        </div>
      )}
    </main>
  );
};

export default BattleMode;
