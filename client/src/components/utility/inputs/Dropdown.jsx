import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";

export default function Dropdown({ label, name, values, onSelectionChange }) {
  const [selected, setSelected] = useState("");

  const handleChange = (event) => {
    setSelected(event.target.value);
    onSelectionChange(event.target.value);
  };

  return (
    <FormControl
      className="text-white"
      sx={{
        my: 2,
        minWidth: 120,
        "& .MuiInputLabel-root": { color: "#FFFFFF" },
        "& .MuiOutlinedInput-notchedOutline": { borderColor: "#9CA3AF" },
        "& .MuiSvgIcon-root": { color: "#9CA3AF" },
        "& .MuiInputBase-input": { color: "#FFFFFF" },

        "& .MuiInputLabel-root.Mui-focused": { color: "#FFFFFF" },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
          {
            borderColor: "#9CA3AF",
          },
        "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: "#9CA3AF",
        },
      }}
      size="small"
    >
      <InputLabel className="text-white" id="demo-select-small-label">
        {label}
      </InputLabel>
      <Select
        className="text-white"
        labelId="demo-select-small-label"
        id={name}
        name={name}
        value={selected}
        label={label}
        onChange={handleChange}
        MenuProps={{
          PaperProps: {
            sx: {
              backgroundColor: "#333",
              "& .MuiMenuItem-root": {
                color: "white",
                "&:hover": {
                  backgroundColor: "#555",
                },
                "&.Mui-selected": {
                  backgroundColor: "#666",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#666",
                  },
                },
              },
            },
          },
        }}
      >
        {values &&
          values.map((value) => {
            return (
              <MenuItem key={value} value={value}>
                {value}
              </MenuItem>
            );
          })}
      </Select>
    </FormControl>
  );
}
