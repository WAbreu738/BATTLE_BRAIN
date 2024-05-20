import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import HomeWindow from "./Main_components/Home_Window/Home_Window";
import BattleMode from "./Main_components/BattleMode_Window/BattleMode_Window";
import LobbyWindow from "./Main_components/Lobby_Window/Lobby_Window";
import CategoryWindow from "./Main_components/Category_Window/Category";

function App() {
  return (
    <main>
      <div>
        <Routes>
          <Route path="/" element={<HomeWindow />} />
          <Route path="/lobby" element={<LobbyWindow />} />
          <Route path="/category" element={<CategoryWindow />} />
          <Route path="/battle" element={<BattleMode />} />
        </Routes>
      </div>
    </main>
  );
}

export default App;
