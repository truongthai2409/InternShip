import { useSelector } from "react-redux";
import * as React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

export default function Fallback() {
  const loading = useSelector((state) => state.app.loading);
  if (loading > 0) {
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    );
  }
}
