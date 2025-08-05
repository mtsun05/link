import React, { useState } from "react";

const AddInput = ({ name, values, setValues }) => {
  const [currentValue, setCurrentValue] = useState("");

  const handleAddValue = () => {
    const trimmedValue = currentValue.trim();
    if (trimmedValue && !values.includes(trimmedValue)) {
      setValues((prevValue) => [...prevValue, trimmedValue]);
      setCurrentValue("");
    }
  };

  const handleRemoveValue = (valueToRemove) => {
    setValues((prevValues) =>
      prevValues.filter((value) => value !== valueToRemove)
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddValue();
    }
  };

  return (
    <>
      <div className="m-2 w-full">
        <label
          className="block text-md font-medium text-slate-100 mb-2"
          htmlFor="new-value-input"
        >
          {name}
        </label>
        <div className="flex items-center gap-2 mb-2">
          <input
            className="text-white font-[helvetica] bg-[#222222] border-2 border-gray-400 rounded-md p-1 w-5/6"
            type="text"
            name="new-value-input"
            id="new-value-input"
            value={currentValue}
            onChange={(e) => setCurrentValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={handleAddValue}
            type="button"
            className="text-lg px-3 py-1 text-black font-bold border-hidden rounded-xl bg-white hover:bg-neutral-300 cursor-pointer w-fit"
          >
            +
          </button>
        </div>

        <div className="flex flex-wrap mt-2">
          {values.map((value) => (
            <span
              key={value}
              className="bg-indigo-600 text-white text-sm px-3 py-1 rounded-md flex items-center m-1"
            >
              {value}
              <button
                onClick={() => handleRemoveValue(value)}
                type="button"
                className="text-xs text-white hover:bg-indigo-800 rounded-full w-4 h-4 flex items-center justify-center"
              >
                x
              </button>
            </span>
          ))}
        </div>
      </div>
    </>
  );
};

export default AddInput;
