import React from "react";

const Input = ({
  name,
  labelName,
  type = "text",
  required = false,
  onChange = () => {},
}) => {
  return (
    <>
      <div className="m-2 w-full">
        <label
          className="block text-md font-medium text-slate-100"
          htmlFor={name}
        >
          {labelName}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
        {type === "textarea" ? (
          <textarea
            className="text-white font-medium border-1 border-gray-400 p-1 rounded-md w-full h-32"
            name={name}
            id={name}
            required={required}
          ></textarea>
        ) : (
          <input
            className="text-white font-[helvetica] border-1 border-gray-400 rounded-md p-1 w-5/6"
            type={type}
            name={name}
            id={name}
            required={required}
            onChange={(e) => {
              onChange(e.target.value);
            }}
          />
        )}
      </div>
    </>
  );
};

export default Input;
