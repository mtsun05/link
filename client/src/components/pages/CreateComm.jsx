import Toggle from "../utility/inputs/Toggle";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import infoIcon from "@/assets/info-icon.svg";
import CommunityNameInput from "../utility/inputs/CommNameInput";
import Input from "../utility/inputs/Input";
import Slider from "../utility/inputs/Slider";
import fetchAPI from "../../api/fetchAPI";

function Create() {
  const navigate = useNavigate();
  const [on, setOn] = useState(false);

  const onToggle = () => {
    setOn(!on);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const commInfo = {
      name: formData.get("name"),
      desc: formData.get("desc"),
      privacy: on,
    };

    try {
      const data = await fetchAPI(`/communities/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commInfo),
      });
      console.log("navigating to /id");
      navigate(`/communities/${data._id}`);
    } catch (e) {
      console.error(e.message);
      navigate(`/`);
    }
  };
  return (
    <>
      <div className="flex flex-col items-center m-5 size-full">
        <span className="m-8 text-center text-5xl/9 font-bold tracking-tight text-slate-100">
          Create your community
        </span>
        <div className="text-slate-100 font-[helvetica] border-2 border-gray-400 rounded-lg w-1/2 pb-5">
          <form className="flex flex-col px-7 py-4" onSubmit={onSubmit}>
            <div className="flex flex-row justify-between w-full">
              <div className="flex flex-col w-1/2 p-5 items-start">
                <CommunityNameInput />

                <Toggle label="Privacy" onToggle={onToggle} on={on} />
                <span className="flex text-[10px] text-wrap items-center gap-0.5 mt-2">
                  <img className="w-[12px]" src={infoIcon} alt="" />
                  {on
                    ? "Your community's events are visible to members"
                    : "Your community's events are visible to anyone"}
                </span>
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
}

export default Create;
