import React from "react";

import Input from "../utility/Input";
import Dropdown from "../utility/Dropdown";
import Slider from "../utility/Slider";
import fetchAPI from "../../api/fetchAPI";

const CreateEvent = () => {
  const onSubmit = async () => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const eventInfo = {
      name: formData.get("name"),
      desc: formData.get("desc"),
      capacity: formData.get("capacity"),
      roles: formData.get("roles"),
      join_type: formData.get("join-type"),
    };

    try {
      const data = await fetchAPI(`/events/create`, {
        method: "POST",
        body: JSON.stringify(eventInfo),
      });

      const event = await res.json();
      navigate(`/events/${event._id}`);
    } catch (e) {
      console.error(e.errorMessage);
      navigate(`/`);
      console.error("Encountered Error: ", e);
    }
  };
  return (
    <>
      <div className="flex flex-col items-center m-5 size-full">
        <span className="m-8 text-center text-5xl/9 font-bold tracking-tight text-slate-100">
          Start an event
        </span>
        <div className="text-slate-100 font-[helvetica] border-2 border-gray-400 rounded-lg w-1/2 pb-5">
          <form className="flex flex-col px-7 py-4" onSubmit={onSubmit}>
            <div className="flex flex-row justify-between w-full">
              <div className="flex flex-col w-1/2 p-5 items-start">
                <Input name="name" label="name" labelName="Name: " />
                <Slider name="capacity" />
                <Input name="roles" label="roles" labelName="Roles: " />
                <Dropdown name="join-mode" />
              </div>

              <div className="w-[1px] bg-gray-400 mx-4 self-stretch" />

              <div className="flex flex-col w-1/2 pl-4 items-start p-5">
                <Input
                  name="desc"
                  label="desc"
                  labelName="Description"
                  type="textarea"
                />
              </div>
            </div>
            <div className="mt-5 w-full ">
              <button
                type="submit"
                onSubmit={onSubmit}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-bold text-white shadow-xs hover:bg-indigo-500 hover:cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateEvent;
