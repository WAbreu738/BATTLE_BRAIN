import { useStore } from "../../OptionsProvider";
import { useQuery } from "@apollo/client";
import { GET_AVATAR } from "../../../graphql/queries";

const PlayersSec = () => {
  const { state } = useStore();

  const { loading: avatarLoading, data: avatarData } = useQuery(GET_AVATAR);

  return (
    <div className="absolute flex left-1/2 -translate-x-1/2 space-x-80 top-6">
      <div className="w-16 h-16 bg-cyan-950 rounded-full flex items-center justify-center ">
        <img
          src={avatarLoading ? "" : avatarData?.getAvatar?.profile}
          alt={state.user.username}
          className="w-14 h-14 rounded-full"
        />
      </div>
      <div className="w-16 h-16 bg-cyan-950 rounded-full flex items-center justify-center ">
        <img
          src="https://randomuser.me/api/portraits/lego/2.jpg"
          alt="Player Avatar"
          className="w-14 h-14 rounded-full"
        />
      </div>
    </div>
  );
};

export default PlayersSec;
