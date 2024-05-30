import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import singlePlayer from "../../../assets/images/single-player-red.png";
import battleMode from "../../../assets/images/Battle-Mode-red.png";
import { useStore } from "../../OptionsProvider";

const GameBtn = () => {
  const { state } = useStore();

  return (
    <div className="flex justify-around space-x-5">
      <NavLink
        to={state.user ? "/singleplayer" : "/"}
        className=" bg-cyan-800 rounded-xl shadow-md transition ease-in-out hover:scale-105 hover:drop-shadow-lg max-w-56"
      >
        <img src={singlePlayer} alt="single player button" />
      </NavLink>
      <NavLink
        to={state.user ? "/lobby" : "/"}
        className="bg-cyan-800 rounded-xl shadow-md transition ease-in-out hover:scale-105 hover:drop-shadow-lg max-w-52"
      >
        <img src={battleMode} alt="single player button" />
      </NavLink>
    </div>
  );
};

export default GameBtn;
