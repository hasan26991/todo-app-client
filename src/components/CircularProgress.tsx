import * as React from "react";
import { CircularProgress as MuiCircularProgress } from "@mui/material";
import Box from "@mui/material/Box";

export default function CircularProgress() {
  return (
    <Box sx={{ position: "absolute", top: "50vh", right: "50vw" }}>
      <MuiCircularProgress />
    </Box>
  );
}
