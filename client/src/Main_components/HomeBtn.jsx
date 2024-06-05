import { HomeIcon } from "@heroicons/react/24/outline";
import { NavLink, useLocation } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { START_GAME } from "../graphql/mutations";
import { useState, useEffect } from "react";
import { useStore } from "./OptionsProvider";

export default function HomeBtn() {
  const { state, setIsStart } = useStore();
  const [isMP, setIsMP] = useState();
  const location = useLocation();

  const [startGame] = useMutation(START_GAME, {
    variables: { gameId: state.roomcode, startGame: state.isStart },
  });

  useEffect(() => {
    startGame();
  }, [state.isStart]);

  const handleSetStart = () => {
    setIsStart(false);
  };

  //checking path to see if in multiplayer or not
  useEffect(() => {
    const path = location.pathname;
    if (
      path === "/singleplayer" ||
      path === "/spplay" ||
      path === "/leaderboard" ||
      path === "/settings" ||
      path === "/join-create"
    ) {
      setIsMP(false);
    } else {
      setIsMP(true);
    }
  }, [state.page]);

  return (
    <>
      {!isMP ? (
        <NavLink to="/">
          <div className="border border-zinc-900 bg-gray-100 rounded-full transition ease-in-out hover:scale-105 hover:drop-shadow-lg w-fit h-fit">
            <HomeIcon className=" h-6 w-6 m-2 text-zinc-900" />
          </div>
        </NavLink>
      ) : (
        <button onClick={handleSetStart}>
          <div className="border border-zinc-900 bg-gray-100 rounded-full transition ease-in-out hover:scale-105 hover:drop-shadow-lg w-fit h-fit">
            <HomeIcon className=" h-6 w-6 m-2 text-zinc-900" />
          </div>
        </button>
      )}
    </>
  );
}
