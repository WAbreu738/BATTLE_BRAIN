import React from "react";

const Multiplier = ({ multiplier }) => {
  return (
    <div>
      <h2 className="md:text-3xl text-xl font-bold text-center">
        {multiplier}X
      </h2>
    </div>
  );
};

export default Multiplier;
