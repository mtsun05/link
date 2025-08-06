import React from "react";
import Input from "../utility/inputs/Input";
import CommunitySearchBar from "../utility/inputs/SearchBar";

function Join() {
  const onSubmit = async () => {};
  return (
    <>
      <div>
        <form onSubmit={onSubmit}>
          <CommunitySearchBar />
        </form>
      </div>
    </>
  );
}

export default Join;
