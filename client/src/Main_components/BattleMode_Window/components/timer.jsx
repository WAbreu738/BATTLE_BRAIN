import { useEffect } from "react";

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
    <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-20 text-4xl font-bold text-center p-3 w-3/12 border-2 drop-shadow-xl border-zinc-900 bg-gray-50 text-zinc-900 rounded-full">
      {timeLeft > 0 ? timeLeft : "Time's up!"}
    </div>
  );
};

export default Timer;
