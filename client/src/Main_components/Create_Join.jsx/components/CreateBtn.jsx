import { NavLink } from "react-router-dom";
import { CREATE_GAME } from "../../../graphql/mutations";
import { useMutation } from "@apollo/client";
import { useStore } from "../../OptionsProvider";

const CreateBtn = () => {
  const [createGame] = useMutation(CREATE_GAME);

  async function handleCreateGame() {
    try {
      await createGame();

      // Optionally, you can handle the response here
      console.log("Game created:", data.createGame);
    } catch (error) {
      // Handle errors
      console.error("Error creating game:", error.message);
    }
  }

  return (
    <div className="flex justify-center transition ease-in-out hover:scale-105 hover:drop-shadow-lg w-fit mx-auto">
      <NavLink
        onClick={handleCreateGame}
        to="/lobby" // THIS WILL CHANGE TO 'hostRoom'
        className="bg-green-600 text-white py-4 px-5 rounded-xl text-2xl shadow-xl hover:bg-green-500"
      >
        Create Room
      </NavLink>
    </div>
  );
};

export default CreateBtn;
