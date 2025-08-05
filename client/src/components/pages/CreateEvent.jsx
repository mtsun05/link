import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import fetchAPI from "../../api/fetchAPI";
import { useState, useEffect } from "react";

import Input from "../utility/Input";
import Dropdown from "../utility/Dropdown";
import Slider from "../utility/Slider";
import AddInput from "../utility/AddInput";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Box, TextField } from "@mui/material";
import { DateTime } from "luxon";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

const CreateEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [roles, setRoles] = useState([]);
  const [teams, setTeams] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [dropdownSelection, setDropdownSelection] = useState(null);

  const values = [
    { name: "open", label: "Open" },
    { name: "community", label: "Community Only" },
    { name: "invite", label: "Invite Only" },
  ];

  const handleDropdownChange = (newValue) => {
    setDropdownSelection(newValue);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const eventInfo = {
      name: formData.get("name"),
      desc: formData.get("desc"),
      capacity: formData.get("capacity"),
      roles: roles,
      questions: questions,
      join_type: dropdownSelection,
      time: { start: startDate.toUTC().toISO(), end: endDate.toUTC().toISO() },
      community: id,
    };

    try {
      const data = await fetchAPI(`/events/create`, {
        method: "POST",
        body: JSON.stringify(eventInfo),
      });
      navigate(`/events/${data._id}`);
    } catch (e) {
      console.error(e.message);
      navigate(`/`);
      console.error("Encountered Error: ", e);
    }
  };

  const datePickerStyles = {
    "& .MuiInputBase-root": {
      color: "white !important",
      backgroundColor: "transparent",
    },
    "& .MuiInputBase-input": {
      color: "white !important",
    },
    "& .MuiInputLabel-root": {
      color: "rgb(156 163 175)",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "white",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "rgb(156 163 175) !important",
      },
      "&:hover fieldset": {
        borderColor: "white !important",
      },
      "&.Mui-focused fieldset": {
        borderColor: "rgb(99 102 241) !important",
        borderWidth: "2px",
      },
    },
    "& .MuiSvgIcon-root": {
      color: "white !important",
    },
  };

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterLuxon}>
        <div className="flex flex-col items-center m-5 size-full">
          <span className="m-8 text-center text-5xl/9 font-bold tracking-tight text-slate-100">
            Start an event
          </span>
          <div
            className={`text-slate-100 font-[helvetica] border-2 border-gray-400 rounded-lg pb-5 ${
              teams ? "w-2/3" : "w-1/2"
            }`}
          >
            <form className="flex flex-col px-7 py-4" onSubmit={onSubmit}>
              <div className="flex flex-row justify-between w-full">
                <div className="flex flex-col w-1/2 p-5 items-start">
                  <Input name="name" label="name" labelName="Name: " />
                  <Slider name="capacity" min={10} max={100} />
                  <AddInput
                    name="Roles: "
                    values={roles}
                    setValues={setRoles}
                  />
                  <AddInput
                    name="Registration Questions: "
                    values={questions}
                    setValues={setQuestions}
                  />
                  <Dropdown
                    label="Join Mode"
                    name="join-mode"
                    values={values}
                    onSelectionChange={handleDropdownChange}
                  />
                </div>

                <div className="w-[1px] bg-gray-400 mx-4 self-stretch" />

                <div className="flex flex-col w-1/2 pl-4 items-start p-5 color-white">
                  <Input
                    name="desc"
                    label="desc"
                    labelName="Description"
                    type="textarea"
                  />
                  <Box
                    sx={{
                      mt: 2,
                      width: "100%",
                      color: "white",
                    }}
                  >
                    <DateTimePicker
                      label="Start Date & Time"
                      value={startDate}
                      onChange={(newValue) => setStartDate(newValue)}
                      slotProps={{
                        textField: {
                          sx: datePickerStyles,
                        },
                      }}
                    />
                  </Box>

                  <Box sx={{ mt: 2, width: "100%" }}>
                    <DateTimePicker
                      label="End Date & Time"
                      value={endDate}
                      onChange={(newValue) => setEndDate(newValue)}
                      slotProps={{
                        textField: {
                          sx: datePickerStyles,
                        },
                      }}
                    />
                  </Box>

                  <div className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      id="teams"
                      name="teams"
                      value={teams}
                      onChange={() => {
                        setTeams(!teams);
                      }}
                      className="w-4 h-4 my-4 text-blue-600 bg-gray-100 border-gray-300 rounded-md focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 "
                    />
                    <label
                      for="default-checkbox"
                      className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Teams
                    </label>
                  </div>
                </div>

                {teams && (
                  <>
                    <div className="w-[1px] bg-gray-400 mx-4 self-stretch" />
                    <div className="flex flex-col">
                      <div className="flex flex-col w-1/2 pl-4 items-start p-5 color-white">
                        <Slider name="team size" min={2} max={10} />
                      </div>
                      <div className="flex flex-col">
                        {roles.map((role) => {
                          return (
                            <>
                              <label
                                key={`${role.toLowerCase()}-label`}
                                htmlFor="role-count"
                              >
                                {role}:
                              </label>
                              <input
                                defaultValue={0}
                                key={`${role.toLowerCase()}-input`}
                                className="border-2 border-gray-400 rounded-md w-1/2 p-1"
                                type="number"
                                name="role-count"
                                id={role.toLowerCase()}
                              />
                            </>
                          );
                        })}
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className="mt-5 w-full ">
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-bold text-white shadow-xs hover:bg-indigo-500 hover:cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </LocalizationProvider>
    </>
  );
};

export default CreateEvent;
