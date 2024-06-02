import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useStore } from "../../OptionsProvider";
import singleplayer from "../../../assets/images/SINGLEPLAYER.png";
import battlemode from "../../../assets/images/BATTLEMODE.png";

const GameBtn = () => {
  const { state } = useStore();

  return (
    <div className="flex justify-around space-x-5">
      <NavLink
        to={state.user ? "/singleplayer" : "/"}
        className=" bg-cyan-950 rounded-xl shadow-md transition ease-in-out hover:scale-105 hover:drop-shadow-lg max-w-56 hover:animate-pulse"
      >
        <img src={singleplayer} alt="single player button" />
      </NavLink>
      <NavLink
        to={state.user ? "/join-create" : "/"}
        className="bg-cyan-950 rounded-xl shadow-md transition ease-in-out hover:scale-105 hover:drop-shadow-lg max-w-52 hover:animate-pulse"
      >
        <img src={battlemode} alt="single player button" />
      </NavLink>
    </div>
  );
};

export default GameBtn;
