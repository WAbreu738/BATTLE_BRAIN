import React, { useEffect, useState } from "react";
import Logo from "../Logo/Logo";
import AvatarSelector from "./components/Avatar_Selector";
import GameBtn from "./components/Game_Btn";
import LoginButton from "./components/Login_Button";
import LoginModal from "./components/Login_Modal";

const HomeWindow = () => {
  return (
    <main className="flex flex-col items-center justify-center h-screen p-4">
      <div>
        <Logo />
      </div>

      <section className=" bg-cyan-700 bg-opacity-95 shadow-lg rounded-xl p-10 max-w-lg w-full">
        {/* USER INFO (avatar is placeholder atm) */}

        <div className="flex justify-around mb-8">
          <LoginModal />
        </div>
        <AvatarSelector />

        {/* USER INFO END LINE */}

        {/* if logged in, refresh the page and show the gamebtn */}
        <GameBtn />
      </section>
    </main>
  );
};

export default HomeWindow;
