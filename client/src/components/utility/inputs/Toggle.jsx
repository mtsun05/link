import { useState } from "react";

function Toggle({ label, onToggle, on }) {
  return (
    <div className="flex items-center space-x-3">
      <label
        htmlFor="toggle"
        className="block text-md font-medium text-slate-100"
      >
        {label}
      </label>
      <button
        type="button"
        id="toggle"
        role="switch"
        aria-checked={on}
        onClick={onToggle}
        className={`
          relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none cursor-pointer
          ${on ? "bg-emerald-500" : "bg-gray-200"}
        `}
      >
        <span
          className={`
            inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform duration-200 ease-in-out
            ${on ? "translate-x-6" : "translate-x-1"}
          `}
        />
      </button>
    </div>
  );
}

export default Toggle;
