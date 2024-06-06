import { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { NavLink } from "react-router-dom";
import { useStore } from "../../OptionsProvider";
import { START_BATTLE, RESET_GAME } from "../../../graphql/mutations";
import { useQuery, useMutation } from "@apollo/client";

const WinnerDisplay = ({ winner }) => {
  const { state, setDifficulty, setCategory } = useStore(); // trevor says const state EQUALS usestore
  const [start, setStart] = useState(true);

  const [startBattle] = useMutation(START_BATTLE, {
    variables: { gameId: state.roomcode, startBattle: start },
  });

  const [resetGame] = useMutation(RESET_GAME, {
    variables: { gameId: state.roomcode },
  });

  useEffect(() => {
    startBattle();
  }, [start]);

  //brings back to category and resets all values
  const handleSetStart = () => {
    resetGame();
    setStart(false);
    setDifficulty("");
    setCategory("");
  };

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
      <Confetti width={window.innerWidth} height={window.innerHeight} />
      <div className="text-center text-white md:scale-100 scale-90">
        <img
          src={winner.profile}
          alt={winner.username}
          className="w-32 h-32 rounded-full mb-4 border-4 border-yellow-500 mx-auto"
        />
        <h2 className="text-6xl font-bold mb-4">{winner.username} Wins!</h2>
        <div className="text-4xl">🏆 👑 🏆</div>
        {/* <button
          className="mt-8 mr-4 px-4 py-3 bg-purple-700 text-white rounded-md"
          onClick={() => window.location.reload()}
        >
          Play Again
        </button> */}
        <button
          className="mt-4 px-4 py-3 bg-purple-700 text-white rounded-md"
          onClick={handleSetStart}
        >
          Back to Categories
        </button>
      </div>
    </div>
  );
};

export default WinnerDisplay;
