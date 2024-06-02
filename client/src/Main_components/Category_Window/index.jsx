import PlayersSec from "./components/players";
import CategoryBtns from "./components/Buttons";
import Difficulty from "./components/Difficulty";
import ChatWindow from "./components/ChatWindow";
// import Region from "./components/Region";
import Category from "../../assets/images/categories-blue.png";

import HomeBtn from "../HomeBtn";
import BackBtn from "../BackBtn";
import BattleBtn from "./components/BattleBtn";

// import Chat from "../Chat";
// import ChatWindow from "../Chat/chatWindow";

const CategoryWindow = () => {
  return (
    <div className=" flex items-center justify-center h-screen p-4">
      <div className="relative bg-cyan-600 border border-cyan-800 bg-opacity-90 shadow-xl rounded-xl p-8 max-w-lg w-full">
        <PlayersSec />
        {/* <h2 className="text-4xl font-bold text-white mb-6 text-center">
          Categories
        </h2> */}
        <img
          className=" w-8/12 mx-auto -m-4 mb-5 bg-cyan-950 p-2 rounded-xl shadow-xl "
          src={Category}
        />
        <div className="grid grid-cols-3 gap-4">
          <CategoryBtns />
        </div>
        <div className="flex justify-between items-center mt-4">
          <Difficulty />

          {/* <Region /> */}
        </div>
        <div className="absolute -top-5 -right-5">
          <HomeBtn />
        </div>
        <div className="absolute -top-5 -left-5">
          <BackBtn />
        </div>
        {/* <Chat /> */}
        <div className="absolute w-2/5 left-1/2 -translate-x-1/2 bottom-3">
          <BattleBtn />
        </div>
      </div>
      <ChatWindow />
      {/* Players Joined Section */}
    </div>
  );
};

export default CategoryWindow;
