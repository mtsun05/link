import { NavLink } from "react-router-dom";
import lightlogo from "../assets/link-logo-light.svg";
import { useEffect, useState } from "react";
import ProfileButton from "./ProfileButton";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const { user, loggedIn, setUser, setLoggedIn } = useAuth();
  useEffect(() => {
    setLoggedIn(!!user);
  }, []);
  return (
    <div className="mb-8 border-b-2 border-gray-400">
      <nav className="flex justify-between items-center mb-3">
        <NavLink to="/">
          <img className="m-3 h-10 inline" src={lightlogo}></img>
        </NavLink>
        {loggedIn ? (
          <ProfileButton user={user} />
        ) : (
          <NavLink
            className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-slate-800 h-9 rounded-md px-3 text-slate-100 m-3"
            to="/users/login"
          >
            Login
          </NavLink>
        )}
      </nav>
    </div>
  );
}
