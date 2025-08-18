import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import googlelogo from "../../assets/google_logo.png";
const BASE_API_URL = import.meta.env.VITE_API_URL || "https://localhost:5050";
const loginURL = `${BASE_API_URL}/auth/google`;

export default function Login() {
  const params = useParams();
  const navigate = useNavigate();

  const formRef = useRef();
  const clearForm = () => {
    formRef.current.reset();
  };

  return (
    <>
      <div className="flex flex-col items-center m-5 size-full">
        <h2 className="text-center text-5xl/9 my-8 font-bold tracking-tight text-slate-100">
          Sign in to your account
        </h2>

        <div className="flex flex-col items-center sm:mx-auto sm:w-full sm:max-w-sm">
          <a
            href={loginURL}
            className="flex w-2/3 justify-center items-center space-x-2 bg-white px-3 py-2 rounded-sm text-sm/6 font-medium text-black border border-gray-400 shadow-xs hover:bg-gray-200"
            role="button"
          >
            <img src={googlelogo} className="size-[20px]" alt="Google logo" />
            <span>Sign in with Google</span>
          </a>
        </div>
      </div>
    </>
  );
}
