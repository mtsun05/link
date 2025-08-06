import React from "react";
import { Link } from "react-router-dom";

const ButtonLink = ({ name, path }) => {
  return (
    <>
      <Link
        className="p-2 text-lg font-bold border-hidden rounded-md bg-white hover:bg-neutral-400 cursor-pointer w-fit h-fit transition duration-150 ease-in-out"
        to={path}
      >
        {name}
      </Link>
    </>
  );
};

export default ButtonLink;
