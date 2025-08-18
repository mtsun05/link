import React from "react";
import { Link } from "react-router-dom";

const ButtonLink = ({ children, path }) => {
  return (
    <>
      <Link
        className="px-4 py-4 mx-2 text-xl border-hidden font-bold rounded-2xl bg-white hover:scale-105 hover:shadow-2xl hover:ring-5 hover:ring-indigo-600/30 hover:shadow-indigo-600 transition duration-200 text-[#2921cc] cursor-pointer w-fit h-fit"
        to={path}
      >
        {children}
      </Link>
    </>
  );
};

export default ButtonLink;
