import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <>
      <div className="flex flex-col items-center">
        <span className="text-8xl text-slate-100 not-italic font-[abril-tilting]">
          Welcome to Link.
        </span>
        <span className="text-slate-100 font-[helvetica]  text-2xl">
          A new place to build communities.
        </span>
      </div>
      <div className="flex justify-center m-5">
        <Link
          className="text-slate-100 font-[helvetica] font-bold font-italic text-2xl m-2 px-5 py-2 border-1 border-white-100 rounded-xl cursor-pointer"
          to="/communities/create"
        >
          Create
        </Link>
        <Link
          className="text-slate-100 font-[helvetica] font-bold font-italic text-2xl m-2 px-5 py-2 border-1 border-white-100 rounded-xl cursor-pointer"
          to="/communities/join"
        >
          Join
        </Link>
      </div>
    </>
  );
}
