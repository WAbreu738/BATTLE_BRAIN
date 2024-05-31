import { useEffect, useState } from "react";
import { useStore } from "../../OptionsProvider";
import rightArrow from "../../../assets/images/BattleBrainRight.png";
import leftArrow from "../../../assets/images/BattleBrainLeft.png";
import { gql, useMutation, useQuery } from "@apollo/client";
import { ADD_AVATAR } from "../../../graphql/mutations";
import { GET_AVATAR } from "../../../graphql/queries";

const AvatarSelector = () => {
  const { loading, data } = useQuery(GET_AVATAR);

  const { state } = useStore();
  const [startIdx, setStartIdx] = useState(0);
  const [middleIndex, setMiddleIndex] = useState(1); // Track middle image index
  const [avatarUrl, setAvatarUrl] = useState({
    profile: `https://randomuser.me/api/portraits/lego/0.jpg`,
  });

  const [addAvatar] = useMutation(ADD_AVATAR, {
    variables: avatarUrl,
    refetchQueries: [{ query: GET_AVATAR }],
  });

  // Function to handle clicking on the left button
  const handleLeftClick = () => {
    setStartIdx(Math.max(0, startIdx - 1));
  };

  // Function to handle clicking on the right button
  const handleRightClick = () => {
    setStartIdx(startIdx + 1);
  };

  //waits until data is not loading to set the url so that it is the value stored in mongodb
  useEffect(() => {
    if (!loading) {
      //if logged out set avatar to 0
      if (typeof data === "undefined") {
        setAvatarUrl({
          profile: `https://randomuser.me/api/portraits/lego/0.jpg`,
        });
        setMiddleIndex(0);
      } else {
        setAvatarUrl({ profile: data.getAvatar.profile });
        setMiddleIndex(parseInt(data.getAvatar.profile.slice(41, 42))); //dependant on the url, just snipping the number
      }
    }
  }, [loading]);

  useEffect(() => {
    if (!loading) {
      addAvatar({
        variables: avatarUrl,
      });
    }
  }, [avatarUrl]);

  const avatarTransition = "transition-transform duration-700 ease-out";
  const hoverTransition =
    "transition scale-100 ease-in-out hover:scale-125 shadow-3xl hover:drop-shadow-lg";

  return (
    <div
      className={`${
        state.user ? "mt-10" : ""
      } relative flex items-center justify-center scale-125`}
    >
      <button
        className="text-zinc-900 flex align-middle justify-center text-3xl font-bold absolute left-14 top-1/2 transform -translate-y-1/2 hover:animate-pulse"
        disabled={startIdx === 0}
        onClick={handleLeftClick}
      >
        <img className="h-12 w-12" src={leftArrow} alt="Left Arrow" />
      </button>
      <div className="flex overflow-y-visible space-x-4 bg-cyan-950 p-1 rounded-full">
        {[startIdx, startIdx + 1, startIdx + 2].map((avatar, index) => (
          <img
            key={avatar}
            src={`https://randomuser.me/api/portraits/lego/${avatar}.jpg`}
            alt={`Avatar ${avatar}`}
            className={`w-12 h-12 md:w-16 md:h-16 rounded-full cursor-pointer border border-zinc-800 shadow-lg hover:${
              avatar !== middleIndex ? hoverTransition : " "
            }${
              avatar === middleIndex ? " scale-125 " : " "
            }${avatarTransition}`}
            onClick={() => {
              setAvatarUrl({
                profile: `https://randomuser.me/api/portraits/lego/${avatar}.jpg`,
              });
              setMiddleIndex(avatar);
            }}
          />
        ))}
      </div>
      <button
        className="text-zinc-900 flex align-middle justify-center text-3xl font-bold absolute right-14 top-1/2 transform -translate-y-1/2 hover:animate-pulse"
        disabled={startIdx >= 3} // Adjust the condition based on total avatars
        onClick={handleRightClick}
      >
        <img className="h-12 w-12" src={rightArrow} alt="Right Arrow" />
      </button>
    </div>
  );
};

export default AvatarSelector;
