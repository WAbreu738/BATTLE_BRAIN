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
  setPlayerTwoHealth
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

  setTimeout(() => {
    setIsAnswered(false);
    setAnswerState(null);
    fetchQuestions();
  }, 5000);
};

export default handleAnswer;
