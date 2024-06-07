// components/WinnerDisplay.jsx
import React from "react";
import Confetti from "react-confetti";
import { NavLink } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { useState, useEffect } from "react";
import { UPDATE_SCORE } from "../../../graphql/mutations";
import { GET_STATS, GET_AVATAR } from "../../../graphql/queries";
import { useStore } from "../../OptionsProvider";

const GameOver = ({ score }) => {
  const { state } = useStore();
  const { data, loading, error } = useQuery(GET_STATS);
  const { loading: avatarLoading, data: avatarData } = useQuery(GET_AVATAR);
  const oldScore = data?.getStats?.highScore;

  const [highScore, setHighScore] = useState(oldScore); // get highscore form graphql and append it here

  // console.log("stats1", data.getStats.highScore);

  const [updateScore] = useMutation(UPDATE_SCORE, {
    variables: { highScore: score },
  });

  useEffect(() => {
    if (!loading) {
      handleSetNewHighScore();
    }
  }, [loading]);

  const handleSetNewHighScore = async () => {
    if (score > oldScore) {
      setHighScore(score);
      await updateScore();
    }
  }; //JUST OVERIDES THE OLD VALUE

  // console.log("stats2", data.getStats.highScore);

  // setHighScore({ highScore: score }); // set highscore to current score

  // updateScore();
  // console.log("stats2", data);
  //get the score(ingame) , get stats (graphql)
  // currentScore - setCurrentScore  (score PROPS)
  // highScore - setHighScore (graphql)
  // if currentScore > highScore then setHighScore to currentScore

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
      <Confetti width={window.innerWidth} height={window.innerHeight} />
      <div className="text-center text-white md:scale-100 scale-90">
        <h1 className="font-bold text-4xl mb-3">{state.user.username}</h1>
        <img
          src={avatarLoading ? "" : avatarData?.getAvatar?.profile}
          // alt={winner.name}
          className="w-32 h-32 rounded-full mb-4 border-4 border-yellow-500 mx-auto"
        />
        <h2 className="text-6xl font-bold mb-9">GAME OVER</h2>
        {/* <div className="text-4xl">🏆 👑 🏆</div> */}
        <div className="text-3xl font-bold mb-4 mt-8">SCORE: {score}</div>
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

export default GameOver;
