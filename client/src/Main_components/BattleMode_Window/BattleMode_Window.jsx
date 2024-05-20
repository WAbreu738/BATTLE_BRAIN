import React, { useEffect, useState } from "react";
import Timer from "./components/Timer";
import Round from "./components/Round";
import Question from "./components/Question_window";
import AnswerButtons from "./components/Buttons";
import Multiplier from "./components/Multiplier";
import PlayerOne from "./components/Player1";
import PlayerTwo from "./components/Player2";

const BattleMode = () => {
  return (
    <main className="flex flex-col items-center justify-center h-screen p-4 bg-black">
      <div className="bg-purple-900 bg-opacity-80 shadow-lg rounded-lg p-10 max-w-4xl w-full">
        <div className="flex justify-center justify-between">
          <Round />

          <Timer />

          <Multiplier />
        </div>

        <div>
          <Question />
        </div>

        <div>
          <PlayerOne />

          <AnswerButtons />

          <PlayerTwo />
        </div>
      </div>
    </main>
  );
};

export default BattleMode;
