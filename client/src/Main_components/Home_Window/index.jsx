import React, { useEffect, useState } from "react";
import Logo from "../Logo/Logo";
import AvatarSelector from "./components/Avatar_Selector";
import GameBtn from "./components/Game_Btn";
import LoginModal from "./components/Login_Modal";
import LogoutButton from "./Logout_button";
import { useStore } from "../OptionsProvider";

const HomeWindow = (props) => {
  const { state } = useStore();
  return (
    <main className="flex flex-col items-center justify-center h-screen p-4">
      <div>
        <Logo />
      </div>

      <div className=" bg-cyan-600 border border-cyan-800 bg-opacity-90 shadow-xl rounded-xl p-8 max-w-lg w-full">
        {/* USER INFO (avatar is placeholder atm) */}
        <AvatarSelector />
        {/* Checks if user is logged in, if true show logout, if not show login */}
        {state.user ? (
          <div className="flex mt-10">
            <LogoutButton />
          </div>
        ) : (
          <div className="flex mt-10">
            <LoginModal />
          </div>
        )}

        {/* USER INFO END LINE */}

        {/* if logged in, refresh the page and show the gamebtn */}
      </div>
      <div className="bg-cyan-600 border border-cyan-800 bg-opacity-90 shadow-xl rounded-xl p-8 max-w-lg w-full mt-5">
        <GameBtn />
      </div>
    </main>
  );
};

export default HomeWindow;
