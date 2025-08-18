import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ButtonLink from "../utility/buttons/ButtonLink";
import LandingButton from "../utility/buttons/LandingButton";

export default function Landing() {
  return (
    <>
      <div className="flex flex-col items-center mt-20">
        <span className="text-8xl text-slate-100 font-bold">
          Welcome to Link.
        </span>
        <span className="text-slate-100 font-[helvetica]  text-2xl">
          A new place to build communities.
        </span>
      </div>
      <div className="flex justify-center m-5 space-x-2 space-y-2">
        <LandingButton path="/communities/create">Create</LandingButton>
        <LandingButton path="/communities/join">Join</LandingButton>
      </div>
    </>
  );
}
