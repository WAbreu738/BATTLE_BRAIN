import React, { useEffect, useState } from "react";

const PlayerTwo = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
        <img
          src="https://randomuser.me/api/portraits/lego/2.jpg"
          alt="Player Avatar"
          className="w-14 h-14 rounded-full"
        />
      </div>
      <p className="text-lg font-bold ml-4">Player 2</p>
    </div>
  );
};

export default PlayerTwo;
