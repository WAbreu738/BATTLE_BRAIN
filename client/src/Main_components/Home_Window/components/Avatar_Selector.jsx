import { useEffect, useState } from "react";
import { useStore } from "../../OptionsProvider";
import rightArrow from "../../../assets/images/BattleBrainRight.png";
import leftArrow from "../../../assets/images/BattleBrainLeft.png";
import { gql, useMutation, useQuery } from "@apollo/client";
import { ADD_AVATAR } from "../../../graphql/mutations";
import { GET_AVATAR } from "../../../graphql/queries";

const seedName = [
  "Garfield",
  "Bella",
  "Angel&rotate=200&backgroundColor=546e7a&backgroundRotation=0,360,320,300&translateX=5&translateY=10&randomizeIds=true&eyes=bulging&mouth=smile02,grill03",
  "Bear",
  "Misty",
  "Trouble",
  "Missy",
  "Lucky",
  "Precious",
  "Sugar",
  "Baby",
  "Jasmine",
  "Cookie",
  "Zoey",
];
const baseUrl = "https://api.dicebear.com/8.x/bottts-neutral/svg?seed=";

const AvatarSelector = () => {
  const { loading, data } = useQuery(GET_AVATAR);

  const { state } = useStore();
  const [startIdx, setStartIdx] = useState(0);
  const [middleIndex, setMiddleIndex] = useState(1); // Track middle image index
  const [avatarUrl, setAvatarUrl] = useState({
    profile: `${baseUrl}Bear`,
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
      //if logged out set avatar to default
      if (typeof data === "undefined") {
        setAvatarUrl({
          profile: `${baseUrl}Harley`,
        });
        setMiddleIndex(0);
      } else {
        const currentSeed = data.getAvatar.profile.split("=")[1];
        setAvatarUrl({ profile: data.getAvatar.profile });
        setMiddleIndex(seedName.indexOf(currentSeed));
      }
    }
  }, [loading, data]);

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
      } relative flex items-center justify-center md:scale-125 scale-100`}
    >
      <button
        className="text-zinc-900 flex align-middle justify-center text-3xl font-bold absolute md:left-14 -left-5 top-1/2 transform -translate-y-1/2 hover:animate-pulse"
        disabled={startIdx === 0}
        onClick={handleLeftClick}
      >
        <img className="h-12 w-12" src={leftArrow} alt="Left Arrow" />
      </button>
      <div className="flex overflow-y-visible space-x-4 bg-cyan-950 p-1 rounded-full">
        {[startIdx, startIdx + 1, startIdx + 2].map((index) => (
          <img
            key={index}
            src={`${baseUrl}${seedName[index]}`}
            alt={`Avatar ${seedName[index]}`}
            className={`w-14 h-14 md:w-18 md:h-18 rounded-full cursor-pointer border-4 ${
              index === middleIndex
                ? "border-sky-500 scale-125"
                : `border-transparent ${hoverTransition}`
            } ${avatarTransition}`}
            onClick={() => {
              setAvatarUrl({
                profile: `${baseUrl}${seedName[index]}`,
              });
              setMiddleIndex(index);
            }}
          />
        ))}
      </div>
      <button
        className="text-zinc-900 flex align-middle justify-center text-3xl font-bold absolute md:right-14 -right-5 top-1/2 transform -translate-y-1/2 hover:animate-pulse"
        disabled={startIdx >= seedName.length - 3} // Adjust the condition based on total avatars
        onClick={handleRightClick}
      >
        <img className="h-12 w-12" src={rightArrow} alt="Right Arrow" />
      </button>
    </div>
  );
};

export default AvatarSelector;
