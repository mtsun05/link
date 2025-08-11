import React from "react";
import { Link } from "react-router-dom";

const ButtonLink = ({ name, path }) => {
  return (
    <>
      <Link
        className="p-3 mx-2 text-xl border-hidden font-semibold rounded-xl bg-white hover:scale-105 hover:shadow-md hover:shadow-neutral-200 transition duration-200 text-[#2921cc] cursor-pointer w-fit h-fit"
        to={path}
      >
        {name}
      </Link>
    </>
  );
};

export default ButtonLink;
