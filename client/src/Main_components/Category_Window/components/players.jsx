const PlayersSec = () => {
  return (
    <div className="bg-purple-900 bg-opacity-80 shadow-lg rounded-lg p-10 max-w-lg w-full">
      <h2 className="text-2xl font-bold text-white mb-4 text-center">
        Players Joined
      </h2>
      <div className="flex justify-center">
        <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mr-4">
          <img
            src="https://randomuser.me/api/portraits/lego/1.jpg"
            alt="Player Avatar"
            className="w-10 h-10 rounded-full"
          />
        </div>
        <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mr-4">
          <img
            src="https://randomuser.me/api/portraits/lego/2.jpg"
            alt="Player Avatar"
            className="w-10 h-10 rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default PlayersSec;
