import PlayersSec from "./components/players";
import CategoryBtns from "./components/Buttons";
import Difficulty from "./components/Difficulty";
import ChatWindow from "./components/ChatWindow";
// import Region from "./components/Region";
import Category from "../../assets/images/categories-blue.png";

import HomeBtn from "../HomeBtn";
import BackBtn from "../BackBtn";
import BattleBtn from "./components/BattleBtn";
import { useQuery, useMutation } from "@apollo/client";
import { POLL_GAME } from "../../graphql/queries";
import { useState, useEffect } from "react";
import { useStore } from "../OptionsProvider";
import { GAME_SETTINGS } from "../../graphql/mutations";
import { useNavigate } from "react-router-dom";

const CategoryWindow = () => {
  const { state, setDifficulty, setCategory } = useStore();
  const [isPlayerTwo, setIsPlayerTwo] = useState(false);
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(POLL_GAME, {
    variables: { gameId: state.roomcode },
    pollInterval: 2000,
  });

  const [gameSettings] = useMutation(GAME_SETTINGS, {
    variables: {
      gameId: state.roomcode,
      category: state.category,
      difficulty: state.difficulty,
    },
  });

  useEffect(() => {
    if (!loading) {
      if (data.pollGame.playerTwo.player._id === state.user._id) {
        setIsPlayerTwo(true);
        setDifficulty(data.pollGame.difficulty);
        setCategory(data.pollGame.category);
      }
      if (data.pollGame.startBattle) {
        navigate(`/battle/${state.roomcode}`);
      }
    }
  }, [data]);

  useEffect(() => {
    gameSettings();
  }, [state.category, state.difficulty]);

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
          <CategoryBtns isPlayerTwo={isPlayerTwo} />
        </div>
        <div className="flex justify-between items-center mt-4">
          <Difficulty isPlayerTwo={isPlayerTwo} />

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
          <BattleBtn isPlayerTwo={isPlayerTwo} />
        </div>
      </div>
      <ChatWindow />
      {/* Players Joined Section */}
    </div>
  );
};

export default CategoryWindow;
