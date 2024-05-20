import React, { useEffect, useState } from "react";

const Timer = () => {
  const [seconds, setSeconds] = useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="text-4xl font-bold text-center p-5 border rounded-full ">
        {seconds >= 0 ? seconds : "Time's up!"}
      </div>
    </>
  );
};

export default Timer;
