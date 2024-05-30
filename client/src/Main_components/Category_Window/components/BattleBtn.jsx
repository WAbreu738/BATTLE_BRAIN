import { NavLink } from "react-router-dom";
import { useStore } from "../../OptionsProvider";

import battleImg from "../../../assets/images/battle-green.png";

export default function BattleBtn() {
  const { state } = useStore();
  const { category, difficulty } = state;

  // Check if both category and difficulty are selected
  const isCategorySelected = category !== "";
  const isDifficultySelected = difficulty !== "easy,medium,hard";
  const isBothSelected = isCategorySelected && isDifficultySelected;

  // Render the BattleBtn only if both category and difficulty are selected

  return (
    <>
      {isBothSelected && (
        <NavLink
          to="/battle"
          className="transition ease-in-out hover:scale-105 hover:drop-shadow-lg"
        >
          <img
            src={battleImg}
            alt="battle button"
            className=" w-fit transition ease-in-out hover:scale-105 hover:drop-shadow-lg"
          />
        </NavLink>
      )}
    </>
  );
}
