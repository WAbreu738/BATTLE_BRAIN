import React, { useEffect, useState } from "react";
import { useStore } from "../../OptionsProvider";
import { useQuery } from "@apollo/client";
import { GET_AVATAR } from "../../../graphql/queries";
import { POLL_GAME } from "../../../graphql/queries";

const PlayerOne = () => {
  const { state } = useStore();

  const { loading, error, data } = useQuery(POLL_GAME, {
    variables: { gameId: state.roomcode },
  });

  return (
    <div className="flex items-center justify-center">
      <div className="w-16 h-16 bg-cyan-950 rounded-full flex items-center justify-center">
        <img
          src={loading ? "" : data?.pollGame?.playerOne?.player?.profile}
          alt="Player Avatar"
          className="w-14 h-14 rounded-full"
        />
      </div>
      <p className="text-lg font-bold ml-4">
        {loading ? "" : data?.pollGame?.playerOne?.player?.username}
      </p>
    </div>
  );
};

export default PlayerOne;
