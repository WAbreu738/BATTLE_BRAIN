import React, { useEffect, useState } from "react";
import PlayerSec from "./components/player";
import SPCategoryBtns from "./components/Buttons";
import Difficulty from "../Category_Window/components/Difficulty";

const SPCategoryWindow = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-4">
      <div className="bg-cyan-600 border border-cyan-800 bg-opacity-90 shadow-xl rounded-xl p-10 max-w-lg w-full mb-8">
        <h2 className="text-4xl font-bold text-white mb-4 text-center">
          Categories
        </h2>
        <div className="grid grid-cols-3 gap-4">
          <SPCategoryBtns />
        </div>
        <div className="flex justify-between">
          <Difficulty />
          {/* <Region /> */}
        </div>
      </div>

      {/* Players Joined Section */}
      <PlayerSec />
    </div>
  );
};

export default SPCategoryWindow;
