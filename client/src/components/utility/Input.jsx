import React from "react";

const Input = ({ name, labelName, type = "text" }) => {
  return (
    <>
      <div className="m-2 w-full">
        <label
          className="block text-md font-medium text-slate-100"
          htmlFor={name}
        >
          {labelName}
        </label>
        {type === "textarea" ? (
          <textarea
            className="text-white font-medium bg-[#222222] border-2 border-gray-400 p-1 rounded-md w-full h-32"
            name={name}
            id={name}
          ></textarea>
        ) : (
          <input
            className="text-white font-[helvetica] bg-[#222222]  border-2 border-gray-400 rounded-md p-1 w-2/3"
            type={type}
            name={name}
            id={name}
          />
        )}
      </div>
    </>
  );
};

export default Input;
