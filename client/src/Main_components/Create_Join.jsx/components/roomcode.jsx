import { JOIN_GAME } from "../../../graphql/mutations";
import { useState } from "react";
import { useMutation } from "@apollo/client";

const RoomCode = () => {
  const [formData, setFormData] = useState("");
  const [joinGame] = useMutation(JOIN_GAME, {
    variables: formData,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const input = e.target.elements.roomcode.value;
    console.log("input", input);

    try {
      setFormData(input);
      await joinGame({
        variables: formData,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // async function handleJoinGame() {
  //   try {
  //     await joinGame({
  //       variables: { gameId: formData },
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  return (
    <div className="mb-8 flex align-middle justify-center">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="roomcode"
          placeholder="Room code"
          className="py-2 px-0.5 rounded text-zinc-900"
        />
        <button
          type="submit"
          className="bg-rose-700 border border-rose-700 text-white ml-4 py-2 px-3 rounded-lg text-lg shadow-lg hover:bg-rose-600 transition ease-in-out hover:scale-105 hover:drop-shadow-lg"
        >
          Join
        </button>
      </form>
    </div>
  );
};

export default RoomCode;
