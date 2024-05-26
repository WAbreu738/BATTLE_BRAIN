import React, { useState, useEffect } from "react";

const RoundScreen = ({ round, multiplier }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [roundTimer, setRoundTimer] = useState(3);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setRoundTimer(3);
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

  return (
    <div className={`fixed inset-0 bg-black flex flex-col items-center justify-center text-white text-6xl font-bold ${isVisible ? "" : "hidden"}`}>
      <div className="mb-4">Round {round}</div>
      <div>Multiplier: {multiplier}x</div>
      {isVisible && <div>Round starts in: {roundTimer}</div>}
    </div>
  );
};

export default RoundScreen;



