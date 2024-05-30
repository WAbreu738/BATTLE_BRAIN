import React, { useState } from "react";
import axios from "axios"; // Ensure Axios is imported for HTTP requests
import { gql, useMutation } from "@apollo/client";
import { REGISTER_USER, LOGIN_USER } from "../../../graphql/mutations";
import { useStore } from "../../OptionsProvider";

// Immutable structure for initial player data
const PlayerStructure = {
  username: "",
  password: "",
};

function LoginModal(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [playerData, setPlayerData] = useState(PlayerStructure);
  const { setState } = useStore();

  // Function to open the modal
  const openModal = () => setIsModalOpen(true);
  // Function to close the modal
  const closeModal = () => setIsModalOpen(false);

  const [registerUser] = useMutation(REGISTER_USER, {
    variables: playerData,
    //refetch queries, maybe for chat messages?
  });

  const [loginUser] = useMutation(LOGIN_USER, {
    variables: playerData,
    //refetch queries, maybe for chat messages?
  });

  // Function to handle input changes and update the state
  const handleInputChange = (e, field) => {
    setPlayerData((prevState) => ({
      ...prevState,
      [field]: e.target.value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = async (actionType) => {
    // Debugging: Log the playerData to see if it's being updated correctly
    console.log("Submitting with data:", playerData);

    // Simple frontend validation
    if (!playerData.username || !playerData.password) {
      alert("Username and password are required.");
      return;
    }

    try {
      let res;
      if (actionType === "login") {
        res = await loginUser();
      } else if (actionType === "register") {
        res = await registerUser();
      }
      console.log(res);
      //props.setUser(user);
      setState((oldState) => ({
        ...oldState,
        user: res.data.loginUser || res.data.registerUser,
      }));
      closeModal();
      // let url = "";
      // if (actionType === "login") {
      //   url = "/api/login"; // Adjust the URL to match your backend login endpoint
      // } else if (actionType === "register") {
      //   url = "/api/register"; // Adjust the URL to match your backend registration endpoint
      // }

      // const response = await axios.post(url, playerData);
      // console.log(response.data);
      // // Handle successful submission (e.g., close the modal, show a success message)
      // props.setUser(response.data);
      // closeModal();
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      // Handle errors (e.g., show an error message)
      alert(error.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={openModal}
        className="bg-slate-600 border border-gray-600 text-white py-2 px-3 rounded-xl text-xl shadow-lg hover:bg-slate-500 transition ease-in-out hover:scale-105 hover:drop-shadow-lg"
      >
        Login/Register
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="relative md:w-2/5 w- max-w-md md:max-w-md mx-auto">
            {/* Modal Structure */}
            <div className="relative border border-gray-500 bg-gray-100 shadow-2xl rounded-lg">
              {/* Header */}
              <div className="flex items-start justify-between p-3 rounded-t border-b border-gray-300">
                <h3 className="text-xl font-medium leading-6 text-zinc-900">
                  Login
                </h3>
                <button
                  onClick={closeModal}
                  className="bg-transparent text-zinc-900 opacity-5 hover:opacity-8"
                >
                  &times;
                </button>
              </div>

              {/* Body */}
              <div className="relative p-5">
                <form>
                  {/* Username input */}
                  <input
                    type="text"
                    placeholder="Username"
                    value={playerData.username}
                    onChange={(e) => handleInputChange(e, "username")}
                    className="w-full p-2 mb-2 border rounded text-zinc-900"
                  />

                  {/* Password input */}
                  <input
                    type="password"
                    placeholder="Password"
                    value={playerData.password}
                    onChange={(e) => handleInputChange(e, "password")}
                    className="w-full p-2 mb-2 border rounded text-zinc-900"
                  />

                  {/* Separate buttons for Login and Register */}
                  <div className="mt-4">
                    <button
                      type="button"
                      onClick={() => handleSubmit("login")}
                      className="mr-2 bg-cyan-600 hover:bg-cyan-500 text-white py-2 px-4 rounded-lg"
                    >
                      Login
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSubmit("register")}
                      className="ml-2 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-500"
                    >
                      Register
                    </button>
                  </div>
                </form>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end p-3 space-x-2 rounded-b border-t border-gray-300">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-rose-700 hover:bg-rose-600 text-white rounded-lg"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default LoginModal;
