import React from "react";
import { Link } from "react-router-dom";

const ButtonLink = ({ name, path }) => {
  return (
    <>
      <Link
        to={path}
        className="m-2 p-2 text-lg font-bold border-hidden rounded-md bg-white hover:bg-neutral-300 cursor-pointer w-fit"
      >
        {name}
      </Link>
    </>
  );
};

export default ButtonLink;
