import React, { useState, useEffect } from "react";

const RoundScreen = ({ round, multiplier }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [roundTimer, setRoundTimer] = useState(3);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setRoundTimer(5);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isVisible && roundTimer > 0) {
      const timer = setTimeout(() => {
        setRoundTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, roundTimer]);

  // className={`absolute z-20 top-1/4 translate-y-1 bg-rose-700 border border-rose-900 p-32 rounded-xl flex flex-col items-center justify-center text-white text-6xl font-bold shadow-2xl ${
  //   isVisible ? "" : "hidden"
  // }`}

  return (
    <div
      className={`absolute z-20 h-64 translate-y-1 bg-cyan-800 border p-20 rounded-xl flex flex-col items-center justify-center text-white text-6xl font-bold shadow-2xl ${
        isVisible ? "" : "hidden"
      }`}
    >
      <div className="mb-4">Round {round}</div>
      <div>Multiplier: {multiplier}x</div>
      {isVisible && <div>Round starts in: {roundTimer}</div>}
    </div>
  );
};

// className={`absolute z-20 top-1/4 translate-y-1 bg-rose-700 border border-rose-900 p-32 rounded-xl flex flex-col items-center justify-center text-white text-6xl font-bold shadow-2xl ${
//   isVisible ? "" : "hidden"
// }`}

export default RoundScreen;
