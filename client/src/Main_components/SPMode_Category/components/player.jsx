const PlayerSec = () => {
  return (
    <div className="bg-purple-900 bg-opacity-80 shadow-lg rounded-lg p-10 max-w-lg w-full">
      <h1 className="flex justify-center text-2xl shadow-lg font-bold mb-4">
        Player:
      </h1>
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
          <img
            src="https://randomuser.me/api/portraits/lego/2.jpg"
            alt="Player Avatar"
            className="w-10 h-10 rounded-full"
          />
        </div>
      </div>

      {/* Options for Game Modes if we want to implement, otherwise delete this */}
      <h2 className="text-2xl font-bold text-white mb-4 text-center">
        Game Mode
      </h2>
      <div className="flex justify-around">
        <button className="bg-purple-500 text-white py-4 px-8 rounded-lg text-xl shadow-lg hover:bg-purple-700">
          High Score
        </button>
        <button className="bg-purple-500 text-white py-4 px-8 rounded-lg text-xl shadow-lg hover:bg-purple-700">
          Time Trial
        </button>
      </div>
    </div>
  );
};

export default PlayerSec;
