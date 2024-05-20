import React, { useEffect, useState } from "react";

const GameBtn = () => {
  return (
    <div className="flex justify-around mt-8">
      <button className="bg-purple-500 text-white py-4 px-8 rounded-lg text-xl shadow-lg hover:bg-purple-700">
        Single Player
      </button>
      <button className="bg-purple-500 text-white py-4 px-8 rounded-lg text-xl shadow-lg hover:bg-purple-700">
        Battle Mode
      </button>
    </div>
  );
};

export default GameBtn;
