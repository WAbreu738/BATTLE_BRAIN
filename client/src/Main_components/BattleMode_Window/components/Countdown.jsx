import React, { useState, useEffect } from "react";

const Countdown = ({ initialCount, onCountdownEnd }) => {
  const [countdown, setCountdown] = useState(initialCount);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      onCountdownEnd();
    }
  }, [countdown, onCountdownEnd]);

  return (
    <div className="text-6xl text-white">
      <h1>Game starting in {countdown}...</h1>
    </div>
  );
};

export default Countdown;
