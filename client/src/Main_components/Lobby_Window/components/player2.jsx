import React, { useEffect, useState } from "react";
import { useStore } from "../../OptionsProvider";
import { useQuery } from "@apollo/client";
import { POLL_GAME } from "../../../graphql/queries";

const PlayerTwo = () => {
  const { state, setIsConnected } = useStore();

  const { loading, error, data } = useQuery(POLL_GAME, {
    variables: { gameId: state.roomcode },
    pollInterval: 2000,
  });

  useEffect(() => {
    if (!loading) {
      if (
        data.pollGame.playerOne.player._id !==
        data.pollGame.playerTwo.player._id
      ) {
        setIsConnected(true);
      } else {
        setIsConnected(false);
      }
    }
  }, [data]);

  return (
    <>
      {state.isConnected && (
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
      )}
    </>
  );
};

export default PlayerTwo;
