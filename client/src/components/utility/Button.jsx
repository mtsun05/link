import React from "react";

const Button = ({ name, onClick }) => {
  return (
    <>
      <button
        onClick={onClick}
        className="m-2 p-2 text-lg font-bold border-hidden rounded-md bg-white hover:bg-neutral-300 cursor-pointer w-fit"
      >
        {name}
      </button>
    </>
  );
};

export default Button;
