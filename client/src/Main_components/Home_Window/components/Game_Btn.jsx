import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const GameBtn = () => {
  return (
    <div className="flex justify-around mt-8">
      <NavLink
        to="/singleplayer"
        className="bg-purple-500 text-white py-4 px-8 rounded-lg text-xl shadow-lg hover:bg-purple-700"
      >
        Single Player
      </NavLink>
      <NavLink
        to="/lobby"
        className="bg-purple-500 text-white py-4 px-8 rounded-lg text-xl shadow-lg hover:bg-purple-700"
      >
        Battle Mode
      </NavLink>
    </div>
  );
};

export default GameBtn;
