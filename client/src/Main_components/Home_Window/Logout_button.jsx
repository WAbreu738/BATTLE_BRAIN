import React from "react";
import axios from "axios";
import { gql, useMutation } from "@apollo/client";

import { LOGOUT_USER } from "../../graphql/mutations";
import { useStore } from "../OptionsProvider";
import logoutButton from "../../assets/images/BattleBrainLogout.png";

const LogoutButton = (props) => {
  const [logoutUser] = useMutation(LOGOUT_USER);
  const { setState } = useStore();

  const handleLogout = async () => {
    try {
      await logoutUser();
      setState((oldState) => ({
        ...oldState,
        user: null,
      }));
      localStorage.removeItem("id_token");
    } catch (error) {
      //console.log(error);
    }
  };

  return (
    <div className="absolute -top-6 -left-6">
      <button
        onClick={handleLogout}
        className="bg-gray-900 text-slate-600 border border-gray-600 py-1 px-1 rounded-xl text-xl shadow-lg transition ease-in-out hover:scale-105 hover:drop-shadow-lg"
      >
        <img className="h-9" src={logoutButton} alt="Logout" />
      </button>
    </div>
  );
};

export default LogoutButton;
