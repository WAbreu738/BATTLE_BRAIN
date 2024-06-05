import { NavLink } from "react-router-dom";
import { useStore } from "../../OptionsProvider";
import startBtn from "../../../assets/images/START.png";
import { useMutation } from "@apollo/client";
import { START_GAME } from "../../../graphql/mutations";
import { useState, useEffect } from "react";

const StartBtn = () => {
  const { state, setIsStart } = useStore();

  const [startGame] = useMutation(START_GAME, {
    variables: { gameId: state.roomcode, startGame: state.isStart },
  });

  useEffect(() => {
    //console.log("start front end:", start);
    startGame();
  }, [state.isStart]);

  const handleSetStart = () => {
    setIsStart(true);
  };

  return (
    <div className="flex justify-center transition ease-in-out hover:scale-105 hover:drop-shadow-lg w-fit mx-auto">
      <button
        onClick={handleSetStart}
        className="bg-cyan-950 rounded-xl shadow-md transition ease-in-out hover:scale-105 hover:drop-shadow-lg max-w-52 hover:animate-pulse"
      >
        <img src={startBtn} />
      </button>
    </div>
  );
};

export default StartBtn;
