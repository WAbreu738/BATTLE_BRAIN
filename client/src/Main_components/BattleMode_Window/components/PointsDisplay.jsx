import React, { useEffect, useState } from "react";
import "./animation.css";

const PointsDisplay = ({ pointsEarned, onComplete }) => {
  const [displayText, setDisplayText] = useState("");
  const [difference, setDifference] = useState(0);

  useEffect(() => {
    if (pointsEarned) {
      setDisplayText(`${pointsEarned} - ${pointsEarned}`);
      const diff = Math.abs(pointsEarned - pointsEarned);
      setDifference(diff);

      const timer = setTimeout(() => {
        setDisplayText(difference.toString());
        onComplete();
      }, 3000); // Adjust based on your animation timing

      return () => clearTimeout(timer);
    }
  }, [pointsEarned, difference, onComplete]);

  return (
    <div className="points-display">
      <div>{displayText}</div>
    </div>
  );
};

export default PointsDisplay;
