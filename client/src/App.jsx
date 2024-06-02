import { Route, Routes, useLocation } from "react-router-dom";
import {
  useState,
  useContext,
  createContext,
  useEffect,
  useLayoutEffect,
} from "react";
import HomeWindow from "./Main_components/Home_Window";
import BattleMode from "./Main_components/BattleMode_Window";
import LobbyWindow from "./Main_components/Lobby_Window";
import CategoryWindow from "./Main_components/Category_Window";
import SPCategoryWindow from "./Main_components/SPMode_Category";
import SPPlay from "./Main_components/SPMode_Window";
import Background from "./Main_components/Background";
import axios from "axios";
import { useStore } from "./Main_components/OptionsProvider";
import Settings from "./Main_components/Navbar";
import JoinCreate from "./Main_components/Create_Join.jsx";
//import { socket } from "./socket.js";

// import { split, HttpLink } from "@apollo/client";
// import { getMainDefinition } from "@apollo/client/utilities";
// import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
// import { createClient } from "graphql-ws";

function App() {
  const { state, setPage } = useStore();

  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    if (path === "/join-create") {
      setPage("/");
    } else if (path === `/lobby/${state.roomcode}`) {
      setPage("/join-create");
    } else if (path === "/singleplayer") {
      setPage("/");
    } else if (path === "/spplay") {
      setPage("/singleplayer");
    } else if (path === `/category/${state.roomcode}`) {
      setPage(`/lobby/${state.roomcode}`);
    } else if (path === `/battle/${state.roomcode}`) {
      setPage(`/category/${state.roomcode}`);
    } else if (path === "/settings") {
      setPage("/");
    }
  }, [location]);

  return (
    <>
      <Background />
      <main>
        <div>
          <Routes>
            <Route path="/" element={<HomeWindow />} />
            <Route path="/settings" element={<Settings />} />

            {/* Conditionally render protected routes based on authentication status */}
            {state.user ? (
              <>
                <Route path="/join-create" element={<JoinCreate />} />
                <Route path="/lobby/:id" element={<LobbyWindow />} />
                <Route path="/singleplayer" element={<SPCategoryWindow />} />
                <Route path="/spplay" element={<SPPlay />} />
                <Route
                  path={`/category/${state.roomcode}`}
                  element={<CategoryWindow />}
                />
                <Route
                  path={`/battle/${state.roomcode}`}
                  element={<BattleMode />}
                />
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
