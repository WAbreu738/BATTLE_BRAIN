const PlayersSec = () => {
  return (
    <div className="absolute flex left-1/2 -translate-x-1/2 space-x-80 top-6">
      <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center ">
        <img
          src="https://randomuser.me/api/portraits/lego/1.jpg"
          alt="Player Avatar"
          className="w-14 h-14 rounded-full"
        />
      </div>
      <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center ">
        <img
          src="https://randomuser.me/api/portraits/lego/2.jpg"
          alt="Player Avatar"
          className="w-14 h-14 rounded-full"
        />
      </div>
    </div>
  );
};

export default PlayersSec;
