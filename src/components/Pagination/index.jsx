import { Pagination, Stack } from "@mui/material";
import "./styles.scss";

const PaginationCustome = ({totalPages, page, hanldeOnChange, variant="outlined", shape="rounded"}) => {
  return (
    <Stack spacing={2}>
      <Pagination
        page={page}
        onChange={hanldeOnChange}
        count={totalPages}
        variant={variant}
        shape={shape}
      />
    </Stack>
  );
};

export default PaginationCustome;
