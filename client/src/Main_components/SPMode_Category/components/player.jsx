import { useStore } from "../../OptionsProvider";
import { gql, useQuery } from "@apollo/client";
import { GET_AVATAR, GET_STATS } from "../../../graphql/queries";

const PlayerSec = () => {
  const { state } = useStore();

  const { loading: statsLoading, data: statsData } = useQuery(GET_STATS, {
    pollInterval: 5000,
  });
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
            <div className="w-16 h-16 bg-cyan-950 rounded-full flex items-center justify-center">
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
    </div>
  );
};

export default PlayerSec;
