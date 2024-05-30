import { Route, Routes } from "react-router-dom";
import { useState, useContext, createContext, useEffect } from "react";
import HomeWindow from "./Main_components/Home_Window";
import BattleMode from "./Main_components/BattleMode_Window";
import LobbyWindow from "./Main_components/Lobby_Window";
import CategoryWindow from "./Main_components/Category_Window";
import SPCategoryWindow from "./Main_components/SPMode_Category";
import SPPlay from "./Main_components/SPMode_Window";
import Background from "./Main_components/Background";
import axios from "axios";
import { useStore } from "./Main_components/OptionsProvider";
//import { socket } from "./socket.js";

function App() {
  const { state } = useStore();

  return (
    <>
      <Background />
      <main>
        <div>
          <Routes>
            <Route path="/" element={<HomeWindow />} />

            {/* Conditionally render protected routes based on authentication status */}
            {state.user ? (
              <>
                <Route path="/lobby" element={<LobbyWindow />} />
                <Route path="/singleplayer" element={<SPCategoryWindow />} />
                <Route path="/spplay" element={<SPPlay />} />
                <Route path="/category" element={<CategoryWindow />} />
                <Route path="/battle" element={<BattleMode />} />
              </>
            ) : (
              <Route path="*" element={<HomeWindow />} />
            )}
          </Routes>
        </div>
      </main>
    </>
  );
}

export default App;
