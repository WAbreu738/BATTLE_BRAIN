import React, { useEffect, useState } from "react";
import RoomCode from "./components/roomcode";
import StartBtn from "./components/start_btn";
import PlayerOne from "./components/player1";
import PlayerTwo from "./components/player2";
import HomeBtn from "../HomeBtn";
import BackBtn from "../BackBtn";

const LobbyWindow = () => {
  return (
    <div className=" flex flex-col items-center justify-center h-screen p-4">
      <div className="mb-8">
        <h1 className="text-5xl font-bold text-purple-500">BattleBrain</h1>
      </div>

      <div className=" relative bg-cyan-600 bg-opacity-90 shadow-lg rounded-xl p-8 max-w-lg w-full">
        <RoomCode />

        <div className="mb-12 text-center">
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
