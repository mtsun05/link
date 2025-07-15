import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Signup() {
  const params = useParams();
  const navigate = useNavigate();

  const formRef = useRef();
  const clearForm = () => {
    formRef.current.reset();
  };

  const foundUser = async (username) => {
    try {
      let res = await fetch(`https://localhost:5050/users/${username}/`);
      let text = await res.text();
      console.log(text);
      if (!res.ok) {
        if (res.status === 404) {
          return false;
        } else {
          console.error("something went wrong");
          return false;
        }
      }
      return true;
    } catch (err) {
      console.error(err);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const userInfo = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const userExists = await foundUser(userInfo.username);

    if (userExists) {
      console.error("you already have an account");
      navigate("/users/login");
      return;
    }
    try {
      let res = await fetch(`https://localhost:5050/users/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });
      if (!res.ok) {
        const text = await res.text();
        if (text == "Username error") {
          clearForm();
          console.error("Username already in use");
          return;
        } else if (text == "Email error") {
          clearForm();
          console.error("Email already associated with an existing account");
          return;
        }
      }
      navigate("/users/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-col items-center justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-slate-100">
            Create a new account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={onSubmit} method="POST">
            <div>
              <label
                htmlFor="username"
                className="block text-sm/6 font-medium text-slate-100"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="username"
                  id="username"
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-slate-100"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-slate-100"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="mt-2">
              <button
                type="submit"
                onSubmit={onSubmit}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-bold text-white shadow-xs hover:bg-indigo-500 hover:cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Already have an account?
            <a
              href="/users/login"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
