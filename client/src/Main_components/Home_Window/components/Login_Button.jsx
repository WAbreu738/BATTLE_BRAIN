import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function LoginButton(props) {
  return (
    <div className="flex justify-around mb-8">
      <NavLink className="bg-purple-500 text-white py-4 px-8 rounded-lg text-xl shadow-lg hover:bg-purple-700">
        Login/Register
      </NavLink>
    </div>
  );
}

export default LoginButton;
