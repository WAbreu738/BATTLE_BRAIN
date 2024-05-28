const RoomCode = () => {
  return (
    <div className="mb-8 flex align-middle justify-center">
      <div
        // onClick={handleRoomCodeClick}
        className={`cursor-pointer bg-gray-100 text-zinc-900 py-4 px-8 rounded-lg text-lg shadow-lg hover:bg-gray-300`}
      >
        <p className="text-2xl font-bold">
          {/* {roomCodeVisible ? roomCode : "ROOM CODE"} */}
        </p>
      </div>
      <button className="bg-rose-700 border border-rose-700 text-white ml-4 py-1 px-3 rounded-lg text-lg shadow-lg hover:bg-rose-600 transition ease-in-out hover:scale-105 hover:drop-shadow-lg">
        Invite
      </button>
    </div>
  );
};

export default RoomCode;
