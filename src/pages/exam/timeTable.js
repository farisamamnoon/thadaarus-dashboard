import { DataGrid } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "utils/fetchData";
import { Typography, Box } from "@mui/material";
import { formatDate, formatStringToDate } from "utils/formatDate";

const TimeTable = ({ examId }) => {
  const rows = examId.exams
  const columns = [
    {
      flex: 1,
      // minWidth: 290,
      field: "date",
      headerName: "Date",
      sortable: false,
      disableColumnMenu: true,

      renderCell: (params) => {
        const { row } = params;

        return (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography noWrap variant="body2" sx={{ color: "text.primary", fontWeight: 600 }}>
              {formatDate(row?.date)}
            </Typography>
          </Box>
        );
      },
    },
    {
      flex: 1,
      // minWidth: 290,
      field: "subject",
      headerName: "Subject",
      sortable: false,
      disableColumnMenu: true,

      renderCell: (params) => {
        const { row } = params;

        return (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography noWrap variant="body2" sx={{ color: "text.primary", fontWeight: 600 }}>
              {row?.subjectId}
            </Typography>
          </Box>
        );
      },
    },
  ];

  return (
    <DataGrid
      autoHeight
      rows={rows || []}
      // rowCount={total}
      columns={columns}
      getRowId={(row) => row._id}
      pagination
      sortingMode="server"
      paginationMode="server"
      pageSizeOptions={[2]}
      // paginationModel={paginationModel}
      // onPaginationModelChange={setPaginationModel}
      slotProps={{
        baseButton: {
          size: "medium",
          variant: "tonal",
        },
        toolbar: {
          csvOptions: { disableToolbarButton: true },
          printOptions: { disableToolbarButton: true },
          showQuickFilter: true,
          quickFilterProps: { debounceMs: 1000 },
          //   value: searchValue,
          //   clearSearch: () => handleSearch(""),
          //   onChange: (event) => handleSearch(event.target.value),
        },
      }}
    />
  );
};

export default TimeTable;
