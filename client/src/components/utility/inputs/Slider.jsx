import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { Input, InputLabel } from "@mui/material";

function capitalizeFirstLetter(val) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

export default function DiscreteSlider({ name, label, min, max }) {
  return (
    <Box
      sx={{
        my: 2,
        width: 220,
        "& .MuiInputLabel-root": { color: "white" },
        color: "#9CA3AF",
      }}
    >
      <InputLabel className="text-white">{label}</InputLabel>
      <Slider
        aria-label="Capacity"
        name={name}
        defaultValue={30}
        valueLabelDisplay="auto"
        shiftStep={30}
        step={1}
        min={min}
        max={max}
      />
    </Box>
  );
}
