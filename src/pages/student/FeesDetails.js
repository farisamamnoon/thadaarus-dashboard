import { DataGrid } from "@mui/x-data-grid";
import { Typography, Box } from "@mui/material";
import { formatDate, formatStringToDate } from "utils/formatDate";

const FeesDetails = ({ data }) => {
  const rows = data.fees;
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
      field: "amount",
      headerName: "Payed Amount",
      sortable: false,
      disableColumnMenu: true,

      renderCell: (params) => {
        const { row } = params;

        return (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography noWrap variant="body2" sx={{ color: "text.primary", fontWeight: 600 }}>
              {row?.amount}
            </Typography>
          </Box>
        );
      },
    },
    {
      flex: 1,
      // minWidth: 290,
      field: "discount",
      headerName: "Disounted Amount",
      sortable: false,
      disableColumnMenu: true,

      renderCell: (params) => {
        const { row } = params;

        return (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography noWrap variant="body2" sx={{ color: "text.primary", fontWeight: 600 }}>
              {row?.discount}
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
      columns={columns}
      getRowId={(row) => row._id}
    />
  );
};

export default FeesDetails;
