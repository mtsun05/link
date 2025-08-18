import React from "react";

import { Link } from "react-router-dom";

const SearchResult = ({ community }) => {
  return (
    <>
      <li className="p-2 mb-2 bg-white text-[#2921cc] border border-hidden rounded-md hover:scale-101 hover:shadow-sm hover:shadow-neutral-200 transition duration-200">
        <Link
          className="text-xl block w-full font-bold"
          to={`/communities/${community._id}`}
        >
          {community.name}
          <span className="block text-sm font-normal w-full">
            {community.creator && community.creator.name}
          </span>
        </Link>
      </li>
    </>
  );
};

export default SearchResult;
