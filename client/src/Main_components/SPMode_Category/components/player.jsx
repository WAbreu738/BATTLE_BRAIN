import { useStore } from "../../OptionsProvider";
import { gql, useQuery } from "@apollo/client";
import { GET_AVATAR, GET_STATS } from "../../../graphql/queries";
import "./leaderboard.css";
import Leaderboard from "./Leaderboard";

const PlayerSec = () => {
  const { state } = useStore();

  const { loading: statsLoading, data: statsData } = useQuery(GET_STATS, {
    pollInterval: 5000,
  });
  const { loading: avatarLoading, data: avatarData } = useQuery(GET_AVATAR);

  // console.log("avatar data:", avatarData);
  // console.log("stats data:", statsData);

  return (
    <div className="bg-cyan-600 border border-cyan-800 bg-opacity-90 shadow-xl rounded-xl p-3 max-w-lg w-fit">
      <div className="flex items-center space-x-7">
        <div className="flex items-center justify-center space-x-2">
          <div className="flex justify-center">
            <div className="w-12 h-12 bg-cyan-950 rounded-full flex items-center justify-center">
              <img
                src={avatarLoading ? "" : avatarData?.getAvatar?.profile}
                alt="Player Avatar"
                className="w-10 h-10 rounded-full"
              />
            </div>
          </div>

          <h1 className="flex justify-center text-xl font-bold">
            {state.user.username}
          </h1>
        </div>
        <p className="text-xl font-bold">
          High Score: {!statsLoading ? statsData?.getStats?.highScore : "N/A"}
        </p>
      </div>
      <ul className="mt-3 p-1 bg-cyan-950 rounded text-sm overflow-y-auto leaderboard-output ">
        <Leaderboard />
      </ul>
    </div>
  );
};

export default PlayerSec;
