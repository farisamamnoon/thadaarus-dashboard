import { DataGrid } from "@mui/x-data-grid";
import { Card, CardHeader, Button, Breadcrumbs } from "@mui/material";
import { useState, useRef } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

function Teacher() {
  const rows = [
    {
      _id: 1,
      name: "Faris",
      phone: "09485094",
      class: "1",
      classSubjects: "2 Arabic",
      attendance: "78%",
      fees: "90%",
    },
    {
      _id: 2,
      name: "Faris",
      phone: "09485094",
      class: "1",
      classSubjects: "2 Arabic",
      attendance: "78%",
      fees: "90%",
    },
    {
      _id: 3,
      name: "Faris",
      phone: "09485094",
      class: "1",
      classSubjects: "2 Arabic",
      attendance: "78%",
      fees: "90%",
    },
    {
      _id: 4,
      name: "Faris",
      phone: "09485094",
      class: "1",
      classSubjects: "2 Arabic",
      attendance: "78%",
      fees: "90%",
    },
  ];

  const columns = [
    {
      flex: 0.275,
      minWidth: 290,
      field: "teachername",
      headerName: "Teacher Name",
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
              {row.name}
            </Typography>
          </Box>
        );
      },
    },
    {
      flex: 0.275,
      minWidth: 290,
      field: "contact",
      headerName: "Contact No.",
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
              {row.phone}
            </Typography>
          </Box>
        );
      },
    },
    {
      flex: 0.275,
      minWidth: 290,
      field: "class",
      headerName: "Class",
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
              {row.class}
            </Typography>
          </Box>
        );
      },
    },
    {
      flex: 0.275,
      minWidth: 290,
      field: "group",
      headerName: "Class Subjects",
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
              {row.classSubjects}
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
        <Link >Home</Link>
        <Link >FAQ</Link>
        <Typography>Manage </Typography>
      </Breadcrumbs> */}
      <Card>
        <CardHeader
          title="Teachers"
          action={
            <div>
              <Button
                size="medium"
                variant="contained"
                component={Link}
                to={`add`}
              >
                Add New Teacher
              </Button>
            </div>
          }
        />
        <DataGrid
          autoHeight
          rows={rows || []}
          // rowCount={total}
          columns={columns}
          getRowId={(row) => row._id}
          // pagination
          sortingMode="server"
          // paginationMode="server"
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
              // value: searchValue,
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

export default Teacher;
