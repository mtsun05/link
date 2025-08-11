import React from "react";

const Button = ({
  name,
  onClick = () => {},
  disabled = false,
  red = false,
  ...props
}) => {
  const { className: extraClasses = "", ...restProps } = props;

  const baseClasses = `p-2 text-lg font-bold border-hidden rounded-md cursor-pointer w-fit h-fit hover:shadow-sm hover:scale-105 transition duration-200`;

  const conditionalClasses = red
    ? "bg-[#e31717] text-white hover:shadow-[#e31717]"
    : "bg-white text-[#2921cc] hover:shadow-neutral-200";

  return (
    <>
      {!disabled ? (
        <button
          onClick={onClick}
          className={`${baseClasses} ${conditionalClasses} ${extraClasses}`}
          {...restProps}
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
