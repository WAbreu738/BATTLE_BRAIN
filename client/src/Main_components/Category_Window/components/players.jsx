import { useStore } from "../../OptionsProvider";
import { useQuery } from "@apollo/client";
import { GET_AVATAR } from "../../../graphql/queries";
import { POLL_GAME } from "../../../graphql/queries";

const PlayersSec = () => {
  const { state } = useStore();

  const { loading, error, data } = useQuery(POLL_GAME, {
    variables: { gameId: state.roomcode },
    pollInterval: 2000,
  });

  const { loading: avatarLoading, data: avatarData } = useQuery(GET_AVATAR);

  return (
    <div className="absolute flex left-1/2 -translate-x-1/2 md:space-x-80 space-x-60 md:top-8 md:scale-100 scale-90 top-4">
      <div className="w-16 h-16 rounded-full flex flex-col items-center justify-center">
        <img
          src={loading ? "" : data?.pollGame?.playerOne?.player?.profile}
          alt={state.user.username}
          className="w-14 h-14 border-4 border-cyan-950 rounded-full"
        />
        <p className="font-bold">
          {data?.pollGame?.playerOne?.player?.username}
        </p>
      </div>
      <div className="w-16 h-16 rounded-full flex flex-col  items-center justify-center ">
        <img
          src={loading ? "" : data?.pollGame?.playerTwo?.player?.profile}
          alt="Player Avatar"
          className="w-14 h-14 border-4 border-cyan-950 rounded-full"
        />
        <p className="font-bold">
          {data?.pollGame?.playerTwo?.player?.username}
        </p>
      </div>
    </div>
  );
};

export default PlayersSec;
