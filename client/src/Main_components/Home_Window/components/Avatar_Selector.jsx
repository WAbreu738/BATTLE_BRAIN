import React, { useEffect, useState } from "react";

const AvatarSelector = () => {
  const [startIdx, setStartIdx] = useState(0);

  // Function to handle clicking on the left button
  const handleLeftClick = () => {
    setStartIdx(Math.max(0, startIdx - 1));
  };

  // Function to handle clicking on the right button
  const handleRightClick = () => {
    setStartIdx(startIdx + 1);
  };

  return (
    <div className="mb-8 relative flex items-center justify-center">
      <button
        className="text-white absolute left-0 top-1/2 transform -translate-y-1/2"
        disabled={startIdx === 0}
        onClick={handleLeftClick}
      >
        &lt; {/* Left arrow */}
      </button>
      <div className="flex overflow-x-hidden space-x-4">
        {[startIdx, startIdx + 1, startIdx + 2].map((avatar, index) => (
          <img
            key={avatar}
            src={`https://randomuser.me/api/portraits/lego/${avatar}.jpg`}
            alt={`Avatar ${avatar}`}
            className={`w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-purple-300 transform scale-${
              index === 1 ? "110" : "100"
            }`}
          />
        ))}
      </div>
      <button
        className="text-white absolute right-0 top-1/2 transform -translate-y-1/2"
        disabled={startIdx >= 3} // Adjust the condition based on total avatars
        onClick={handleRightClick}
      >
        &gt; {/* Right arrow */}
      </button>
    </div>
  );
};

export default AvatarSelector;
