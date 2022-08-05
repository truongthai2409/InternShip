import "./styles.scss";
import { useState } from "react";
import CandidateCard from "./CandidateCard";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const CandidateList = () => {
  const [page, setPage] = useState(1)

  const hanldeOnChange = (e, value) => {
    setPage(value)
  }

  return (
    <div className="candidate-list__wrapper">
      <CandidateCard />
      <CandidateCard />
      <CandidateCard />
      <Stack spacing={2}>
        <Pagination page={page} value={1} onChange={hanldeOnChange} count={10} variant="outlined" shape="rounded" />
      </Stack>
    </div>
  );
};

export default CandidateList;
