import { HomeIcon } from "@heroicons/react/24/outline";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_GAME, USER_LEAVE_GAME } from "../graphql/mutations";
import { useState, useEffect } from "react";
import { useStore } from "./OptionsProvider";
import { POLL_GAME } from "../graphql/queries";

export default function HomeBtn() {
  const { state, setRoomcode } = useStore();
  const [isMP, setIsMP] = useState();
  const location = useLocation();
  const navigate = useNavigate();

  const [deleteGame] = useMutation(DELETE_GAME, {
    variables: { gameId: state.roomcode },
  });

  const [userLeaveGame] = useMutation(USER_LEAVE_GAME);

  const { loading, error, data, startPolling, stopPolling } = useQuery(
    POLL_GAME,
    {
      variables: { gameId: state.roomcode },
    }
  );

  useEffect(() => {
    if (!loading && data?.pollGame) {
      if (
        data.pollGame.playerOne.player === null &&
        state.user._id === data.pollGame.playerTwo.player._id
      ) {
        alert("Player 1 has Left the Lobby");
        setRoomcode("");
        deleteGame();
        navigate("/");
      }
      if (
        data.pollGame.playerTwo.player === null &&
        state.user._id === data.pollGame.playerOne.player._id
      ) {
        alert("Player 2 has Left the Lobby");
        setRoomcode("");
        deleteGame();
        navigate("/");
      }
    }
  }, [data?.pollGame?.playerOne?.player, data?.pollGame?.playerTwo?.player]);

  const handleHome = () => {
    if (!loading) {
      //check if player 2 has joined
      if (
        data?.pollGame?.playerOne?.player._id ===
        data?.pollGame?.playerTwo?.player._id
      ) {
        deleteGame();
        setRoomcode("");
        navigate("/");
      } else {
        if (state.user._id === data?.pollGame?.playerOne?.player._id) {
          console.log("user 1 leaving");
          userLeaveGame({
            variables: { gameId: state.roomcode, user: "playerOne" },
          });
          navigate("/");
        } else {
          console.log("user 2 leaving");
          userLeaveGame({
            variables: { gameId: state.roomcode, user: "playerTwo" },
          });
          navigate("/");
        }
      }
    }
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
      stopPolling();
      setIsMP(false);
    } else {
      startPolling(1000);
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
        <button onClick={handleHome}>
          <div className="border border-zinc-900 bg-gray-100 rounded-full transition ease-in-out hover:scale-105 hover:drop-shadow-lg w-fit h-fit">
            <HomeIcon className=" h-6 w-6 m-2 text-zinc-900" />
          </div>
        </button>
      )}
    </>
  );
}
