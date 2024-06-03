import React from "react";
import Confetti from "react-confetti";
import { NavLink } from "react-router-dom";
import { useStore } from "../../OptionsProvider";

const WinnerDisplay = ({ winner }) => {
  const { state } = useStore(); // trevor says const state EQUALS usestore

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
      <Confetti width={window.innerWidth} height={window.innerHeight} />
      <div className="text-center text-white">
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
        </button>
        <NavLink
          className="mt-4 px-4 py-3 bg-purple-700 text-white rounded-md"
          to={`/category/${state.roomcode}`}
        >
          Back to Categories
        </NavLink> */}
      </div>
    </div>
  );
};

export default WinnerDisplay;
