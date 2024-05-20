import React, { useEffect, useState } from "react";

const NameInput = () => {
  return (
    <div className="mb-8 text-center">
      <h2 className="text-xl font-bold text-white mb-2">Name:</h2>
      <input
        type="text"
        placeholder="Your Name"
        className="w-3/4 px-4 py-2 border border-purple-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 mx-auto"
      />
    </div>
  );
};

export default NameInput;
