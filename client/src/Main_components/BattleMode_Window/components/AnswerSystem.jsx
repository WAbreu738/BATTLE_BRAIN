import { calculatePoints } from "./pointsystem";

const handleAnswer = (
  answer,
  player,
  currentQuestion,
  timeLeft,
  multiplier,
  setIsAnswered,
  setAnswerState,
  setPointsEarned,
  fetchQuestions,
  setPlayerOneHealth,
  setPlayerTwoHealth,
  playerOneHealth,
  playerTwoHealth,
  setWinner,
  setTimeLeft
) => {
  setIsAnswered(true);

  let points = 0;
  if (answer === currentQuestion.correctAnswer) {
    points = calculatePoints(timeLeft, multiplier);
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
  }, 5000);
  //Timer to set animation ^

  if (answer === currentQuestion.correctAnswer) {
    if (player === "playerOne") {
      setPlayerTwoHealth(
        (prevHealth) => Math.max(0, prevHealth - points),
        5000
      );
    } else {
      setPlayerOneHealth(
        (prevHealth) => Math.max(0, prevHealth - points),
        5000
      );
    }
  }
  //Timer set for health bar

  if (playerOneHealth <= 0) {
    setWinner("Player Two");
  } else if (playerTwoHealth <= 0) {
    setWinner("Player One");
  }
};

export default handleAnswer;
