import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const GameBtn = () => {
  return (
    <div className="flex justify-around mt-8">
      <NavLink
        to="/singleplayer"
        className="bg-rose-700 border border-rose-700 text-white py-4 px-5 rounded-xl text-xl shadow-xl hover:bg-rose-600 transition ease-in-out hover:scale-105 hover:drop-shadow-lg"
      >
        <span>←</span> Single Player
      </NavLink>
      <NavLink
        to="/lobby"
        className="bg-rose-700 border border-rose-700 text-white py-4 px-5 rounded-xl text-xl shadow-xl hover:bg-rose-600 transition ease-in-out hover:scale-105 hover:drop-shadow-lg"
      >
        Battle Mode <span>→</span>
      </NavLink>
    </div>
  );
};

export default GameBtn;
