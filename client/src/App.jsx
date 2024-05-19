import { useState } from "react";
import TriviaComponent from "./Main_components/Trivia_Test";
// import HomeWindow from "./Main_components/Home_Window/Home_Window";
// import BattleMode from "./Main_components/BattleMode_Window/BattleMode_Window";
// import "./index.scss";
import "./App.css";

function App() {
  return (
    <>
      <div className="">
        <TriviaComponent />
        {/* <HomeWindow /> */}
        {/* <BattleMode /> */}
      </div>
    </>
  );
}

export default App;
