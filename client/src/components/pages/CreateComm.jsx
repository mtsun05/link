import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import fetchAPI from "../../api/fetchAPI";

import infoIcon from "@/assets/info-icon.svg";
import Toggle from "../utility/inputs/Toggle";
import CommunityNameInput from "../utility/inputs/CommNameInput";
import Input from "../utility/inputs/Input";
import Slider from "../utility/inputs/Slider";
import Button from "../utility/buttons/Button";

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
      <div className="flex flex-col items-center m-5 w-1/3 mx-auto">
        <span className="m-8 text-center text-5xl font-bold tracking-tight text-slate-100">
          Create your community
        </span>
        <div className="text-white font-[helvetica] bg-[#1d1f24] rounded-lg w-full px-15 py-10">
          <form className="flex flex-col" onSubmit={onSubmit}>
            <div className="flex flex-col items-start">
              <CommunityNameInput />

              <Toggle label="Privacy" onToggle={onToggle} on={on} />
              <span className="flex text-[10px] text-wrap items-center gap-0.5 mt-2">
                <img className="w-[12px]" src={infoIcon} alt="" />
                {on
                  ? "Your community's events are visible to members"
                  : "Your community's events are visible to anyone"}
              </span>
              <Input
                name="desc"
                label="desc"
                labelName="Description"
                type="textarea"
              />
            </div>
            <div className="mt-5 w-full ">
              <Button className="w-full">Create</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Create;
