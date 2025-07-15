import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { Input, InputLabel } from "@mui/material";

export default function DiscreteSlider({ name }) {
  return (
    <Box
      sx={{
        width: 220,
        "& .MuiInputLabel-root": { color: "white" },
        color: "#9CA3AF",
        margin: "8px",
      }}
    >
      <InputLabel className="text-white">Capacity</InputLabel>
      <Slider
        aria-label="Capacity"
        name={name}
        defaultValue={30}
        valueLabelDisplay="auto"
        shiftStep={30}
        step={5}
        min={10}
        max={100}
      />
    </Box>
  );
}
