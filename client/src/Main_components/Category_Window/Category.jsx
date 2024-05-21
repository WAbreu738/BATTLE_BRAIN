import React, { useEffect, useState } from "react";

import Artbtn from "./components/Artbtn";
import Filmbtn from "./components/Filmbtn";
import Foodbtn from "./components/Foodbtn";
import Generalbtn from "./components/Generalbtn";
import Geographybtn from "./components/Geographybtn";
import Historybtn from "./components/Historybtn";
import Musicbtn from "./components/MusicBtn";
import Sciencebtn from "./components/Sciencebtn";
import Sportbtn from "./components/Sportbtn";
import PlayersSec from "./components/players";

const CategoryWindow = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-4">
      <div className="bg-purple-900 bg-opacity-80 shadow-lg rounded-lg p-10 max-w-lg w-full mb-8">
        <h2 className="text-2xl font-bold text-white mb-4 text-center">
          Categories
        </h2>
        <div className="grid grid-cols-3 gap-4">
          <Artbtn />
          <Filmbtn />
          <Foodbtn />
          <Generalbtn />
          <Geographybtn />
          <Historybtn />
          <Musicbtn />
          <Sciencebtn />
          <Sportbtn />
        </div>
      </div>

      {/* Players Joined Section */}
      <PlayersSec />
    </div>
  );
};

export default CategoryWindow;
