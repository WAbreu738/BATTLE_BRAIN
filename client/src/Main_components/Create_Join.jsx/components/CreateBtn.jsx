import { useState } from "react";
import { NavLink } from "react-router-dom";
import { CREATE_GAME } from "../../../graphql/mutations";
import { useMutation } from "@apollo/client";
import { useStore } from "../../OptionsProvider";
import createGameBtn from "../../../assets/images/CREATE-GAME.png";
import battleBtn from "../../../assets/images/BATTLE.png";

const CreateBtn = () => {
  const { state, setRoomcode } = useStore();
  const [createGame] = useMutation(CREATE_GAME);
  const [gameCreated, setgameCreated] = useState(false);

  async function handleCreateGame() {
    try {
      const { data } = await createGame();
      setgameCreated(true);

      setRoomcode(data.createGame._id);

      // Optionally, you can handle the response here
      console.log("Game created:", data.createGame);
    } catch (error) {
      // Handle errors
      console.error("Error creating game:", error.message);
    }
  }

  return (
    <div className="flex justify-center transition ease-in-out hover:scale-105 hover:drop-shadow-lg w-fit mx-auto">
      {!gameCreated ? (
        <button
          onClick={handleCreateGame}
          className="bg-cyan-950 rounded-xl shadow-md transition ease-in-out hover:scale-105 hover:drop-shadow-lg max-w-52 h-20 hover:animate-pulse"
        >
          <img src={createGameBtn} />
        </button>
      ) : (
        <NavLink
          to={`/lobby/${state.roomcode}`} // THIS WILL CHANGE TO 'hostRoom'
          className="bg-cyan-950 rounded-xl shadow-md transition ease-in-out hover:scale-105 hover:drop-shadow-lg max-w-52 hover:animate-pulse"
        >
          <img src={battleBtn} />
        </NavLink>
      )}
    </div>
  );
};

export default CreateBtn;
