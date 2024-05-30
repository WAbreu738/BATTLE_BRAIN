import React, { useState, useEffect } from "react";
import HomeBtn from "../HomeBtn";
import BackBtn from "../BackBtn";
import Timer from "./components/timer";
import Round from "./components/round";
import Question from "./components/question_window";
import Multiplier from "./components/multiplier";
import HealthBar from "./components/healthbar";
import WinnerDisplay from "./components/WinnerDisplay";
import RoundScreen from "./components/RoundScreen";
import playerOne from "./components/player1";
import playerTwo from "./components/player2";
import handleAnswer from "./components/AnswerSystem";
// import fetchQuestions from "./components/API";
import { generateRandomMultiplier } from "./components/pointsystem";
import PointsDisplay from "./components/PointsDisplay";

import { useLocation } from "react-router-dom";
import { useStore } from "../OptionsProvider"; //GlobalState

const BattleMode = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [answerState, setAnswerState] = useState(null);
  const [playerOneHealth, setPlayerOneHealth] = useState(3000);
  const [playerTwoHealth, setPlayerTwoHealth] = useState(3000);
  const [winner, setWinner] = useState(null);
  const [round, setRound] = useState(0);
  const [showRoundScreen, setShowRoundScreen] = useState(false);
  const [multiplier, setMultiplier] = useState(1);
  const [pointsEarned, setPointsEarned] = useState(null);
  // const [playerOnePoints, setPlayerOnePoints] = useState(0);
  // const [playerTwoPoints, setPlayerTwoPoints] = useState(0);
  // const [showPoints, setShowPoints] = useState(false);
  // const [bothPlayersAnswered, setBothPlayersAnswered] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      fetchQuestions(setCurrentQuestion);
    }
  }, [countdown]);

  useEffect(() => {
    if (currentQuestion) {
      setRound((prevRound) => prevRound + 1);
      setShowRoundScreen(true);
    }
  }, [currentQuestion]);

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

  const initialState = useStore();
  const { difficulty, category } = initialState.state || {};

  // const location = useLocation();
  // const category = location.state.category;
  console.log(category);
  // console.log(difficulty);

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

  // const handleAnimationComplete = () => {
  //   setShowPoints(false);
  //   if (answerState === "correct") {
  //     if (pointsEarned > 0) {
  //       setPlayerTwoHealth((prevHealth) =>
  //         Math.max(0, prevHealth - pointsEarned)
  //       );
  //     } else {
  //       setPlayerOneHealth((prevHealth) =>
  //         Math.max(0, prevHealth - pointsEarned)
  //       );
  //     }
  //   }

  //   if (playerOneHealth <= 0) {
  //     setWinner(playerTwo);
  //   } else if (playerTwoHealth <= 0) {
  //     setWinner(playerOne);
  //   }
  // };
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
                        handleAnswer(
                          answer,
                          "playerOne",
                          currentQuestion,
                          timeLeft,
                          multiplier,
                          setIsAnswered,
                          setAnswerState,
                          setPointsEarned,
                          fetchQuestions(setCurrentQuestion),
                          setPlayerOneHealth,
                          setPlayerTwoHealth,
                          playerOneHealth,
                          playerTwoHealth,
                          setWinner,
                          setTimeLeft
                        )
                      }
                      answerState={answerState}
                    />
                  )}
                </div>

                <div className="text-white text-xl mt-3 flex justify-between">
                  <div className="text-3xl font-bold">P1: {pointsEarned}</div>

                  {/* {bothPlayersAnswered && <div>{difference}</div>} */}

                  <div className="text-3xl font-bold">{pointsEarned} :P2</div>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center absolute right-3 top-1/2 -translate-y-1/2">
                <HealthBar player={playerTwo} health={playerTwoHealth} />
              </div>
              <div className=" absolute -top-5 -right-5">
                <HomeBtn />
              </div>
              <div className=" absolute -top-5 -left-5">
                <BackBtn />
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default BattleMode;
