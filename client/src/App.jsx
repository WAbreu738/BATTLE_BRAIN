import { Route, Routes } from "react-router-dom";
import { StreamChat } from "stream-chat";
// import { useState, useContext, createContext } from "react";
import HomeWindow from "./Main_components/Home_Window";
import BattleMode from "./Main_components/BattleMode_Window";
import LobbyWindow from "./Main_components/Lobby_Window";
import CategoryWindow from "./Main_components/Category_Window";
import SPCategoryWindow from "./Main_components/SPMode_Category";
import SPPlay from "./Main_components/SPMode_Window";
import Background from "./Main_components/Background";

// const Context = createContext()

// function Provider(props){
//   const initialState = {
//     user: null,
//     settings: {

//     }
//   }
//   const [state, setState] = useState(initialState)

//   return (
//     <Context.Provider value = {{state, setState}}>
//       {props.children}
//     </Context.Provider>
//   )
// }

// export const useStore = () => useContext(Context)

function App() {
  //StreamChat Stuff
  // const client = StreamChat.getInstance("vn99vucvfs62");
  //const token = cookie.get("token");

  return (
    <>
      <Background />
      <main>
        <div>
          <Routes>
            <Route path="/" element={<HomeWindow />} />
            <Route path="/lobby" element={<LobbyWindow />} />
            <Route path="/singleplayer" element={<SPCategoryWindow />} />
            <Route path="/spplay" element={<SPPlay />} />
            <Route path="/category" element={<CategoryWindow />} />
            <Route path="/battle" element={<BattleMode />} />
          </Routes>
        </div>
      </main>
    </>
  );
}

export default App;
