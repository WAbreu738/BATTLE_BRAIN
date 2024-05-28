import React, { useState, useEffect } from "react";
import Timer from "./components/timer";
import Round from "./components/round";
import Question from "./components/question_window";
import Multiplier from "./components/multiplier";
import HealthBar from "./components/healthbar";
import WinnerDisplay from "./components/WinnerDisplay";
import RoundScreen from "./components/RoundScreen";

const calculatePoints = (timeLeft, multiplier) => {
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

  return points * multiplier;
};

const BattleMode = () => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [answerState, setAnswerState] = useState(null);
  const [playerOneHealth, setPlayerOneHealth] = useState(3000);
  const [playerTwoHealth, setPlayerTwoHealth] = useState(3000);
  const [winner, setWinner] = useState(null);
  const [round, setRound] = useState(1);
  const [showRoundScreen, setShowRoundScreen] = useState(false);
  const [multiplier, setMultiplier] = useState(1);
  const [pointsEarned, setPointsEarned] = useState(0);

  const fetchQuestions = async () => {
    const url =
      "https://the-trivia-api.com/v2/questions?limit=1&categories=science";
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
    if (showRoundScreen) {
      const timer = setTimeout(() => {
        setShowRoundScreen(false);
        setTimeLeft(15);
        setPointsEarned(0);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showRoundScreen]);

  useEffect(() => {
    if (showRoundScreen) {
      setMultiplier(generateRandomMultiplier());
    }
  }, [showRoundScreen]);

  useEffect(() => {
    if (currentQuestion) {
      setRound((prevRound) => prevRound + 1);
      setShowRoundScreen(true);
    }
  }, [currentQuestion]);

  const generateRandomMultiplier = () => {
    const multipliers = [1, 1.5, 2, 2.5];
    const randomIndex = Math.floor(Math.random() * multipliers.length);
    return multipliers[randomIndex];
  };

  const handleAnswer = (answer, player) => {
    if (isAnswered) return;
    setIsAnswered(true);

    let points = 0;
    if (answer === currentQuestion.correctAnswer) {
      points = calculatePoints(timeLeft, multiplier);
      // setScore(score + points);
      setAnswerState("correct");
    } else {
      setAnswerState("incorrect");
    }

    setPointsEarned(points);

    setTimeout(() => {
      setIsAnswered(false);
      setTimeLeft(10);
      setAnswerState(null);
      fetchQuestions();
    }, 2000);

    // Deduct points from the opponent's health if the answer is correct
    if (answer === currentQuestion.correctAnswer) {
      if (player === "playerOne") {
        setPlayerTwoHealth((prevHealth) => Math.max(0, prevHealth - points));
      } else {
        setPlayerOneHealth((prevHealth) => Math.max(0, prevHealth - points));
      }
    }

    if (playerOneHealth <= 0) {
      setWinner(playerTwo);
    } else if (playerTwoHealth <= 0) {
      setWinner(playerOne);
    }
  };

  const playerOne = {
    name: "Player One",
    avatar: "https://via.placeholder.com/50",
  };

  const playerTwo = {
    name: "Player Two",
    avatar: "https://via.placeholder.com/50",
  };

  return (
    <section className="flex flex-col items-center justify-center relative">
      {showRoundScreen && <RoundScreen round={round} multiplier={multiplier} />}

      {winner ? (
        <WinnerDisplay winner={winner} />
      ) : (
        <>
          {countdown > 0 ? (
            <div className="text-6xl text-white">
              <h1>Game starting in {countdown}...</h1>
            </div>
          ) : (
            <div className="bg-cyan-600 border border-cyan-800 relative bg-opacity-90 shadow-xl rounded-xl max-w-4xl w-full flex flex-col md:flex-row items-start mt-40">
              <div className="flex flex-col items-center justify-center absolute left-3 top-1/2 -translate-y-1/2 z-10">
                <HealthBar player={playerOne} health={playerOneHealth} />
              </div>
              <Timer
                timeLeft={timeLeft}
                setTimeLeft={setTimeLeft}
                isAnswered={isAnswered}
                showRoundScreen={showRoundScreen}
              />

              <div className="flex-grow p-5 ">
                <div className="relative flex justify-between items-center mb-5 p-3 bg-cyan-800 rounded-xl mx-16">
                  <Round round={round} />
                  <Multiplier multiplier={multiplier} />
                </div>

                <div className="p-5 bg-cyan-800 rounded-xl flex justify-center mx-16 min-h-80">
                  {currentQuestion && (
                    <Question
                      question={currentQuestion.question.text}
                      options={currentQuestion.incorrectAnswers}
                      correctAnswer={currentQuestion.correctAnswer}
                      handleAnswer={(answer) =>
                        handleAnswer(answer, "playerOne")
                      }
                      answerState={answerState}
                    />
                  )}
                </div>

                <div className="text-white text-xl mt-4">
                  Points: {pointsEarned}
                </div>
              </div>

              <div className="flex flex-col items-center justify-center absolute right-3 top-1/2 -translate-y-1/2">
                <HealthBar player={playerTwo} health={playerTwoHealth} />
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default BattleMode;
