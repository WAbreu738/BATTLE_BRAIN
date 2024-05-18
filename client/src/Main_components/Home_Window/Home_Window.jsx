import React, { useEffect, useState } from "react";
import Logo from "../Logo/Logo";
import AvaterSelector from "./components/Avatar_Selector";
import NameInput from "./components/Name_Input";
import SingleBtn from "./components/Single_Btn";
import BattleBtn from "./components/Battle_Btn";

const HomeWindow = () => {
  return (
    <main>
      <div>
        <Logo />
      </div>

      <section>
        <div>
          <AvaterSelector />
        </div>

        <NameInput />

        <div>
          <SingleBtn />
          <BattleBtn />
        </div>
      </section>
    </main>
  );
};

export default HomeWindow;
