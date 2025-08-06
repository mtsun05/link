import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ButtonLink from "../utility/buttons/ButtonLink";

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
      <div className="flex justify-center m-5 space-x-2 space-y-2">
        <ButtonLink name="Create" path="/communities/create" />
        <ButtonLink name="Join" path="/communities/join" />
      </div>
    </>
  );
}
