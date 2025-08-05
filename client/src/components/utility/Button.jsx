import React from "react";

const Button = ({
  name,
  onClick = () => {},
  disabled = false,
  red = false,
}) => {
  return (
    <>
      {!disabled ? (
        <button
          onClick={onClick}
          className={`p-2 text-lg text-black font-bold border-hidden rounded-md cursor-pointer w-fit h-fit ${
            red
              ? "bg-red-500 hover:bg-red-400 transition duration-150 ease-in-out"
              : "bg-white hover:bg-neutral-400 transition duration-150 ease-in-out"
          }`}
        >
          {name}
        </button>
      ) : (
        <button className="m-2 p-2 text-lg font-bold border-hidden rounded-md bg-neutral-600 text-black w-fit h-fit">
          {name + "ed"}
        </button>
      )}
    </>
  );
};

export default Button;
