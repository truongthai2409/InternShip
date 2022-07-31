import "./styles.scss";
import { useRef } from "react";
import CandidateCard from "./CandidateCard";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const CandidateList = () => {

  const hanldeOnChange = (e) => {
    console.log(e.value)
  }

  console.log("first")
  return (
    <div className="candidate-list__wrapper">
      <CandidateCard />
      <Stack spacing={2}>
        <Pagination value={1} onChange={hanldeOnChange} count={10} variant="outlined" shape="rounded" />
      </Stack>
    </div>
  );
};

export default CandidateList;
