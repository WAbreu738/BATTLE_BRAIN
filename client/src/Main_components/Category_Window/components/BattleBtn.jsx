import { NavLink } from "react-router-dom";
import { useStore } from "../../OptionsProvider";
import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { START_BATTLE } from "../../../graphql/mutations";

import battleImg from "../../../assets/images/BATTLE.png";
// import devImg from "../../../assets/images/multiplayer-in-Dev.png";

export default function BattleBtn(props) {
  const { state } = useStore();
  const { category, difficulty } = state;
  const [start, setStart] = useState(false);

  const [startBattle] = useMutation(START_BATTLE, {
    variables: { gameId: state.roomcode, startBattle: start },
  });

  useEffect(() => {
    startBattle();
  }, [start]);

  const handleSetStart = () => {
    setStart(true);
  };

  // Check if both category and difficulty are selected
  const isCategorySelected = category !== "";
  const isDifficultySelected = difficulty !== "";
  const isBothSelected = isCategorySelected && isDifficultySelected;

  // Render the BattleBtn only if both category and difficulty are selected

  return (
    <>
      {isBothSelected && (
        <button
          disabled={props.isPlayerTwo}
          onClick={handleSetStart}
          className="transition ease-in-out hover:scale-105 hover:drop-shadow-lg"
        >
          <img
            src={battleImg}
            alt="battle button"
            className=" w-fit transition ease-in-out hover:scale-105 hover:drop-shadow-lg"
          />
        </button>
      )}
    </>
  );
}
