import { useEffect } from "react";
import { createContext, useContext, useState } from "react";

import { gql, useQuery } from "@apollo/client"; // -for username

import { AUTHENTICATE } from "../graphql/queries";

const Context = createContext();

export const useStore = () => useContext(Context);

export const GlobalStateProvider = ({ children }) => {
  const { data } = useQuery(AUTHENTICATE);

  const initialState = {
    category: "",
    difficulty: "easy,medium,hard",
    region: "",
    user: null,
  };

  const [state, setState] = useState(initialState);

  // useEffect query for username
  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      user: data?.authenticate,
    }));
  }, [data]);

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

  const setCategory = (newCategory) => {
    setState((prevState) => ({ ...prevState, category: newCategory }));
  };

  return (
    <Context.Provider
      value={{ state, setDifficulty, setRegion, setCategory, setState }}
    >
      {children}
    </Context.Provider>
  );
};
