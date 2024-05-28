import { useEffect } from "react";

const Timer = ({ timeLeft, setTimeLeft, isAnswered }) => {
  useEffect(() => {
    if (!isAnswered && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 0.01);
      }, 10);

      return () => clearInterval(timer);
    }
  }, [isAnswered, timeLeft, setTimeLeft]);

  const formatTime = (time) => {
    // const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const milliseconds = Math.floor((time - Math.floor(time)) * 100); // Convert milliseconds to two decimal places

    return `${seconds.toString().padStart(2, "0")}.${milliseconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="absolute z-10 top-9 left-1/2 -translate-x-1/2 text-4xl font-bold text-center px-6 py-3 border-2 shadow-xl border-zinc-900 bg-gray-50 text-zinc-900 rounded-full w-56">
      {timeLeft >= 0 ? formatTime(timeLeft) : "Time's up!"}
    </div>
  );
};

export default Timer;
