import { createContext, useContext, useState } from "react";

const Context = createContext();

export const useStore = () => useContext(Context);

export const GlobalStateProvider = ({ children }) => {
  const initialState = {
    difficulty: "easy,medium,hard",
    region: "",
  };

  const [state, setState] = useState(initialState);

  const setDifficulty = (newDifficulty) => {
    setState((prevState) => ({
      ...prevState,
      difficulty: newDifficulty,
    }));
  };

  const setRegion = (newRegion) => {
    setState((prevState) => ({
      ...prevState,
      region: newRegion,
    }));
  };

  return (
    <Context.Provider value={{ state, setDifficulty, setRegion }}>
      {children}
    </Context.Provider>
  );
};
