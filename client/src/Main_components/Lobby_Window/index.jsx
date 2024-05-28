import React, { useEffect, useState } from "react";
import RoomCode from "./components/roomcode";
import StartBtn from "./components/start_btn";
import PlayerOne from "./components/player1";
import PlayerTwo from "./components/player2";

const LobbyWindow = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-4">
      <div className="mb-8">
        <h1 className="text-5xl font-bold text-purple-500">BattleBrain</h1>
      </div>

      <div className=" bg-cyan-600 bg-opacity-90 shadow-lg rounded-xl p-10 max-w-lg w-full">
        <RoomCode />

        <div className="mb-12 text-center">
          <div className="flex justify-center space-x-7">
            <PlayerOne />
            <PlayerTwo />
          </div>
        </div>

        <StartBtn />
      </div>
    </div>
  );
};

export default LobbyWindow;
