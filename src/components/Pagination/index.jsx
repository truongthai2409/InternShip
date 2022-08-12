import { Pagination, Stack } from "@mui/material";
import "./styles.scss";

const PaginationCustom = ({totalPages, page, hanldeOnChange, variant="outlined", shape}) => {
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

export default PaginationCustom;
