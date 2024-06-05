import { NavLink } from "react-router-dom";
import { useStore } from "../../OptionsProvider";

import playBtn from "../../../assets/images/PLAY.png";

export default function PlayBtn() {
  const { state } = useStore();
  const { category, difficulty } = state;

  // Check if both category and difficulty are selected
  const isCategorySelected = category !== "";
  const isDifficultySelected = difficulty !== "";
  const isBothSelected = isCategorySelected && isDifficultySelected;

  // Render the BattleBtn only if both category and difficulty are selected

  return (
    <>
      {isBothSelected && (
        <NavLink
          to="/spplay"
          className="transition ease-in-out hover:scale-105 hover:drop-shadow-lg"
        >
          <img
            src={playBtn}
            alt="battle button"
            className=" w-fit transition ease-in-out hover:scale-105 hover:drop-shadow-lg"
          />
        </NavLink>
      )}
    </>
  );
}
