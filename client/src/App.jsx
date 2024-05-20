import { useState } from "react";
// import TriviaComponent from "./Main_components/Trivia_Test";
// import HomeWindow from "./Main_components/Home_Window/Home_Window";
// import BattleMode from "./Main_components/BattleMode_Window/BattleMode_Window";
import LobbyWindow from "./Main_components/Lobby_Window/Lobby_Window";
// import CategoryWindow from "./Main_components/Category_Window/Category";
// import "./index.scss";
import "./App.css";

function App() {
  return (
    <>
      <div className="">
        {/* <TriviaComponent /> */}
        {/* <HomeWindow /> */}
        {/* <BattleMode /> */}
        <LobbyWindow />
        {/* <CategoryWindow /> */}
      </div>
    </>
  );
}

export default App;
