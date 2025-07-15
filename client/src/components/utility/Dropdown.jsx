import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function Dropdown({ name }) {
  const [selected, setSelected] = React.useState("community-only");

  const handleChange = (event) => {
    setSelected(event.target.value);
  };

  return (
    <FormControl
      className="text-white"
      sx={{
        m: 1,
        minWidth: 120,
        "& .MuiInputLabel-root": { color: "#9CA3AF" },
        "& .MuiOutlinedInput-notchedOutline": { borderColor: "#9CA3AF" },
        "& .MuiSvgIcon-root": { color: "#9CA3AF" },
        "& .MuiInputBase-input": { color: "#9CA3AF" },

        "& .MuiInputLabel-root.Mui-focused": { color: "#9CA3AF" },
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
        Join Mode
      </InputLabel>
      <Select
        className="text-white"
        labelId="demo-select-small-label"
        id={name}
        name={name}
        value={selected}
        label="Join Mode"
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
        <MenuItem value={"open"}>Open</MenuItem>
        <MenuItem value={"community-only"}>Community Only</MenuItem>
        <MenuItem value={"invite-only"}>Invite Only</MenuItem>
      </Select>
    </FormControl>
  );
}
