// components/WinnerDisplay.jsx
import React from "react";
import Confetti from "react-confetti";
import { NavLink } from "react-router-dom";

const WinnerDisplay = ({ score }) => {
  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
      <Confetti width={window.innerWidth} height={window.innerHeight} />
      <div className="text-center text-white">
        <img
          // src={winner.avatar}
          // alt={winner.name}
          className="w-32 h-32 rounded-full mb-4 border-4 border-yellow-500 mx-auto"
        />
        <h2 className="text-6xl font-bold mb-9">GAME OVER</h2>
        {/* <div className="text-4xl">🏆 👑 🏆</div> */}
        <div className="text-3xl font-bold mb-4 mt-8">HIGHSCORE: {score}</div>
        <button
          className="mt-8 mr-4 px-4 py-3 bg-purple-700 text-white rounded-md"
          onClick={() => window.location.reload()} // Reload the page to restart the game
        >
          Play Again
        </button>
        <NavLink
          className="mt-4 px-4 py-3 bg-purple-700 text-white rounded-md"
          to="/singleplayer" // Redirect to categories page
        >
          Back to Categories
        </NavLink>
      </div>
    </div>
  );
};

export default WinnerDisplay;
