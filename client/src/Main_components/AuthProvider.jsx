import { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  //const [isLoggedIn, setIsLoggedIn] = useState(false);
  //const [userToken, setUserToken] = useState(null);

  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const login() => {
  //   setIsLoggedIn(true);
  // }

  //   const logout() => {
  //   setIsLoggedIn(false);
  //   }

  // Function to check if a user token is present
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    const res = axios.get("/api");
    setUser(res.data);
  };

  return (
    <AuthContext.Provider value={{ user, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};
