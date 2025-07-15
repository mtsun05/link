import React from "react";

import { Link } from "react-router-dom";

const SearchResult = ({ community }) => {
  return (
    <>
      <li className="p-2 bg-neutral-700 border border-hidden rounded-md hover:bg-gray-700 transition-colors duration-200">
        <Link
          className="text-xl block text-white w-full"
          to={`/communities/${community._id}`}
        >
          {community.name}
          <span className="block text-white text-sm w-full">
            {community.creator && community.creator.name}
          </span>
        </Link>
      </li>
    </>
  );
};

export default SearchResult;
