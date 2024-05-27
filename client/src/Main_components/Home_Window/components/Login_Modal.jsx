import React, { useState } from "react";
import axios from "axios"; // Ensure Axios is imported for HTTP requests

// Immutable structure for initial player data
const PlayerStructure = {
  username: "",
  password: "",
};

function LoginModal(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [playerData, setPlayerData] = useState(PlayerStructure);

  // Function to open the modal
  const openModal = () => setIsModalOpen(true);
  // Function to close the modal
  const closeModal = () => setIsModalOpen(false);

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
      let url = "";
      if (actionType === "login") {
        url = "http://localhost:3000/login"; // Adjust the URL to match your backend login endpoint
      } else if (actionType === "register") {
        url = "http://localhost:3000/register"; // Adjust the URL to match your backend registration endpoint
      }

      const response = await axios.post(url, playerData);
      console.log(response.data);
      // Handle successful submission (e.g., close the modal, show a success message)
      closeModal();
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
        className="bg-purple-500 text-white py-4 px-8 rounded-lg text-xl shadow-lg hover:bg-purple-700"
      >
        Login/Register
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="relative w-full max-w-md md:max-w-2xl mx-auto">
            {/* Modal Structure */}
            <div className="relative bg-white shadow-lg rounded-lg">
              {/* Header */}
              <div className="flex items-start justify-between p-5 rounded-t border-b border-gray-200">
                <h3 className="text-xl font-medium leading-6 text-gray-900">
                  Login
                </h3>
                <button
                  onClick={closeModal}
                  className="bg-transparent text-black opacity-5 hover:opacity-8"
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
                    className="w-full p-2 mb-2 border border-gray-300 rounded"
                  />

                  {/* Password input */}
                  <input
                    type="password"
                    placeholder="Password"
                    value={playerData.password}
                    onChange={(e) => handleInputChange(e, "password")}
                    className="w-full p-2 mb-2 border border-gray-300 rounded"
                  />

                  {/* Separate buttons for Login and Register */}
                  <div className="mt-4">
                    <button
                      type="button"
                      onClick={() => handleSubmit("login")}
                      className="mr-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                    >
                      Login
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSubmit("register")}
                      className="ml-2 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
                    >
                      Register
                    </button>
                  </div>
                </form>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end p-6 space-x-2 rounded-b border-t border-gray-200">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg"
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
