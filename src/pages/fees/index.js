//react imports
import { useState, useRef } from "react";
import { Link } from "react-router-dom";

//material ui imports
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Card, IconButton, CardHeader, Button } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

//third party
import { useQuery } from "@tanstack/react-query";

//project imports
import { fetchData } from "utils/fetchData";
import { addFees, getBalance } from "utils/fees";

function Fees() {
  const buttonRef = useRef(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [dialogId, setDialogId] = useState("");

  const [total, setTotal] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 15,
  });

  const {
    data: studentData,
    error,
    isPending,
  } = useQuery({
    queryKey: ["studentData"],
    queryFn: async () => await fetchData(`fees/get-all`),
  });
  if (error) {
    console.log(error);
  }
  if (isPending) {
    return <p>Loading...</p>;
  }

  const rows = studentData;

  const columns = [
    {
      flex: 1,
      minWidth: 290,
      field: "name",
      headerName: "Student Name",
      sortable: false,
      disableColumnMenu: true,

      renderCell: (params) => {
        const { row } = params;

        return (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography noWrap variant="body2" sx={{ color: "text.primary", fontWeight: 600 }}>
              {row.name}
            </Typography>
          </Box>
        );
      },
    },
    {
      flex: 1,
      minWidth: 290,
      field: "class",
      headerName: "Class",
      sortable: false,
      disableColumnMenu: true,

      renderCell: (params) => {
        const { row } = params;

        return (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography noWrap variant="body2" sx={{ color: "text.primary", fontWeight: 600 }}>
              {row.class.className}
            </Typography>
          </Box>
        );
      },
    },
    {
      flex: 1,
      minWidth: 290,
      field: "feesPaid",
      headerName: "Paid",
      sortable: false,
      disableColumnMenu: true,

      renderCell: (params) => {
        const { row } = params;

        return (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography noWrap variant="body2" sx={{ color: "text.primary", fontWeight: 600 }}>
              {addFees(row.fees).totalFees}
            </Typography>
          </Box>
        );
      },
    },
    {
      flex: 1,
      minWidth: 290,
      field: "discount",
      headerName: "Discount",
      sortable: false,
      disableColumnMenu: true,

      renderCell: (params) => {
        const { row } = params;

        return (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography noWrap variant="body2" sx={{ color: "text.primary", fontWeight: 600 }}>
              {addFees(row.fees).totalDiscount}
            </Typography>
          </Box>
        );
      },
    },
    {
      flex: 1,
      minWidth: 290,
      field: "balance",
      headerName: "Balance",
      sortable: false,
      disableColumnMenu: true,

      renderCell: (params) => {
        const { row } = params;

        return (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              noWrap
              variant="body2"
              sx={{ color: "text.primary", fontWeight: 600 }}
            >
              {getBalance(row.class.fees, addFees(row.fees).totalFees, addFees(row.fees).totalDiscount)}
            </Typography>
          </Box>
        );
      },
    },
  ];

  return (
    <div>
      {/* Breadcrumbs */}

      {/* <Breadcrumbs sx={{ mb: 4 }}>
        <Link href={/dashboard}>Home</Link>
        <Link href={/faq}>FAQ</Link>
        <Typography>Manage </Typography>
      </Breadcrumbs> */}
      <Card>
        <CardHeader
          title="Exam Timetable"
          action={
            <div>
              <Button size="medium" variant="contained" component={Link} to={`add`}>
                Add Fees
              </Button>
            </div>
          }
        />
        <DataGrid
          autoHeight
          rows={rows || []}
          rowCount={total}
          columns={columns}
          getRowId={(row) => row._id}
          pagination
          sortingMode="server"
          paginationMode="server"
          //pageSizeOptions={[2]}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
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
              value: searchValue,
              // clearSearch: () => handleSearch(""),
              // onChange: (event) => handleSearch(event.target.value),
            },
          }}
        />
      </Card>

      {/* {openDeleteDialog && (
        <DeleteConfirmationDialog
          id={dialogId}
          buttonRef={buttonRef}
          name=""
          open={true}
          setOpen={setOpenDeleteDialog}
          // deleteFunction={deleteFaqData}
        />
      )} */}
    </div>
  );
}

export default Fees;
