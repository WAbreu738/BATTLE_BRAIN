
export const calculatePoints = (timeLeft, multiplier) => {
  let points = 3000;
  // if (timeLeft >= 14) points = 500;
  // else if (timeLeft >= 13) points = 470;
  // else if (timeLeft >= 12) points = 440;
  // else if (timeLeft >= 11) points = 410;
  // else if (timeLeft >= 10) points = 380;
  // else if (timeLeft >= 9) points = 350;
  // else if (timeLeft >= 8) points = 320;
  // else if (timeLeft >= 7) points = 290;
  // else if (timeLeft >= 6) points = 260;
  // else if (timeLeft >= 5) points = 230;
  // else if (timeLeft >= 4) points = 200;
  // else if (timeLeft >= 3) points = 170;
  // else if (timeLeft >= 2) points = 140;
  // else if (timeLeft >= 1) points = 100;
  // else points = 50;0

  return points * multiplier;
};

export const generateRandomMultiplier = () => {
  const multipliers = [1, 1.5, 2, 2.5];
  const randomIndex = Math.floor(Math.random() * multipliers.length);
  return multipliers[randomIndex];
};
