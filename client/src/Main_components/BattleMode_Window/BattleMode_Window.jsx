import React, { useState, useEffect } from "react";
import Timer from "./components/timer";
import Round from "./components/round";
import Question from "./components/question_window";
import Multiplier from "./components/multiplier";
import HealthBar from "./components/healthbar";
import WinnerDisplay from "./components/WinnerDisplay"; // Import the WinnerDisplay component
import RoundScreen from "./components/RoundScreen";

const calculatePoints = (timeLeft, multiplier) => {
  let points = 0;
  if (timeLeft >= 9) points = 500;
  else if (timeLeft >= 8) points = 450;
  else if (timeLeft >= 7) points = 400;
  else if (timeLeft >= 6) points = 350;
  else if (timeLeft >= 5) points = 300;
  else if (timeLeft >= 4) points = 250;
  else if (timeLeft >= 3) points = 200;
  else if (timeLeft >= 2) points = 150;
  else if (timeLeft >= 1) points = 100;
  else points = 50;

  return points * multiplier;
}

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
  const [round, setRound] = useState(0); // State to track round number
  const [showRoundScreen, setShowRoundScreen] = useState(false);
  const [multiplier, setMultiplier] = useState(1);
  const [pointsEarned, setPointsEarned] = useState(0)

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
      setShowRoundScreen(true); // Directly show round screen after countdown
      fetchQuestions(); // Fetch questions to start the game
    }
  }, [countdown]);

  useEffect(() => {
    // Update round after each question
    if (currentQuestion) {
      setRound((prevRound) => prevRound + 1);
      setShowRoundScreen(true); // Show round screen after each question
    }
  }, [currentQuestion]);

  useEffect(() => {
    if (showRoundScreen && round > 1) {
      const timer = setTimeout(() => {
        setShowRoundScreen(false);
        setTimeLeft(10); // Reset timer after round screen is over
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showRoundScreen, round]);


  const generateRandomMultiplier = () => {
    const multipliers = [1, 1.5, 2, 2.5]; // Possible multiplier values
    const randomIndex = Math.floor(Math.random() * multipliers.length);
    return multipliers[randomIndex];
  };

  useEffect(() => {
    if (showRoundScreen) {
      setMultiplier(generateRandomMultiplier()); // Generate random multiplier when round screen is shown
    }
  }, [showRoundScreen]);


  const handleAnswer = (answer, player) => {
    if (isAnswered) return;
    setIsAnswered(true);

    if (answer === currentQuestion.correctAnswer) {
      const points = calculatePoints(timeLeft, multiplier); // Use multiplier here
      setScore(score + points);
      setAnswerState("correct");

      // Deduct points from the opposing player's health
      if (player === "playerOne") {
        setPlayerTwoHealth((prevHealth) => Math.max(0, prevHealth - points));
      } else {
        setPlayerOneHealth((prevHealth) => Math.max(0, prevHealth - points));
      }
    } else {
      setAnswerState("incorrect");
    }

    setTimeout(() => {
      setIsAnswered(false);
      setTimeLeft(10);
      setAnswerState(null);
      fetchQuestions();
    }, 2000);

    // Check if the game is over
    if (playerOneHealth - (player === "playerTwo" ? points : 0) <= 0) {
      setWinner({ ...playerTwo });
    } else if (playerTwoHealth - (player === "playerOne" ? points : 0) <= 0) {
      setWinner({ ...playerOne });
    }
  };

  const playerOne = {
    name: "Player One",
    avatar: "https://via.placeholder.com/50", // Replace with actual avatar URL
  };

  const playerTwo = {
    name: "Player Two",
    avatar: "https://via.placeholder.com/50", // Replace with actual avatar URL
  };


  return (
    <main className="flex flex-col items-center justify-center h-screen bg-black">
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
            <div className="bg-purple-900 bg-opacity-80 shadow-lg rounded-lg max-w-4xl w-full flex flex-col md:flex-row items-start mt-5">
              {!showRoundScreen && (
                <div className="flex flex-col items-center justify-center p-3">
                  <HealthBar player={playerOne} health={playerOneHealth} />
                  
                </div>
              )}
              <div className="flex-grow p-5">
                <div className="flex justify-between mb-5 p-5 bg-gray-800 rounded-md">
                  <Round round={round} />
                  <Timer
                    timeLeft={timeLeft}
                    setTimeLeft={setTimeLeft}
                    isAnswered={isAnswered}
                  />
                  <Multiplier multiplier={multiplier} />
                </div>

                <div className="mb-5 p-5 bg-gray-800 rounded-md">
                  {currentQuestion && (
                    <Question
                      question={currentQuestion.question.text}
                      options={currentQuestion.incorrectAnswers}
                      correctAnswer={currentQuestion.correctAnswer}
                      handleAnswer={(answer) => handleAnswer(answer, "playerOne")}
                      answerState={answerState}
                    />
                  )}
                </div>

                <div className="text-white text-xl mt-4">Score: {score}</div>
              </div>
              {!showRoundScreen && (
                <div className="flex flex-col items-center justify-center p-3">
                  <HealthBar player={playerTwo} health={playerTwoHealth} />
                </div>
              )}
            </div>
          )}
        </>
      )}
    </main>
  );
};

export default BattleMode;

