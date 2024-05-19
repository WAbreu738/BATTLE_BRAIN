import React, { useEffect, useState } from "react";
import Logo from "../Logo/Logo";
import Timer from "./components/timer";
import Round from "./components/round";
import Question from "./components/question_window";
import AnswerButtons from "./components/Buttons";
import Multiplier from "./components/Multiplier";
import PlayerOne from "./components/player1";
import PlayerTwo from "./components/player2";

const BattleMode = () => {
  return (
    <main>
      <Timer />

      <Logo />
    </main>
  );
};

export default BattleMode;
