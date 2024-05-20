const RoomCode = () => {
  return (
    <div className="mb-8 flex items-center justify-center">
      <div
        // onClick={handleRoomCodeClick}
        className={`cursor-pointer bg-purple-800 text-white py-4 px-8 rounded-lg text-lg shadow-lg hover:bg-purple-700 mb-4`}
      >
        <p className="text-2xl font-bold">
          {/* {roomCodeVisible ? roomCode : "ROOM CODE"} */}
        </p>
      </div>
      <button className="bg-purple-700 text-white ml-4 py-4 px-8 rounded-lg text-lg shadow-lg hover:bg-purple-900 h-16">
        Invite
      </button>
    </div>
  );
};

export default RoomCode;
