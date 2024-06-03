import { useEffect } from "react";
import { JOIN_GAME } from "../../../graphql/mutations";
import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { NavLink } from "react-router-dom";
import { GET_GAME } from "../../../graphql/queries";
import { useStore } from "../../OptionsProvider";

const RoomCode = () => {
  const { state, setRoomcode } = useStore();
  const [formData, setFormData] = useState({ gameId: "" });
  const [input, setInput] = useState({ gameId: "" });
  const [joined, setJoined] = useState(true);

  const { loading, error, data, refetch } = useQuery(GET_GAME, {
    variables: input,
  });

  const handleRefetch = () => {
    refetch(input);
  };

  useEffect(() => {
    handleRefetch();
  }, [input]);

  const handleChange = (e) => {
    const currentInput = e.target.value;
    setRoomcode(currentInput);
    setInput({ gameId: currentInput });
  };

  const [joinGame] = useMutation(JOIN_GAME, {
    variables: formData,
  });

  useEffect(() => {
    if (formData !== "") {
      joinGame({
        variables: formData,
      });
    }
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formInput = e.target.elements.roomcode.value;
    try {
      if (formInput !== "") {
        setFormData({ gameId: formInput });
        setJoined(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mb-3 flex align-middle justify-center">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="roomcode"
          placeholder="Room code"
          className="py-2 px-0.5 rounded text-zinc-900"
          onChange={handleChange}
        />
        {!loading &&
          data.getGame &&
          (joined ? (
            <button
              type="submit"
              className="bg-rose-700 border border-rose-700 text-white ml-4 py-2 px-3 rounded-lg text-lg shadow-lg hover:bg-rose-600 transition ease-in-out hover:scale-105 hover:drop-shadow-lg"
            >
              Set Room
            </button>
          ) : (
            <NavLink
              className="bg-cyan-800 border border-cyan-800 text-white ml-4 py-2 px-3 rounded-lg text-lg shadow-lg hover:bg-cyan-700 transition ease-in-out hover:scale-105 hover:drop-shadow-lg"
              to={`/lobby/${data.getGame._id}`}
            >
              Join
            </NavLink>
          ))}
      </form>
    </div>
  );
};

export default RoomCode;
