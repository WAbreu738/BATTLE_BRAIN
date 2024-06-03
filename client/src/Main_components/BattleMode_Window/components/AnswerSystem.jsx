import { calculatePoints } from "./pointsystem";
import { useStore } from "../../OptionsProvider";
import { useMutation } from "@apollo/client";
import { ATTACK } from "../../../graphql/mutations";

// const handleAnswer = async (
//   answer,
//   correctAnswer,
//   // currentQuestion,
//   timeLeft,
//   multiplier,
//   setIsAnswered,
//   setAnswerState,
//   setPointsEarned,
//   fetchQuestions,
//   setPlayerOneHealth,
//   setPlayerTwoHealth
// ) => {
//   const { state, setMessage } = useStore();

//   const { attack } = useMutation(ATTACK);

//   setIsAnswered(true);

//   let points = calculatePoints(timeLeft, multiplier);
//   const isCorrect = answer === correctAnswer;

//   const { data } = await attack({
//     variables: { gameId: state.roomcode, isCorrect, amount: points },
//   });

//   setMessage(data.attack.message);

//   // if (answer === correctAnswer) {
//   //   points = calculatePoints(timeLeft, multiplier);
//   //   setAnswerState("correct");
//   // } else {
//   //   setAnswerState("incorrect");
//   // }

//   setPointsEarned(points);

//   // if (answer === currentQuestion.correctAnswer) {
//   //   if (player === "playerOne") {
//   //     setPlayerTwoHealth(
//   //       (prevHealth) => Math.max(0, prevHealth - points),
//   //       5000
//   //     );
//   //   } else {
//   //     setPlayerOneHealth(
//   //       (prevHealth) => Math.max(0, prevHealth - points),
//   //       5000
//   //     );
//   //   }
//   // }

//   setTimeout(() => {
//     setIsAnswered(false);
//     setAnswerState(null);
//     fetchQuestions();
//   }, 5000);

// };

// export default handleAnswer;
