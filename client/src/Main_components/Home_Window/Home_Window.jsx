import React, { useEffect, useState } from "react";
import Logo from "../Logo/Logo";
import AvaterSelector from "./components/Avatar_Selector";
import NameInput from "./components/Name_Input";
import GameBtn from "./components/Game_Btn";

const HomeWindow = () => {
  return (
    <main className="flex flex-col items-center justify-center h-screen p-4">
      <div>
        <Logo />
      </div>

      <section className="bg-purple-900 bg-opacity-80 shadow-lg rounded-lg p-10 max-w-lg w-full">
        <AvaterSelector />
        <NameInput />
        <GameBtn />
      </section>
    </main>
  );
};

export default HomeWindow;
