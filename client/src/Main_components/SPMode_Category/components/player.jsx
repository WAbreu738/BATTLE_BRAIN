import { useStore } from "../../OptionsProvider";
import { gql, useQuery } from "@apollo/client";
import { GET_AVATAR, GET_STATS } from "../../../graphql/queries";

const PlayerSec = () => {
  const { state } = useStore();

  const { loading: statsLoading, data: statsData } = useQuery(GET_STATS);
  const { loading: avatarLoading, data: avatarData } = useQuery(GET_AVATAR);

  console.log("avatar data:", avatarData);
  console.log("stats data:", statsData);
  // //console.log(data.getAvatar);
  // let src;
  // function setSrc() {
  //   if (typeof data === "undefined") {
  //     src = `https://randomuser.me/api/portraits/lego/0.jpg`;
  //     return;
  //   }
  //   src = data.getAvatar.profile;
  // }

  return (
    <div className="bg-cyan-600 border border-cyan-800 bg-opacity-90 shadow-xl rounded-xl p-5 max-w-lg w-fit">
      <div className="flex items-center space-x-7">
        <div className="flex items-center justify-center space-x-2">
          <h1 className="flex justify-center text-2xl font-bold">
            {state.user.username}:
          </h1>

          <div className="flex justify-center">
            <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
              <img
                src={avatarLoading ? "" : avatarData?.getAvatar?.profile}
                alt="Player Avatar"
                className="w-14 h-14 rounded-full"
              />
            </div>
          </div>
        </div>
        <p className="text-2xl font-bold">
          High Score: {!statsLoading ? statsData?.getStats?.highScore : "N/A"}
        </p>
      </div>

      {/* Options for Game Modes if we want to implement, otherwise delete this */}
      {/* <h2 className="text-2xl font-bold text-white mb-4 text-center">
        Game Mode
      </h2>
      <div className="flex justify-around">
        <button className="bg-purple-500 text-white py-4 px-8 rounded-xl text-xl shadow-lg hover:bg-purple-700 transition ease-in-out hover:scale-105 hover:drop-shadow-lg">
          High Score
        </button>
        <button className="bg-purple-500 text-white py-4 px-8 rounded-xl text-xl shadow-lg hover:bg-purple-700 transition ease-in-out hover:scale-105 hover:drop-shadow-lg">
          Time Trial
        </button>
      </div> */}
    </div>
  );
};

export default PlayerSec;
