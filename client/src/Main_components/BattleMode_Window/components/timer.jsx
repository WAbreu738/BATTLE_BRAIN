import React, { useEffect } from "react";

const Timer = ({ timeLeft, setTimeLeft, isAnswered }) => {
  useEffect(() => {
    if (!isAnswered && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isAnswered, timeLeft, setTimeLeft]);

  return (
    <div className="text-4xl font-bold text-center p-5 border rounded-full">
      {timeLeft >= 0 ? timeLeft : "Time's up!"}
    </div>
  );
};

export default Timer;