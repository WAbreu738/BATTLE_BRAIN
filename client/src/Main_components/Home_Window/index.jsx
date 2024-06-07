import React, { useEffect, useState } from "react";
import Logo from "../Logo/Logo";
import AvatarSelector from "./components/Avatar_Selector";
import GameBtn from "./components/Game_Btn";
import LoginModal from "./components/Login_Modal";
import LogoutButton from "./Logout_button";
import SettingsBtn from "./components/SettingsBtn";
import { useStore } from "../OptionsProvider";

const HomeWindow = (props) => {
  const { state } = useStore();
  return (
    <main className="flex flex-col items-center justify-center h-screen p-4 scale-90 md:scale-100">
      <div>
        <Logo />
      </div>

      <div className=" mb-8 bg-cyan-600 relative border border-cyan-800 bg-opacity-90 shadow-xl rounded-xl p-8 max-w-lg w-full">
        <div className="absolute -top-5 -right-5">
          <SettingsBtn />
        </div>
        {state.user && <LogoutButton />}
        {state.user && (
          <div className="flex absolute top-4 left-1/2 -translate-x-1/2 bg-cyan-950 text-lg text-gray-100 font-bold rounded-xl py-1 px-2">
            <p className="mr-2">Welcome:</p>
            <p>{state.user?.username}</p>
          </div>
        )}

        {/* USER INFO (avatar is placeholder atm) */}
        <AvatarSelector />

        {!state.user && <LoginModal />}

        {/* Checks if user is logged in, if true show logout, if not show login */}

        {/* USER INFO END LINE */}

        {/* if logged in, refresh the page and show the gamebtn */}

        <p className=" text-xs absolute bottom-1 right-2">Alpha V1.8</p>
      </div>
      <div className="bg-cyan-600 border border-cyan-800 bg-opacity-90 shadow-xl rounded-xl md:p-5 p-3 max-w-lg w-full">
        <GameBtn />
      </div>
    </main>
  );
};

export default HomeWindow;
