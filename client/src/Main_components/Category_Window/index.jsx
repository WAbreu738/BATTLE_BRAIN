import { useEffect, useState } from "react";

import PlayersSec from "./components/players";
import CategoryBtns from "./components/Buttons";
import Difficulty from "./components/Difficulty";
// import Region from "./components/Region";

const CategoryWindow = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-4">
      <div className=" static bg-purple-900 bg-opacity-80 shadow-lg rounded-lg p-10 max-w-lg w-full mb-8">
        <h2 className="text-2xl font-bold text-white mb-4 text-center">
          Categories
        </h2>
        <div className="grid grid-cols-3 gap-4">
          <CategoryBtns />
        </div>
        <div className="flex justify-between">
          <Difficulty />
          {/* <Region /> */}
        </div>
      </div>

      {/* Players Joined Section */}
      <PlayersSec />
    </div>
  );
};

export default CategoryWindow;
