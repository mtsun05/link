import React from "react";
import Input from "../utility/Input";
import CommunitySearchBar from "../utility/SearchBar";

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
