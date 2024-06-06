import React, { useEffect, useState } from "react";
import PlayerSec from "./components/player";
import SPCategoryBtns from "./components/Buttons";
import Difficulty from "../Category_Window/components/Difficulty";
import HomeBtn from "../HomeBtn";
import BackBtn from "../BackBtn";
import PlayBtn from "./components/PlayBtn";
import categories from "../../assets/images/categories-blue.png";

const SPCategoryWindow = () => {
  return (
    <div className="flex md:flex-row flex-col md:justify-center items-center h-screen lg:scale-100 scale-90">
      <div className="flex flex-col items-center justify-center p-4">
        <div className=" relative bg-cyan-600 border border-cyan-800 bg-opacity-90 shadow-xl rounded-xl md:p-8 p-5 max-w-lg w-full">
          <img src={categories} className="bg-cyan-950 rounded-xl mb-3" />
          <div className="grid grid-cols-3 gap-4">
            <SPCategoryBtns />
          </div>
          <div className="flex justify-between items-center mt-4">
            <Difficulty />
            {/* <Region /> */}
          </div>
          <div className=" absolute -top-5 -right-5">
            <HomeBtn />
          </div>
          <div className=" absolute -top-5 -left-5">
            <BackBtn />
          </div>
          <div className="absolute w-4/12 left-1/2 -translate-x-1/2 md:bottom-2 bottom-2.5">
            <PlayBtn />
          </div>
        </div>
        {/* Players Joined Section */}
      </div>
      <div className="flex flex-col justify-center">
        <PlayerSec />
      </div>
    </div>
  );
};

export default SPCategoryWindow;
