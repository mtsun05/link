import React from "react";
import { Link } from "react-router-dom";

const ButtonLink = ({ children, path }) => {
  return (
    <>
      <Link
        className="p-2 text-lg font-bold border-hidden rounded-md bg-white text-[#2921cc] cursor-pointer w-fit h-fit hover:shadow-md hover:shadow-indigo-400 transition duration-200"
        to={path}
      >
        {children}
      </Link>
    </>
  );
};

export default ButtonLink;
