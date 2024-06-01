import React, { useEffect, useState } from "react";
import { useStore } from "../../OptionsProvider";
import { useQuery } from "@apollo/client";
import { GET_AVATAR } from "../../../graphql/queries";

const PlayerOne = () => {
  const { state } = useStore();

  const { loading: avatarLoading, data: avatarData } = useQuery(GET_AVATAR);

  return (
    <div className="flex items-center justify-center">
      <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
        <img
          src={avatarLoading ? "" : avatarData?.getAvatar?.profile}
          alt="Player Avatar"
          className="w-14 h-14 rounded-full"
        />
      </div>
      <p className="text-gray-100 font-bold rounded-xl py-1 px-2">
        {state.user.username}
      </p>
    </div>
  );
};

export default PlayerOne;
