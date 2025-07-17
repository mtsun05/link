import React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import fetchAPI from "../api/fetchAPI";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const userData = await fetchAPI("/auth/check");
        if (userData && userData.googleID) {
          setUser(userData);
          setLoggedIn(true);
        } else {
          setUser(null);
        }
      } catch (e) {
        setUser(null);
        console.error("Authentication check failed:", e.errorMessage);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const value = {
    user,
    loggedIn,
    setUser,
    setLoggedIn,
  };

  return (
    <>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
