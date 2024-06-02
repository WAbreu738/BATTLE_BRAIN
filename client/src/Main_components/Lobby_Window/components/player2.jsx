import React, { useEffect, useState } from "react";
import { useStore } from "../../OptionsProvider";
import { useQuery } from "@apollo/client";
import { POLL_GAME } from "../../../graphql/queries";

const PlayerTwo = () => {
  const { state } = useStore();
  const [isConnected, setIsConnected] = useState(false);

  const { loading, error, data } = useQuery(POLL_GAME, {
    variables: { gameId: state.roomcode },
    pollInterval: 2000,
  });

  console.log(data);
  const playerOne = data?.pollGame?.playerOne?.player?._id;
  const playerTwo = data?.pollGame?.playerTwo?.player?._id;
  // console.log("P1", data.pollGame.playerOne.player._id);
  // console.log("P2", data.pollGame.playerTwo.player._id);
  useEffect(() => {
    if (!loading) {
      // console.log(playerTwo);
      // console.log(playerOne);
      if (playerOne !== playerTwo) {
        setIsConnected(true);
      }
    }
  }, [data]);

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="w-16 h-16 bg-cyan-950 rounded-full flex items-center justify-center">
          <img
            src={loading ? "" : data?.pollGame?.playerTwo?.player?.profile}
            alt="Player Avatar"
            className="w-14 h-14 rounded-full"
          />
        </div>
        <p className="text-lg font-bold ml-4">
          {loading ? "" : data?.pollGame?.playerTwo?.player?.username}
        </p>
      </div>
    </>
  );
};

export default PlayerTwo;
