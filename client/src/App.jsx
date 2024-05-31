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
import Settings from "./Main_components/Navbar";
//import { socket } from "./socket.js";

// import { split, HttpLink } from "@apollo/client";
// import { getMainDefinition } from "@apollo/client/utilities";
// import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
// import { createClient } from "graphql-ws";

function App() {
  const { state } = useStore();
  // console.log(state.user);

  // const httpLink = new HttpLink({
  //   uri: "http://localhost:3000/graphql",
  // });

  // // const { state } = useStore();

  // const wsLink = new GraphQLWsLink(
  //   createClient({
  //     url: "ws://localhost:3000/subscriptions",
  //     connectionParams: {
  //       authentication: state.user?.authToken,
  //     },
  //   })
  // );

  // // The split function takes three parameters:
  // //
  // // * A function that's called for each operation to execute
  // // * The Link to use for an operation if the function returns a "truthy" value
  // // * The Link to use for an operation if the function returns a "falsy" value
  // const splitLink = split(
  //   ({ query }) => {
  //     const definition = getMainDefinition(query);
  //     return (
  //       definition.kind === "OperationDefinition" &&
  //       definition.operation === "subscription"
  //     );
  //   },
  //   wsLink,
  //   httpLink
  // );

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
