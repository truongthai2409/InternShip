import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

import "./styles.scss";

export default function DataTable({ rows, columns }) {
  return (
    <div className="data-table">
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        getRowId={(row) => row.stt}
        loading={!rows.length}
        checkboxSelection
      />
    </div>
  );
}
