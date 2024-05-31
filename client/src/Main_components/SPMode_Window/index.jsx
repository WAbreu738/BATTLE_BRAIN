import React, { useState, useEffect } from "react";
import Timer from "./components/timer";
import Round from "./components/round";
import Question from "./components/question_window";
import HomeBtn from "../HomeBtn";
import BackBtn from "../BackBtn";
import { useStore } from "../OptionsProvider";
import GameOver from "./components/GameOver";

const calculatePoints = (timeLeft) => {
  let points = 0;
  if (timeLeft >= 14) points = 500;
  else if (timeLeft >= 13) points = 470;
  else if (timeLeft >= 12) points = 440;
  else if (timeLeft >= 11) points = 410;
  else if (timeLeft >= 10) points = 380;
  else if (timeLeft >= 9) points = 350;
  else if (timeLeft >= 8) points = 320;
  else if (timeLeft >= 7) points = 290;
  else if (timeLeft >= 6) points = 260;
  else if (timeLeft >= 5) points = 230;
  else if (timeLeft >= 4) points = 200;
  else if (timeLeft >= 3) points = 170;
  else if (timeLeft >= 2) points = 140;
  else if (timeLeft >= 1) points = 100;
  else points = 50;
  return points;
};

const SPPlay = () => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [isAnswered, setIsAnswered] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [answerState, setAnswerState] = useState(null);
  const [round, setRound] = useState(1);
  const [gameover, setGameOver] = useState(null);
  const [strikes, setStrikes] = useState(0);

  const initialState = useStore();
  const { difficulty, category } = initialState.state || {};

  const fetchQuestions = async () => {
    const url = `https://the-trivia-api.com/v2/questions?categories=${category}&limit=1&{difficulties=${difficulty}`;
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

  useEffect(() => {
    if (strikes === 3) {
      setTimeout(() => {
        setGameOver({ score });
      }, 2000);
    }
  }, [strikes]);

  useEffect(() => {
    if (timeLeft < 0) {
      setAnswerState("incorrect");
      setStrikes((prevStrikes) => prevStrikes + 1);
      setTimeout(() => {
        setIsAnswered(false);
        setAnswerState(null);
        fetchQuestions();
        setRound((prevRound) => prevRound + 1);
        setTimeLeft(15);
      }, 2000);
    }
  }, [timeLeft]);

  const handleAnswer = (answer) => {
    if (isAnswered) return;
    setIsAnswered(true);

    if (answer === currentQuestion.correctAnswer) {
      const points = calculatePoints(timeLeft);
      setScore(score + points);
      setAnswerState("correct");

      setTimeout(() => {
        setIsAnswered(false);
        setAnswerState(null);
        fetchQuestions();
        setRound((prevRound) => prevRound + 1);
        setTimeLeft(15);
      }, 2000);
    } else {
      setAnswerState("incorrect");
      setStrikes((prevStrikes) => prevStrikes + 1);
      setTimeout(() => {
        setIsAnswered(false);
        setAnswerState(null);
        fetchQuestions();
        setRound((prevRound) => prevRound + 1);
        setTimeLeft(15);
      }, 2000);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center h-screen p-4 ">
      {countdown > 0 ? (
        <div className="text-6xl text-white">
          <h1>Game starting in {countdown}...</h1>
        </div>
      ) : gameover ? (
        <GameOver score={score} />
      ) : (
        <div className="relative bg-cyan-600 border border-cyan-800 bg-opacity-90 shadow-xl rounded-xl p-10 max-w-4xl w-full">
          <Timer
            timeLeft={timeLeft}
            setTimeLeft={setTimeLeft}
            isAnswered={isAnswered}
          />

          <div className="flex justify-between items-center mb-5 p-3 bg-cyan-800 rounded-xl">
            <Round round={round} />
            <div className="ml-auto flex items-center">
              {Array.from({ length: strikes }).map((_, index) => (
                <div key={index} className="text-3xl text-red-600 mx-1">
                  X
                </div>
              ))}
              <div className="text-white font-bold text-3xl text-center ml-4">
                Score: {score}
              </div>
            </div>
          </div>

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
        </div>
      )}
    </section>
  );
};

export default SPPlay;
