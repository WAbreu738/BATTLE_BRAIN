import React, { useEffect, useState } from "react";

const PlayerOne = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
        <img
          src="https://randomuser.me/api/portraits/lego/1.jpg"
          alt="Player Avatar"
          className="w-10 h-10 rounded-full"
        />
      </div>
      <p className="text-lg font-bold ml-4">Player 1</p>
    </div>
  );
};

export default PlayerOne;
