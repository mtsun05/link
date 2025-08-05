import React from "react";

const Error = ({ error }) => {
  return (
    <div className="text-5xl text-white flex flex-col ">
      {error.status} Error encountered: {error.name}
      <span className="text-white text-xl">{error.message}</span>
    </div>
  );
};

export default Error;
