import React from "react";
import axios from "axios";
import { gql, useMutation } from "@apollo/client";

import { LOGOUT_USER } from "../../graphql/mutations";
import { useStore } from "../OptionsProvider";

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
    } catch (error) {
      //console.log(error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-slate-600 border border-gray-600 text-white py-2 px-3 rounded-xl text-xl shadow-lg hover:bg-slate-500 transition ease-in-out hover:scale-105 hover:drop-shadow-lg"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
