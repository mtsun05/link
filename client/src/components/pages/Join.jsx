import React from "react";
import Input from "../utility/inputs/Input";
import CommunitySearchBar from "../utility/inputs/SearchBar";

function Join() {
  return (
    <>
      <div className="flex flex-col w-1/2 items-center mx-auto">
        <span className="mt-10 text-center text-5xl font-bold tracking-tight text-slate-100">
          Find a community
        </span>
        <CommunitySearchBar />
      </div>
    </>
  );
}

export default Join;
