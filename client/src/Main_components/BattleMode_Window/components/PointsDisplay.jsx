import { useEffect, useState } from "react";

const PointsDifference = ({ pointsEarned, onComplete }) => {
  const [displayText, setDisplayText] = useState("");
  const [difference, setDifference] = useState(0);

  useEffect(() => {
    if (pointsEarned > pointsEarned) {
      //if player 1 points greater than player 2
      setDisplayText(`${pointsEarned} - ${pointsEarned}`);
      const diff = Math.abs(pointsEarned - pointsEarned);
      setDifference(diff);

      const timer = setTimeout(() => {
        setDisplayText(difference.toString());
        onComplete();
      }, 3000);
    } else {
      //if player 2 is greater than player 1
      setDisplayText(`${pointsEarned} - ${pointsEarned}`);
      const diff = Math.abs(pointsEarned - pointsEarned);
      setDifference(diff);

      const timer = setTimeout(() => {
        setDisplayText(difference.toString());
        onComplete();
      }, 3000);
    }
  }, [pointsEarned, difference]);

  return (
    <div>
      <div>{difference}</div>
    </div>
  );
};

export default PointsDifference;
