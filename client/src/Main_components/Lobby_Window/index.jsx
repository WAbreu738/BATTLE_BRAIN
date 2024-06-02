import React, { useEffect, useState } from "react";
import StartBtn from "./components/start_btn";
import PlayerOne from "./components/player1";
import PlayerTwo from "./components/player2";
import HomeBtn from "../HomeBtn";
import BackBtn from "../BackBtn";
import lobby from "../../assets/images/LOBBY.png";
import { useStore } from "../OptionsProvider";

const LobbyWindow = () => {
  const { state } = useStore();

  const copyRoomCode = () => {
    console.log("Copied! ", state.roomcode);
    navigator.clipboard.writeText(state.roomcode);
  };

  return (
    <div className=" flex flex-col items-center justify-center h-screen p-4">
      <div className="mb-3">
        <img className="h-28" src={lobby} alt="Lobby" />
      </div>

      <div className="flex flex-col items-center relative bg-cyan-600 bg-opacity-90 shadow-lg rounded-xl p-8 max-w-lg w-full">
        <button
          className="bg-cyan-950 hover:bg-cyan-800 shadow-lg rounded-xl p-2 mb-5 font-bold"
          onClick={copyRoomCode}
        >
          Copy Room Code: {state.roomcode}
        </button>

        <div className="mb-8 text-center">
          <div className="flex justify-center space-x-7">
            <PlayerOne />
            <PlayerTwo />
          </div>
        </div>

        <StartBtn />
        <div className="absolute -top-5 -right-5">
          <HomeBtn />
        </div>
        <div className="absolute -top-5 -left-5">
          <BackBtn />
        </div>
      </div>
    </div>
  );
};

export default LobbyWindow;
